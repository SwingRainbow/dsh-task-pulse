/**
 * Task Pulse board parser.
 *
 * Read-only: these helpers only turn the existing Markdown task records into
 * display data. They never write files and never resolve paths outside the
 * current workspace.
 */

export const BOARD_FIELDS = [
  "目标与完成条件",
  "阶段",
  "开始日期",
  "结束日期",
  "已确认范围",
  "最近完成点",
  "下一步",
  "阻塞或待确认项",
  "证据",
  "更新时间"
];

export const DECISION_FIELDS = [
  "状态",
  "决定与范围",
  "理由与替代方案",
  "确认依据",
  "关联规则",
  "取代关系"
];

export const PHASES = ["待办", "进行中", "待验证", "待验收", "暂缓", "待核实"];
export const DECISION_STATUSES = ["提议", "待核实", "生效", "被取代", "已废止"];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function escapeRe(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function clean(text) {
  return String(text ?? "").replace(/^\uFEFF/, "");
}

/**
 * Split a Markdown file on level-two headings. Line numbers are 1-based.
 * @param {string} text
 * @returns {{heading: string, body: string, bodyLines: string[], line: number}[]}
 */
export function splitSections(text) {
  const lines = clean(text).split(/\r?\n/);
  const sections = [];
  let current = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.slice(3).trim(), bodyLines: [], line: i + 1 };
    } else if (current) {
      current.bodyLines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections.map((section) => ({ ...section, body: section.bodyLines.join("\n") }));
}

function readFields(section, names, file, issues) {
  const values = {};
  for (const name of names) {
    const re = new RegExp(`^-\\s*${escapeRe(name)}\\s*[：:]\\s*(.*)$`);
    const matches = [];
    for (let i = 0; i < section.bodyLines.length; i += 1) {
      const match = re.exec(section.bodyLines[i]);
      if (match) matches.push({ value: match[1].trim(), line: section.line + 1 + i });
    }
    if (matches.length === 0) {
      issues.push({ file, line: section.line, severity: "warning", message: `缺少字段：${name}` });
      values[name] = "";
    } else {
      if (matches.length > 1) {
        issues.push({ file, line: matches[1].line, severity: "error", message: `字段重复：${name}` });
      }
      values[name] = matches[0].value;
    }
  }
  return values;
}

/**
 * Parse Markdown links in one field value.
 * @param {string} value
 * @returns {{label: string, href: string}[]}
 */
export function parseLinks(value) {
  const links = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(String(value ?? ""))) !== null) {
    let href = match[2].trim();
    if (href.startsWith("<") && href.endsWith(">")) href = href.slice(1, -1);
    links.push({ label: match[1].trim(), href });
  }
  return links;
}

/**
 * Resolve a link relative to docs/tasks. Returns a typed target or null.
 * @param {string} href
 * @param {string} baseDir
 * @returns {{kind: 'local', path: string, anchor: string}
 *   | {kind: 'external', href: string}
 *   | {kind: 'anchor', path: string|null, anchor: string}
 *   | {kind: 'invalid', href: string, reason: string}
 *   | null}
 */
export function resolveLink(href, baseDir = "docs/tasks") {
  const raw = String(href ?? "").trim();
  if (!raw) return null;
  if (/^(https?:|mailto:|ftp:)/i.test(raw)) return { kind: "external", href: raw };
  if (raw.startsWith("#")) {
    try {
      return { kind: "anchor", path: null, anchor: decodeURIComponent(raw.slice(1)) };
    } catch {
      return { kind: "invalid", href: raw, reason: "URL 编码无效" };
    }
  }

  const hash = raw.indexOf("#");
  let pathPart = hash >= 0 ? raw.slice(0, hash) : raw;
  let anchor = hash >= 0 ? raw.slice(hash + 1) : "";
  try {
    pathPart = decodeURIComponent(pathPart);
    anchor = decodeURIComponent(anchor);
  } catch {
    return { kind: "invalid", href: raw, reason: "URL 编码无效" };
  }
  if (!pathPart) return { kind: "anchor", path: null, anchor };

  if (/^[a-zA-Z]:[\\/]/.test(pathPart) || /^[\\/]/.test(pathPart)) {
    return { kind: "invalid", href: raw, reason: "绝对路径不读取" };
  }

  const parts = `${baseDir}/${pathPart}`.replace(/\\/g, "/").split("/");
  const normalized = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") {
      if (normalized.length === 0) return { kind: "invalid", href: raw, reason: "路径逃出工作区" };
      normalized.pop();
    } else {
      normalized.push(part);
    }
  }
  return { kind: "local", path: normalized.join("/"), anchor };
}

/**
 * Parse links and resolve them. Anchor-only links inherit the source file.
 * @param {string} value
 * @param {string} baseDir
 * @param {string} sourcePath
 */
export function attachLinks(value, baseDir = "docs/tasks", sourcePath = "") {
  return parseLinks(value).map((link) => {
    const target = resolveLink(link.href, baseDir);
    if (target?.kind === "anchor" && target.path === null) target.path = sourcePath;
    return { ...link, target };
  });
}

function anchorBefore(lines, section) {
  for (let i = section.line - 2; i >= 0 && i >= section.line - 5; i -= 1) {
    const line = lines[i].trim();
    if (!line) continue;
    const match = /<a id="([^"]+)"><\/a>/.exec(line);
    if (match) return match[1];
    break;
  }
  return "";
}

/**
 * Parse the active board.
 * @param {string} text
 */
export function parseBoard(text) {
  const source = clean(text);
  const lines = source.split(/\r?\n/);
  const issues = [];
  const tasks = [];
  for (const section of splitSections(source)) {
    const match = /^(T-[A-Za-z0-9_-]+)\s+(.+)$/.exec(section.heading);
    if (!match) continue;
    const fields = readFields(section, BOARD_FIELDS, "BOARD.md", issues);
    const phase = fields["阶段"];
    if (phase && !PHASES.includes(phase)) {
      issues.push({ file: "BOARD.md", line: section.line, severity: "error", message: `非法阶段：${phase}` });
    }
    for (const key of ["开始日期", "结束日期"]) {
      const value = fields[key];
      if (value && value !== "未记录" && value !== "未结束" && !DATE_RE.test(value)) {
        issues.push({ file: "BOARD.md", line: section.line, severity: "warning", message: `${key}不是 YYYY-MM-DD：${value}` });
      }
    }
    const updated = /^(\d{4}-\d{2}-\d{2})\s*(.*)$/.exec(fields["更新时间"]);
    tasks.push({
      id: match[1],
      title: match[2].trim(),
      phase,
      goal: fields["目标与完成条件"],
      startDate: fields["开始日期"],
      endDate: fields["结束日期"],
      scope: fields["已确认范围"],
      latest: fields["最近完成点"],
      next: fields["下一步"],
      blockers: fields["阻塞或待确认项"],
      evidence: attachLinks(fields["证据"], "docs/tasks", "docs/tasks/BOARD.md"),
      updatedAt: updated ? updated[1] : "",
      updatedBy: updated ? updated[2].trim() : "",
      line: section.line,
      anchor: anchorBefore(lines, section),
      raw: `## ${section.heading}\n${section.body.trim()}`
    });
  }
  return { tasks, issues };
}

/**
 * Parse the decision log.
 * @param {string} text
 */
export function parseDecisions(text) {
  const source = clean(text);
  const lines = source.split(/\r?\n/);
  const issues = [];
  const decisions = [];
  for (const section of splitSections(source)) {
    const match = /^(D-\d{3})\s+(.+)$/.exec(section.heading);
    if (!match) continue;
    const fields = readFields(section, DECISION_FIELDS, "DECISIONS.md", issues);
    const status = fields["状态"];
    if (status && !DECISION_STATUSES.includes(status)) {
      issues.push({ file: "DECISIONS.md", line: section.line, severity: "error", message: `非法状态：${status}` });
    }
    const anchor = anchorBefore(lines, section);
    if (!anchor) {
      issues.push({ file: "DECISIONS.md", line: section.line, severity: "warning", message: `缺少显式锚点：${match[1]}` });
    }
    decisions.push({
      id: match[1],
      title: match[2].trim(),
      status,
      scope: fields["决定与范围"],
      reason: fields["理由与替代方案"],
      confirmation: attachLinks(fields["确认依据"], "docs/tasks", "docs/tasks/DECISIONS.md"),
      related: attachLinks(fields["关联规则"], "docs/tasks", "docs/tasks/DECISIONS.md"),
      replacement: [...(fields["取代关系"] || "").matchAll(/D-\d{3}\b/g)].map((m) => m[0]),
      replacementText: fields["取代关系"],
      line: section.line,
      anchor,
      raw: `## ${section.heading}\n${section.body.trim()}`
    });
  }
  return { decisions, issues };
}

/**
 * Parse the progress log. Ordering is by heading date, then file order.
 * @param {string} text
 */
export function parseProgress(text) {
  const source = clean(text);
  const lines = source.split(/\r?\n/);
  const sections = splitSections(source);
  const entries = [];
  const handoffs = [];
  for (let index = 0; index < sections.length; index += 1) {
    const section = sections[index];
    if (/^(T-|D-)/.test(section.heading)) continue;
    const dateMatch = /^(\d{4}-\d{2}-\d{2})\s+(.*)$/.exec(section.heading);
    const date = dateMatch ? dateMatch[1] : "";
    let title = dateMatch ? dateMatch[2] : section.heading;
    const executorMatch = /【([^】]+)】\s*$/.exec(title);
    const executor = executorMatch ? executorMatch[1] : "";
    if (executorMatch) title = title.slice(0, executorMatch.index).trim();
    const bullets = [];
    for (const line of section.bodyLines) {
      if (!/^\s*-\s+/.test(line)) continue;
      const raw = line.replace(/^\s*-\s+/, "").trim();
      const field = /^([^：:]{1,24})[：:]\s*(.*)$/.exec(raw);
      bullets.push({
        label: field ? field[1].trim() : "",
        text: field ? field[2].trim() : raw,
        links: attachLinks(field ? field[2] : raw, "docs/tasks", "docs/tasks/progress.md")
      });
    }
    const entry = {
      date,
      title: title || section.heading,
      executor,
      anchor: anchorBefore(lines, section),
      line: section.line,
      index,
      bullets,
      raw: `## ${section.heading}\n${section.body.trim()}`
    };
    if (title.includes("会话交接")) {
      const fields = {};
      for (const bullet of bullets) {
        if (bullet.label) fields[bullet.label] = bullet.text;
      }
      entry.handoff = fields;
      handoffs.push(entry);
    }
    entries.push(entry);
  }
  entries.sort((a, b) => {
    if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date);
    if (a.date && !b.date) return -1;
    if (!a.date && b.date) return 1;
    return a.index - b.index;
  });
  handoffs.sort((a, b) => {
    if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date);
    return a.index - b.index;
  });
  return { entries, handoff: handoffs[0] || null };
}

/**
 * Extract the section that owns an explicit anchor, with a heading-slug fallback.
 * @param {string} text
 * @param {string} anchor
 */
export function extractSection(text, anchor) {
  const source = clean(text);
  const lines = source.split(/\r?\n/);
  const wanted = String(anchor ?? "").trim();
  if (!wanted) return null;
  const anchorLine = lines.findIndex((line) => line.includes(`<a id="${wanted}"></a>`) || line.includes(`<a id='${wanted}'></a>`));
  let start = -1;
  if (anchorLine >= 0) {
    start = lines.findIndex((line, index) => index >= anchorLine && line.startsWith("## "));
    if (start < 0) start = anchorLine;
  } else {
    const slug = (value) => value.toLowerCase().trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-");
    start = lines.findIndex((line) => line.startsWith("## ") && slug(line.slice(3)) === slug(wanted));
    if (start < 0) return null;
  }
  let end = lines.findIndex((line, index) => index > start && line.startsWith("## "));
  if (end < 0) end = lines.length;
  return {
    anchor: wanted,
    heading: lines[start].startsWith("## ") ? lines[start].slice(3).trim() : wanted,
    text: lines.slice(start, end).join("\n").trim(),
    startLine: start + 1
  };
}

/**
 * Compute display-only health facts. These are hints, not a replacement for
 * internal/tools/check_task_records.ps1.
 * @param {{
 *   boardText?: string, decisionsText?: string, progressText?: string,
 *   taskPlan?: {bytes?: number}|null, findings?: {bytes?: number}|null,
 *   archiveIndex?: {bytes?: number}|null, issues?: any[],
 *   tasks?: any[], decisions?: any[], entries?: any[]
 * }} input
 */
export function computeHealth(input = {}) {
  const bytes = (text) => new TextEncoder().encode(String(text ?? "")).length;
  const boardBytes = bytes(input.boardText);
  const decisionsBytes = bytes(input.decisionsText);
  const progressBytes = bytes(input.progressText);
  const issues = Array.isArray(input.issues) ? input.issues.slice() : [];
  const errors = issues.filter((issue) => issue.severity === "error").length;
  const parserWarnings = issues.filter((issue) => issue.severity !== "error").length;

  const file = (name, size, target, warn, over) => ({ name, bytes: size, target, warn, over });
  const files = [
    file("BOARD.md", boardBytes, 10 * 1024, 10 * 1024, 10 * 1024),
    file("DECISIONS.md", decisionsBytes, 20 * 1024, 20 * 1024, 20 * 1024),
    file("progress.md", progressBytes, 64 * 1024, 128 * 1024, 256 * 1024),
    file("task_plan.md", input.taskPlan?.bytes ?? null, 64 * 1024, 128 * 1024, 256 * 1024),
    file("findings.md", input.findings?.bytes ?? null, 64 * 1024, 128 * 1024, 256 * 1024),
    file("ARCHIVE_INDEX.md", input.archiveIndex?.bytes ?? null, 0, 0, 0)
  ];
  const fileWarnings = files.filter((item) => item.warn > 0 && Number.isFinite(item.bytes) && item.bytes > item.warn).length;
  const warnings = parserWarnings + fileWarnings;
  const tasks = Array.isArray(input.tasks) ? input.tasks : [];
  const decisions = Array.isArray(input.decisions) ? input.decisions : [];
  const entries = Array.isArray(input.entries) ? input.entries : [];
  const today = new Date();
  const stale = tasks
    .filter((task) => task.updatedAt)
    .map((task) => {
      const date = new Date(`${task.updatedAt}T00:00:00`);
      if (Number.isNaN(date.getTime())) return null;
      const days = Math.floor((today.getTime() - date.getTime()) / 86400000);
      return days > 7 ? { id: task.id, title: task.title, days, updatedAt: task.updatedAt } : null;
    })
    .filter(Boolean);
  const phaseCounts = {};
  for (const phase of PHASES) phaseCounts[phase] = 0;
  phaseCounts["未分类"] = 0;
  for (const task of tasks) {
    if (PHASES.includes(task.phase)) phaseCounts[task.phase] += 1;
    else phaseCounts["未分类"] += 1;
  }
  const decisionCounts = {};
  for (const status of DECISION_STATUSES) decisionCounts[status] = 0;
  for (const decision of decisions) {
    if (DECISION_STATUSES.includes(decision.status)) decisionCounts[decision.status] += 1;
  }
  const latestUpdate = tasks.map((task) => task.updatedAt).filter(Boolean).sort().at(-1) || "";
  const blocked = tasks.filter((task) => task.blockers && !["无", "暂无", "无。", "暂无。"].includes(task.blockers.trim()));
  const summary = errors ? `${errors} 项错误` : warnings ? `${warnings} 项提示` : "正常";
  return {
    boardBytes,
    decisionsBytes,
    progressBytes,
    files,
    issues,
    errors,
    warnings,
    stale,
    blocked,
    phaseCounts,
    decisionCounts,
    latestUpdate,
    taskCount: tasks.length,
    decisionCount: decisions.length,
    progressCount: entries.length,
    summary
  };
}
