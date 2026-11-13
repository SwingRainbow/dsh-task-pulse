# 进度日志

<a id="2026-11-13-progress-dsh-board"></a>
## 2026-11-13 DSH 看板只读原型【DS操作】

- 做了什么：按用户选定的“会话页签”方案新增 `internal/tools/dsh-board/`（bundle + 空 host 半侧 + 手写客户端 bundle）；页签读取当前会话工作区的 `docs/tasks/BOARD.md`、`DECISIONS.md`、`progress.md`，展示看板、决定、活动、健康，只读。
- 可读性调整（第一轮）：根据用户“看起来有点吃力”的反馈，把正文提升到 14px、卡片标题 14.5px、列宽 272px，默认隐藏空阶段列并提供“显示全部阶段”；重新构建 `lib/client.js`（65,675 字节，SHA-256 `6A9A57ECBD52B3EB4577611014F1D71505D7D73FB975765389E3C2B79BB7F076`）。
- 布局/配色重构（第二轮）：用户指出详情面板右上角压到 DSH 窗口关闭按钮；把任务详情从全窗口 `fixed` 覆盖改为看板视图内 `absolute` 侧板，关闭按钮不再进入窗口控件区；深色主题改为页/列/卡分层表面并提高文字对比；摘要 7→5 项，卡片加阶段色条，详情元信息改 2 列；正文 14.5px、卡片标题 15.5px。重新构建 `lib/client.js`（70,189 字节，SHA-256 `1C77D97195BC20E0820265FF87D00889F6A20E03165A5B5668228958A3583279`）。
- 视觉重构（第三轮）：用户认为第二版仍然难看；放弃硬编码灰底/边框卡片，改用 DSH 主题 token（`--dsw-alias-bg-layer-*`、`--dsw-alias-label-*`、`--dsw-alias-state-*`、`--dsh-hairline-width`）；统计改为一行文字、子页签改胶囊分段、看板列去框、详情改为带 16px 内边距的浮动圆角卡片。重新构建 `lib/client.js`（78,192 字节，SHA-256 `068560B5535126E0588262A65624B47D07D3641F39FE6C20981830204FFEBC18`）。
- 信息架构重构（第四轮）：用户反馈“一眼根本看不完、太乱”；默认视图从三列看板改为按用户视角分组的进度列表（现在在做 / 等你确认 / 接下来 / 暂缓 / 待核实），移除空列、统计盒子、健康提示和读取时间；每行只保留任务名、阶段+日期、下一步和等待项；详情仍是浮动卡。重新构建 `lib/client.js`（79,511 字节，SHA-256 `9461CF887FEA4C50D08C325F7CB0499FA67C95CACB6014EAD3F33BE7B5726CBE`）。
- 设置页对齐（第五轮）：用户指出 UI/布局/配色全部丑、质疑是否认真；直接读取 DSH `ui-settings-models` 的编译样式，按设置页规格重做：720px 单列、16px 标题、14px 行、`--dsw-alias-settings-card-fill/stroke`、`--dsw-radius-xl`、下划线页签、36px 次级按钮；不再手搓色板。重新构建 `lib/client.js`（85,831 字节，SHA-256 `D1B9EE2AD18C82E9B79A1C986F9F500855BDC183A2879468C66D83BE26F1B8BA`）。
- 详情弹层优化（第五轮补充）：用户截图指出点进去的详情页仍需优化；把全高侧滑面板和灰遮罩改成居中 640px 设置卡弹层、黑色 45% 遮罩；头部/底部固定，标题、阶段、关闭按钮和复制按钮始终可见；内容改为“下一步/等待”焦点块 + 日期元信息 + 目标/范围/最近完成/证据，避免数据堆叠。重新构建 `lib/client.js`（88,017 字节，SHA-256 `38A68944BBBDDB3187F52A97ECA72A7162321F8F9C6744016D174E569C59E734`）。
- 验证：解析器测试得到 4 个任务（含 `T-DSH-BOARD`）、12 个决定、107 个进度段、最新交接 2026-11-13；重建后 `node --check` 和解析器测试通过；插件安装返回 `applied`，行 `voxalic-board` 已启用。用户已连续多轮反馈阅读、观感、信息量与详情页；最新一轮待复查。
- 未完成 / 下一步：用户刷新 DSH 页面并点开一个任务，复查详情弹层的头部固定、遮罩颜色和“下一步/等待”层级；若仍不对，请发当前截图，按截图逐项对齐。后续再补右侧栏打开原文件、归档搜索。
- 工作区状态：新增 `internal/tools/dsh-board/`，未提交 Git；未改 VoxAlic 源码或依赖。插件安装改的是 `C:\Users\TDD\.dsh\profiles\desktop`，卸载即恢复。

<a id="2026-11-13-progress-root-tidy"></a>
## 2026-11-13 根目录整理与保持现状【DS操作】

- 清理：删除 `release-demo.cmd`（93 行，8 月发布流程预览，全仓库零引用）并提交 `6c5272d`；本机删除 7 个归档临时文件 `_build_archive_review.py`、`_mark_archive_batch{,3,4}.py`、`_dryrun{,3,4}.json`（合计 356 KB，未跟踪，不进提交）。根目录从 27 个文件降到 20 个，全部为受跟踪的正式入口。
- 复核结论：剩余 20 个文件都是根目录硬依赖——Git 级规则（`.gitignore`、`.gitattributes`）、Agent 自动加载入口（`AGENTS.md`、`CLAUDE.md`、`.hermes.md`）、npm/tsc/Vite 配置、Vite 与 Tauri 的四个页面入口、`release.cmd` 与 CI 硬编码的 `CHANGELOG.md`、文档规定的 `pull`/`push`/`refresh` 入口、仓库首页 `README.md`。
- 决定：2026-11-13 用户确认根目录不再搬移。两个 `refresh-*.cmd` 虽可移入 `internal/tools/`，但要同步改 5 处文档和 `refresh_item_library.py` 的 2 处提示文字，收益接近零，保持原位。本次未新增 D-xxx。
- 验证：`check_task_records` 0 错误；`check_agent_docs` 通过（13 个受跟踪脚本）；提交后工作区干净。

<a id="2026-11-13-handoff-local-installer-retention"></a>
## 2026-11-13 会话交接【Codex操作】

- 范围：按用户确认完成本机安装包清理和后续轮换规则。本次交接只更新项目记录。其余重复文件仍是待确认清单。
- 已完成：删除 67 个本地安装包，实测释放约 724 MiB，`nsis/` 仅保留 v1.6.3 的 x64 NSIS 安装包。详见[安装包执行记录](#2026-11-13-progress-local-installer-retention)。
- 未完成 / 下一步：下一次正式发布前，先审查并提交轮换脚本、文档及八个旧安装包的工作区删除。由用户按既有发布流程运行 `release.cmd`，核对新版归档后本机只剩一个新版包。另有 11 个候选 JSON 副本待用户决定，见[盘点事实](findings.md#2026-11-13-findings-local-installer-retention)。
- 决定：[D-012](DECISIONS.md#d-012) 已生效。归档在推送 tag 成功后执行，先核对新版 SHA-256，再清理旧包和构建副本。
- 风险 / 未验证：六种隔离轮换场景和 56 项离线检查已有通过记录。尚未执行真实发布、CI 或新安装包实机安装。推送成功仅表示 CI 已触发。
- 接手入口：[待验证步骤](task_plan.md#2026-11-13-task-plan-local-installer-retention)、[发布规则](../rules/RELEASE.md#本地安装包缓存)。文档核对使用 `powershell -NoProfile -File internal/tools/check_task_records.ps1`。
- 工作区状态：`master` 比本机记录的 `origin/master` 领先 5 个提交。轮换相关改动包含 `release.cmd`、新脚本 `internal/tools/archive-local-installer.ps1`、发布规则、任务记录和 8 个旧安装包删除，均待提交。原有任务文档改动仍在。

<a id="2026-11-13-progress-local-installer-retention"></a>
## 2026-11-13 本机安装包清理与轮换【Codex操作】

- 按用户指令保留 `nsis/VoxAlic_1.6.3_x64-setup.exe`。删除 `nsis/` 中 25 个旧包和 release bundle 下 42 个安装包（含 v1.6.3 构建副本），文件总计 759,161,577 字节，磁盘可用空间增加 759,255,040 字节。保留文件 SHA-256 为 `ff93fdea06b6659d6094321bdd9b4bb279bd4be4f0f10adb1e6f667a26241337`。检查的三个 ZIP 内容各异。
- 发布规则见 [D-012](DECISIONS.md#d-012)。本地分发构建只生成 NSIS，推送 tag 成功后才校验归档新版并清旧包。八个 Git 跟踪的旧安装包显示为工作区删除，后续按常规提交纳入。
- 隔离验证覆盖成功、缺失源文件、目标同名冲突、源哈希不符、已有更高版本和失败重试，全部符合预期。56 项离线检查通过，任务记录无错误。未运行正式发布、CI 或重新构建安装包。

<a id="2026-11-13-progress-workspace-size-cleanup-duplicates"></a>
## 2026-11-13 outputs 重复副本与旧验收 EXE 清理【Codex操作】

- 用户确认一次清理本轮列出的 224 个文件。删除 218 个紫卡 OCR 重复诊断文件、10 月 9 日的 raw-drop-diff.json、11 月 12 日 04:14 的 3 个重复任务备份，以及 2 个 v1.5.13 发布前验收 EXE。文件共 153,794,720 字节，磁盘可用空间增加 154,226,688 字节。
- 诊断文件保留同名同哈希副本和每个独有阶段的证据。需要回看旧诊断时，按文件在 traces、traces-index-audit、traces-relabel238 间的相对路径恢复对应副本，核对同轮逐层 JSON 或当时的原始快照。掉落差异副本保留在 upstream-review-2026-10-12，三个任务文件保留在 tasks-snapshot-2026-11-12。旧验收程序的构建记录及哈希见[预检记录](../logs/release-preflight-v1.5.13-2026-10-21.md)。
- 已复核 224 个目标全部删除，114 个保留副本的 SHA-256 与删除前一致。后续如需瘦身，先汇总可再生产物、重复副本和独有证据，列出单批范围、恢复依据和预计释放空间。
- 验证：56 项离线检查通过，任务记录 0 错误，仍有既有归档链接与体积告警。检查后 224 个清理目标仍全部缺失，outputs 剩 4,901 个文件、1,252,103,345 字节。

<a id="2026-11-13-progress-workspace-size-cleanup"></a>
## 2026-11-13 工作区清理收口【Codex操作】

- T-WORKSPACE-SIZE（2026-11-13 至 2026-11-13）：用户授权清理指定的旧候选中间文件。首批 10 个目录由用户在本机删除后已核实。本批删除 45 个 JSON（767,789,159 字节），磁盘可用空间增加 767,889,408 字节，约 732 MiB。清理后 outputs 共 5,125 个文件，约 1.31 GiB。
- 恢复定位：static-source-candidates 中 zNwFEG、RF0VRy、OrkbbN、opizkX、nWJQuc、koQoso、JR9xS5、JNn6aX、c4wu1J 各清理 wfcd-items-combined.json、wfcd-drop-data.json、warframe-market-items.json，封存包见各批 input-reference.json。official-source-candidates 中 zdjjte、yn8oE5、SmNwxH、rdWd8q、Jd1AVl、f9FOUI、f4KOpp、EBVsym、47neZC 各清理 combined.json、drops.json，按各批 current/input-manifest.json 的 SHA-256 在 internal/local-data/static-checks 定位封存包。45 个文件均在删除前从封存原文复算并核对 SHA-256 一致。旧候选若需复验，先将对应文件恢复到原路径。
- 验证：56 项离线检查通过，任务记录 0 错误，已有归档链接及体积警告仍在。确认 45 个目标未重建，历史事务备份、两个旧验收 EXE 和 OCR 回放报告仍在。未重新运行旧候选完整性检查。

<a id="2026-11-13-progress-local-acceptance"></a>
## 2026-11-13 本地功能验收收口：赏金最高档提醒通过【DS操作】

- 用户确认三个赏金板最高档提醒验收通过。结合 2026-11-12 已通过的两项（设置 → 测试提醒标题为 VoxAlic；紫卡榜 1060×680 / 700×500 显示正常），T-LOCAL-1111 三项全部通过。
- 处理：T-LOCAL-1111 结束日期记为 2026-11-13，按共同流程先写入最终结果，再移出活动看板；原文与证据保留在本段和[2026-11-12 确认记录](progress.md#2026-11-12-progress-user-confirm)。
- 范围：本轮只记录验收结果，未改源码、未构建、未做 Git 操作。
- 验证：`check_task_records` 0 错误（3 任务、11 决定）；`check_agent_docs` 通过。
- 未验证：最高档提醒的测试分辨率与触发条件未记录；本轮未重跑构建，沿用 2026-11-11 本地交付产物。

<a id="2026-11-13-progress-workspace-size"></a>
## 2026-11-13 工作区体积评估（只读）【DS操作】

- 做了什么：统计 42,382 个文件、27.2 GB；按目录拆分 `src-tauri/target`、`outputs`、`internal`、`nsis`、`.git`；对 `outputs` 69 个目录逐个计算体积、文件数和被 `docs/`、`internal/` 引用次数；核对 `MARKDOWN_INVENTORY.md` 的 105 条迁移对照。
- 结果：零信息损失可删约 299 MB，过程证据约 2.7 GB，不建议删约 24 MB，详见[体量事实](findings.md#2026-11-13-findings-workspace-size)。
- 验证：`git status` 干净；未删除、未移动、未改权限；自建临时测试文件已清理。
- 异常：写入 `outputs`、`docs`、`src` 等子目录被系统拒绝；`diagnose-windows-sandbox-acl` 结论 `NOT_THIS_CLASS`，报告 `C:\Users\TDD\Desktop\dsh-acl-recovery-2026-11-13\acl-report-3ac26be65ce640cca41a27488d27c8b8.jsonl`。
- 下一步：等用户决定删除范围；执行需可写会话。

## 2026-11-13 会话交接【DS操作】

- 接手者：Codex（下一会话从本段接续，按 BOARD 的 T-WORKSPACE-SIZE 定位）
- 范围：只做只读评估与记录；用户明确“不用删”。不允许删除、移动、改权限或执行 Git 写操作。
- 已完成：工作区体量统计、`outputs` 69 个目录引用核对、三档分类与权限阻塞定位，证据见[体量事实](findings.md#2026-11-13-findings-workspace-size)和[执行记录](progress.md#2026-11-13-progress-workspace-size)。
- 未完成 / 下一步：用户选定范围后再执行删除；执行前复核路径与文件数，并确认无 `cargo`、`node`、`tauri` 占用。在本机写 `docs/` 需要可写会话（当前会话受限）。
- 决定：本次未新增 D-xxx，未作任何取舍授权。
- 风险 / 未验证：删除后的实际空间回收未实测；“删了会失去什么”按引用关系推断，非实删验证；完整性级别问题是否影响其他会话未验证。
- 接手入口：`BOARD.md` 的 `T-WORKSPACE-SIZE` → [体量事实](findings.md#2026-11-13-findings-workspace-size) → 本段；复跑 `powershell -NoProfile -File internal/tools/check_task_records.ps1`。
- 工作区状态：git clean，本地领先 origin 5 个提交；根目录 7 个 `_*.py` / `_*.json` 为上一轮遗留未动；`C:\Users\TDD\Desktop\dsh-acl-recovery-2026-11-13` 只有诊断报告。

<a id="2026-11-13-progress-recording-modes"></a>
## 2026-11-13 记录方式写入共同流程【DS操作】

- 按用户确认，在 `docs/tasks/README.md` 增加“记录方式”：Agent 进度记录只写事实与结果，人为触发记录写交接快照（范围、已完成、下一步、决定、风险、入口、工作区状态）。
- 明确关系：进度记录是日志，交接记录是快照并引用日志；完成或中断无进度记录视为未交付，多步任务无交接记录不得跨会话恢复。
- 验证：`check_task_records` 0 错误（3 任务、11 决定）；`check_agent_docs` 通过。

<a id="2026-11-13-progress-archive"></a>
## 2026-11-13 记录归档整理【DS操作】

- 按用户确认分批搬移：10 月 280 段（`5a77711`）、8–9 月 141 段（`0a13885`）、无日期早期草稿 44 段（`21fb7af`），共 465 段；保留 OCR 3 段、活动判定器 1 段、功能想法 / 长期项目 / Mod 分类 3 段。
- 10 月批次进入 `archive/2026-11/batch2/`，其余进入 `batch3/`、`batch4/`；原因：`archive/2026-10` 与 `2026-11` 顶层已存在，工具拒绝覆盖。
- 验证：`check_task_records` 0 错误（ID 1,293、指针 509）；`check_agent_docs` 通过；三份 176.4 / 130.3 / 136.5 KiB。
- 备份：`outputs/tasks-backup-2026-11-13T04-10-57-825Z`、`04-23-27-517Z`、`04-36-31-518Z`。
- 搬前核对：目标段无显式锚点、无入链；搬后保留项仍在活动区。

<a id="2026-11-12-progress-docs-audit"></a>
## 2026-11 已归档（指针）

- [已归档] 2026-08 会话 — CNN v5 迭代 + 实机诊断 + 30 轮路线讨论 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-2026-08-cnn-v5-30 — 已归档
- [已归档] CNN 训练版本演进 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-cnn — 已归档
- [已归档] 归档状态 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-section-0f55a3b1 — 已归档
- [已归档] 最后一轮构建补全 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-section-c1ecec28 — 已归档
- [已归档] 本轮源码修改 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-section-5aa6f0a7 — 已归档
- [已归档] 验证与产物 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-section-49c9977d — 已归档
- [已归档] 赏金最终形态纠正 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-section-e389c9d6 — 已归档
- [已归档] 稀有度图标内嵌 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-section-8f249d95 — 已归档
- [已归档] 后续：赏金折叠与来源调查 → docs/tasks/archive/2026-11/batch4/progress.md#undated-progress-section-fe8f54ba — 已归档

## 2026-11 已归档（指针）

- [已归档] 2026-09-30 隔离中文大字典同步【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-30-progress-section-25f86ef6 — 已归档
- [已归档] 2026-09-29 遗物专栏版式固化【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-29-progress-section-68fedb34 — 已归档
- [已归档] 2026-09-29 最终验证与问题处理【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-29-progress-section-1b0578d1 — 已归档
- [已归档] 2026-09-29 新版部件文件接入与静态数据准备【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-29-progress-section-b2210dd1 — 已归档
- [已归档] 2026-09-29 游戏数据来源表与新部件适用性检查【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-29-progress-section-c4d52aab — 已归档
- [已归档] 2026-09-29 运行时节点中文名优先更新【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-29-progress-section-4e388fe2 — 已归档
- [已归档] 2026-09-28 WFCD 社区文件变化调查与封存【DS操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-28-progress-wfcd — 已归档
- [已归档] 2026-09-27 本地提交范围与检查【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-27-progress-section-d41bb312 — 已归档
- [已归档] 2026-09-27 接入后归档整理【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-27-progress-section-198e93af — 已归档
- [已归档] 2026-09-27 12:10检查与影响记录【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-27-progress-12-10 — 已归档
- [已归档] 2026-09-27 离机前本地提交交接【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-27-progress-section-ac76af72 — 已归档
- [已归档] 2026-09-27 全面补记9月26日研究与检查【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-27-progress-9-26 — 已归档
- [已归档] 2026-09-26 补齐历史演示文件本地提交【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-26-progress-section-0f577808 — 已归档
- [已归档] 2026-09-26 更新 44 部分官方掉落接入【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-26-progress-section-06bc2ea5 — 已归档
- [已归档] 2026-09-24 游戏小图标内嵌计划【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-24-progress-section-43f69c7c — 已归档
- [已归档] 2026-09-24 市场优化 R01–R03 落地与记录【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-24-progress-r01-r03 — 已归档
- [已归档] 2026-09-24 本地版本提交准备【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-24-progress-section-b4973d01 — 已归档
- [已归档] 2026-09-24 更新 44 上游复核【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-24-progress-section-6f3025c8 — 已归档
- [已归档] 2026-09-24 K10 与次日发布节奏记录【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-24-progress-k10 — 已归档
- [已归档] 2026-09-23 更新 44 上线前异常记录【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-23-progress-section-d19d4d3e — 已归档
- [已归档] 2026-09-23 社区文件内容指纹隔离验证启动【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-23-progress-section-96bec310 — 已归档
- [已归档] 2026-09-22 更新前置准备（清单 / 基线 / 新闻模块核查 / 待办清理）【DS操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-22-progress-section-d8299880 — 已归档
- [已归档] 2026-09-19 第二次接受快照（上游隔夜又推进）【DS操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-19-progress-section-6e1694eb — 已归档
- [已归档] 2026-09-19 来源包刷新并接受（WFCD items commit 前进）【DS操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-19-progress-wfcd-items-commit — 已归档
- [已归档] 2026-09-10 来源显示修正【DS操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-10-progress-section-92a34a9c — 已归档
- [已归档] 2026-09-09 最后一次交接记录【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-09-progress-section-87ee480d — 已归档
- [已归档] 2026-09-09 遗物专栏确定性生成【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-09-progress-section-01dbfcd9 — 已归档
- [已归档] 2026-09-09 最终收尾【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-09-progress-section-76056628 — 已归档
- [已归档] 2026-09-08 本地提交审查【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-9b2064eb — 已归档
- [已归档] 2026-09-08 第4项收尾：名称与目录离线候选【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-d7e85dac — 已归档
- [已归档] 2026-09-08 第4项阶段完成：离线来源候选复用【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-c6a06cb7 — 已归档
- [已归档] 2026-09-08 第3项：PvP生成器迁移完成【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-3-pvp — 已归档
- [已归档] 2026-09-08 第2项：输入与派生产物清单【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-a46e4778 — 已归档
- [已归档] 2026-09-08 第1项：日志与交接入口收口【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-03a48ad4 — 已归档
- [已归档] 2026-09-08 同轮共享输入检查完成【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-0c55fa97 — 已归档
- [已归档] 2026-09-08 会话检查点记录【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-1ad7cad1 — 已归档
- [已归档] 2026-09-08 今晚流程文档小批次【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-cecd0c05 — 已归档
- [已归档] 2026-09-08 换环境前流程收尾首轮检查【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-08-progress-section-6776c28b — 已归档
- [已归档] 2026-09-06 裂缝订阅菱形标记【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-06-progress-section-fa8e0ac7 — 已归档
- [已归档] 2026-09-06 完整更新日志自适应高度【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-06-progress-section-c08672e8 — 已归档
- [已归档] 2026-09-05 发布准备自动推进规则【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-05-progress-section-b8ed7b1d — 已归档
- [已归档] 2026-09-05 启动动画配色统一【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-05-progress-section-d3d1b11d — 已归档
- [已归档] 2026-09-05 额度收尾交接与本地提交准备【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-05-progress-section-f2c956c5 — 已归档
- [已归档] 【Codex操作】2026-09-05：单项敌人译名确认记录 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-05-progress-section-58f162ba — 已归档
- [已归档] 【Codex操作】2026-09-05：验收反馈修复进行中 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-05-progress-section-7395e9fe — 已归档
- [已归档] 【Codex操作】2026-09-03：开始重做自适应 Primer 世界时间页 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-03-progress-primer — 已归档
- [已归档] 【Codex操作】2026-09-01：固定 Market 来源与更新交接规则 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-01-progress-market — 已归档
- [已归档] 【Codex操作】2026-09-01：开始实施 Market 来源生成链 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-01-progress-market-6b12 — 已归档
- [已归档] 【Codex操作】2026-09-01：完成当前日志入口整理 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-01-progress-section-183823df — 已归档
- [已归档] 【Codex操作】2026-08-30：OCR 滚动高置信基准实现 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-30-progress-ocr — 已归档
- [已归档] 【Codex操作】2026-08-27：记录 OCR 训练管理拆分停点 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-27-progress-ocr — 已归档
- [已归档] 【Codex操作】2026-08-27：开始拆分 OCR 训练管理 command → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-27-progress-ocr-command — 已归档
- [已归档] 【DS操作】2026-08-13：OCR 高置信度同步闸门 — 讨论定案，明日实施 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-13-progress-ocr — 已归档
- [已归档] 【Codex操作】2026-08-14：一次性 OCR 可靠校准与永久日志（实施中） → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-14-progress-ocr — 已归档
- [已归档] 【Codex操作】2026-08-14：一次性 OCR 校准与永久日志完成 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-14-progress-ocr-4774 — 已归档
- [已归档] 【Codex操作】2026-08-15：OCR 人工批注 HTML 完成 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-15-progress-ocr-html — 已归档
- [已归档] 【Codex操作】2026-08-15：CNN v10 候选训练与置信度复核页 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-15-progress-cnn-v10 — 已归档
- [已归档] 【Codex操作】2026-08-15：普通模式永久 OCR 基准与训练帧轮换规则 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-15-progress-ocr — 已归档
- [已归档] 【Codex操作】2026-08-15：OCR 模型与数据集归档完成 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-15-progress-ocr-95d3 — 已归档
- [已归档] 【Codex操作】2026-08-16：OCR 归档提交与 VoxAlic v1.3.9 发布 → docs/tasks/archive/2026-11/batch3/progress.md#2026-08-16-progress-ocr-voxalic-v1-3-9 — 已归档
- [已归档] 最终构建结果（2026-09-04） → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-04-progress-section-99806f9b — 已归档
- [已归档] 【Codex操作】2026-09-06：敌人中文人工补全入库 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-06-progress-section-ae369854 — 已归档
- [已归档] 【Codex操作】2026-09-06：隔离式统一中文大字典基线 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-06-progress-section-fccbcb99 — 已归档
- [已归档] 2026-09-30 世界时间活动分区空态隐藏【Codex操作】 → docs/tasks/archive/2026-11/batch3/progress.md#2026-09-30-progress-section-4dc4f1da — 已归档

## 2026-11 已归档（指针）

- [已归档] 2026-10-31 Riven Mirror分支与网站时效纠正【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-riven-mirror — 已完成
- [已归档] 2026-10-31 个人订单代理回退修复【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-section-8a5924fa — 已完成
- [已归档] 2026-10-31 每秒消息与启动/包体优化【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-section-92e696a8 — 已完成
- [已归档] 2026-10-31 WM 机器人查价与排行提速研究【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-section-848b758f — 已完成
- [已归档] 2026-10-31 补齐历史文档本地提交【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-section-5dd52b7b — 已完成
- [已归档] 2026-10-31 本地提交前审查【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-section-5de8dd10 — 已完成
- [已归档] 2026-10-31 planning-with-files收口记录【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-planning-with-files — 已完成
- [已归档] 2026-10-31 CPU与窗口按需创建开工【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-31-progress-cpu — 已完成
- [已归档] 2026-10-29 本轮开工【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-29-progress-section-45ffef39 — 已完成
- [已归档] 2026-10-28 上游热修与静态数据新鲜度检查（只读）【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-28-progress-section-fc4f3996 — 已完成
- [已归档] 2026-10-27 移除紫卡「倾向」字段【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-27-progress-section-778ef1d4 — 已完成
- [已归档] 2026-10-27 按用户要求确认记录收尾【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-27-progress-section-9c454bdd — 已完成
- [已归档] 2026-10-27 持锁缩短与普通商品读取取消【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-27-progress-section-13faa384 — 已完成
- [已归档] 2026-10-26 本周科研词条补齐【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-26-progress-section-60f7c264 — 已完成
- [已归档] 2026-10-25 按用户要求补齐交付记录【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-25-progress-section-f8b3e32d — 已完成
- [已归档] 2026-10-25 启动包体与个人订单合并实施【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-25-progress-section-b0af506a — 已完成
- [已归档] 2026-10-25 记录并展示剩余优化【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-25-progress-section-7528a952 — 已完成
- [已归档] 2026-10-25 继续性能、网络和手感优化【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-25-progress-section-0835c4a5 — 已完成
- [已归档] 2026-10-25 性能优化实施：隐藏页秒级绘制【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-25-progress-section-1be30a83 — 已完成
- [已归档] 2026-10-25 记录与剩余优化报告【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-25-progress-section-4dc9977b — 已完成
- [已归档] 2026-10-25 市场目录常驻索引实施【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-25-progress-section-33c90bd2 — 已完成
- [已归档] 2026-10-24 更新安装改为完全静默（quiet）【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-24-progress-quiet — 已完成
- [已归档] 2026-10-24 更新横幅动效 + 真实下载进度接入【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-24-progress-section-3cec59f7 — 已完成
- [已归档] 2026-10-24 设置动效HTML预览【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-24-progress-html — 已完成
- [已归档] 2026-10-24 市场403根因追踪【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-24-progress-403 — 已完成
- [已归档] 2026-10-24 在线状态恢复与删两行说明【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-24-progress-section-a82eec25 — 已完成
- [已归档] 2026-10-24 本地诊断日志增强实施【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-24-progress-section-81d124ae — 已完成
- [已归档] 2026-10-24 获取失败自动恢复与原位重试【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-24-progress-section-0b0d36f2 — 已完成
- [已归档] 2026-10-23 本地提交结果补记【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-5a555759 — 已完成
- [已归档] 2026-10-23 本地提交审查【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-7be8e969 — 已完成
- [已归档] 2026-10-23 全部同步、构建与重启完成【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-c51a1137 — 已完成
- [已归档] 2026-10-23 新数据Rust回归发现与修正【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-rust — 已完成
- [已归档] 2026-10-23 数据接受完成【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-542d5f48 — 已完成
- [已归档] 2026-10-23 精确计划应用授权【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-5aff19f3 — 已完成
- [已归档] 2026-10-23 最终候选与回归完成【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-15fb9ef0 — 已完成
- [已归档] 2026-10-23 整批同步准备与验证【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-089af839 — 已完成
- [已归档] 2026-10-23 确认防御B轮同步【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-a06225f6 — 已完成
- [已归档] 2026-10-23 确认Armatus C轮同步【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-armatus-c — 已完成
- [已归档] 2026-10-23 确认38组任务概率变化【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-d74b3fd7 — 已完成
- [已归档] 2026-10-23 名称库业务确认与下一项【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-8e101194 — 已完成
- [已归档] 2026-10-23 上游数据全量报告【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-23-progress-section-aaeae174 — 已完成
- [已归档] 2026-10-22 本地提交审查与验证【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-b84ce144 — 已完成
- [已归档] 2026-10-22 调用中文版规划 Skill 验证路由【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-skill — 已完成
- [已归档] 2026-10-22 Markdown 分类归档与规划入口【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-markdown — 已完成
- [已归档] 2026-10-22 硬路由复核与 Markdown 清点【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-markdown-90db — 已完成
- [已归档] 2026-10-22 记录整理与最终交接【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-691a9d18 — 已完成
- [已归档] 2026-10-22 删除按钮原位变形与计数尺寸【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-2b430406 — 已完成
- [已归档] 2026-10-22 扩展市场滑块与删除进度收口【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-7d20b266 — 已完成
- [已归档] 2026-10-22 接入已验收动效 Demo【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-demo — 已完成
- [已归档] 2026-10-22 市场按钮动效【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-9c1d6444 — 已完成
- [已归档] 2026-10-22 在线状态记忆 + 账号徽章颜色同步【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-e0e82d9d — 已完成
- [已归档] 2026-10-22 我的订单表头与列对齐修正【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-59f612e3 — 已完成
- [已归档] 2026-10-22 批量订单：新增订单弹窗多行 + 先删除再勾选【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-0dcaef9a — 已完成
- [已归档] 2026-10-22 反馈区块收敛 + 上架进度环 + 更新检测改 15 分钟【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-section-58fefbf9 — 已完成
- [已归档] 2026-10-22 应用内确认框替换原生 confirm【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-confirm — 已完成
- [已归档] 2026-10-22 加载特效方向确认与 Demo v3【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-22-progress-demo-v3 — 已完成
- [已归档] 2026-10-21 样本 7 取证落账 + 第 8 窗口判决【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-7-8 — 已完成
- [已归档] 2026-10-21 更新提示改为页面横幅 + 每小时检测【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-9be9688c — 已完成
- [已归档] 2026-10-21 中文订单卡片与赏金模式显示【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-e12eeec8 — 已完成
- [已归档] 2026-10-21 个人订单卡片与赏金模式核对【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-9daf368a — 已完成
- [已归档] 2026-10-21 交接 Codex：紫卡修复完成、待办清点结束【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-codex — 已完成
- [已归档] 2026-10-21 紫卡目录加载故障修复【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-3caf07bc — 已完成
- [已归档] 2026-10-21 样本 5 取证落账 + 第 6 窗口判决【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-5-6 — 已完成
- [已归档] 2026-10-21 今日汇总与当前版本本地提交【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-8cc12798 — 已完成
- [已归档] 2026-10-21 普通市场固定排序与单工具栏【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-72456414 — 已完成
- [已归档] 2026-10-21 普通市场实时刷新与组合筛选【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-80cbcd40 — 已完成
- [已归档] 2026-10-21 挂单成功后的按钮排版【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-d43d2fbb — 已完成
- [已归档] 2026-10-21 perTrade拒绝修复【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-pertrade — 已完成
- [已归档] 2026-10-21 挂单排名效果复查【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-9c792bcb — 已完成
- [已归档] 2026-10-21 更新挂单接入【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-21-progress-section-0164fb68 — 已完成
- [已归档] 2026-10-20 样本 4 取证落账 + 第 5 窗口判决【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-20-progress-4-5 — 已完成
- [已归档] 2026-10-20 当前版本地提交授权与范围【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-20-progress-section-45ab77dd — 已完成
- [已归档] 2026-10-20 Market声望文字过亮修复【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-20-progress-market — 已完成
- [已归档] 2026-10-20 样本 2b 补证 + 窗口内恒定【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-20-progress-section-f66aa08b — 已完成
- [已归档] 2026-10-20 样本 3 取证落账 + 4 窗口判决【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-20-progress-3-4 — 已完成
- [已归档] 2026-10-19 本周科研截图记录【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-19-progress-section-32c61651 — 已完成
- [已归档] 2026-10-19 c分支控件手感【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-19-progress-section-f6838217 — 已完成
- [已归档] 2026-10-19 发布收尾与上游复查【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-19-progress-section-d7fcd4f6 — 已完成
- [已归档] 2026-10-16 战甲排行出入库标记与说明精简【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-16-progress-section-65e7894e — 已完成
- [已归档] 2026-10-16 本地提交补记与后续优化评估【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-16-progress-section-cd44d131 — 已完成
- [已归档] 2026-10-16 价格排行优化验收完成，发布暂缓【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-16-progress-section-89c40e84 — 已完成
- [已归档] 2026-10-16 抖音宣传素材与后续 bug 反馈记录【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-16-progress-bug — 已完成
- [已归档] 2026-10-16 活动接入与离线检查回归修复【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-16-progress-section-284a1db0 — 已完成
- [已归档] 2026-10-16 上游静态数据检查（review_required）【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-16-progress-review-required — 已完成
- [已归档] 2026-10-15 投影 hub UI 调整与公共遗物检索重写【DS操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-15-progress-hub-ui — 已完成
- [已归档] 2026-10-14 热修提交与交接结果补记【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-14-progress-section-d0fbe480 — 已完成
- [已归档] 2026-10-14 可复用功能热修实施【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-14-progress-section-1dded1ae — 已完成
- [已归档] 2026-10-14 活动解析修复【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-14-progress-section-d49f3c5e — 已完成
- [已归档] 2026-10-12 本地提交审查【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-12-progress-section-7ddef7c3 — 已完成
- [已归档] 2026-10-12 官方来源独立接入【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-12-progress-section-f50373ed — 已完成
- [已归档] 2026-10-12 Market 目录独立接入【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-12-progress-market — 已完成
- [已归档] 2026-10-12 上游数据复查【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-12-progress-section-3eee2b59 — 已完成
- [已归档] 2026-10-12 本周科研词条校准【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-12-progress-section-0e679c09 — 已完成
- [已归档] 2026-10-09 上游数据检查【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-09-progress-section-29a136cb — 已完成
- [已归档] 2026-10-07 本周科研卡片补全【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-07-progress-section-3c7360e5 — 已完成
- [已归档] 2026-10-02 世界时间万圣活动中文显示【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-02-progress-section-91bdddfd — 已完成
- [已归档] 2026-10-01 上游数据检查与跟进【Codex操作】 → docs/tasks/archive/2026-11/batch2/progress.md#2026-10-01-progress-section-9b867112 — 已完成

## 2026-11-12 文档架构与协作专项审计【DS操作】

- 用户把本会话定为“优化多 Agent 协作组织与 docs 整体架构”，逐条评估了 11 个结构问题。
- 已执行并提交：删除 `internal/archive/retired-voxalic-work`（`4a4e033`）；硬路由拆为 `docs/routing/` 三组（`dae7173`）。
- 用户结论：第 2 条“必读无验证”、第 3 条“路由漏读”不修；第 4 条“规则重复”接受为交叉验证素材；第 5 条“新增文档受阻”已由拆分解决。
- 验证：`check_agent_docs.ps1` 与 `check_task_records.ps1` 通过；13 份领域文档全部可达。
- 过程中编辑器去掉 `check_agent_docs.ps1` 的 UTF-8 BOM，Windows PowerShell 解析中文失败；写回 BOM 后复检通过。
- 收口：第 6、7、11 条维持现状；第 9 条删除 `check-complete.sh`（`61b99bd`）；第 10 条删除本地设计存档并提交记录（`90c37d5`）。
- 新增活动任务起止日期：看板字段、共同流程与检查器同步；结束日期作为归档判断依据，不从正文推断。
- 归档执行：10 月 280 段（`5a77711`）、8–9 月 141 段、无日期早期草稿 44 段；保留 OCR 3 段（暂缓）、活动开放判定器 1 段、功能想法/长期项目/Mod 分类 3 段。三份记录降至 176.4 / 130.3 / 136.5 KiB。
- 未提交：`progress.md` 的 agent-console 条目与设计文档仍在工作区。

<a id="2026-11-12-progress-routing-split"></a>
## 2026-11-12 硬路由拆分为三组【DS操作】

- 按用户确认的“横向拆分”执行：`AGENT_GUIDE.md` 的 14 行路由表原样搬到 `docs/routing/game.md`、`engineering.md`、`collab.md`，根规则只保留三行分组入口。
- `AGENT_GUIDE.md` 从 12,215 B 降到 10,084 B；检查脚本改为“每份领域文档必须至少被一个路由组引用”，并校验三个组都被根规则列出。
- 验证：`check_agent_docs.ps1` 通过（24 份必读/索引文档）；`check_task_records.ps1` 通过（0 错误）；13 份领域文档逐一确认可达。
- 编辑脚本时 UTF-8 BOM 被编辑器去掉，Windows PowerShell 解析中文报错；写回 BOM 后复检通过。
- 未提交 Git。

<a id="2026-11-12-progress-retired-archive-delete"></a>
## 2026-11-12 删除旧仓库归档目录【DS操作】

- 用户确认删除 `internal/archive/retired-voxalic-work`（9 个文件，约 0.7 MB）：三份旧记录与 `docs/tasks/archive/` 重复，旧根 `AGENTS.md`/`CLAUDE.md`/`.hermes.md` 会被 Agent 自动加载为规则。
- 已删除整个目录；同步移除 `docs/README.md` 的归档链接，`docs/MARKDOWN_INVENTORY.md` 改为删除说明，迁移记录保留当时的哈希结论。
- 未执行 Git 提交；工作区现有 9 个已删除文件待用户授权提交。
- 验证：`check_agent_docs.ps1` 与 `check_task_records.ps1` 结果见本轮报告。

<a id="2026-11-12-progress-agent-console-design"></a>
## 2026-11-12 多 Agent 会话台设计与技术方案【DS操作】

- 用户提出开发类似 Grok bot 的多 Agent 会话界面，用于开发 VoxAlic；经确认本轮只做设计与技术方案，首版目标为可交互界面原型。
- 已读全局规则、架构、视觉基线与 DECISIONS；确认仓库无同类代码，现有 Tauri + Vanilla TS 产品形态不变。
- 产出设计方案（已删除本地存档；设计在桌面 `agent-console` 项目）：推荐独立本地 Web 工具（`internal/agent-console/`），圆桌/并行双模式、服务端编排、SSE 事件流、JSONL 事件溯源、默认只读 + 审批写入；M0 单文件原型到 M4 模板与成本面板。
- 未写应用代码、未改产品源码与视觉、未新增依赖、未构建、未 Git。
- 待 xuziyu 确认：原型形态、默认模型/密钥、默认模式、写入权限、目录与提交、参照产品。
- 同日按 xuziyu 决定移出本项目：独立项目位于 `C:\Users\TDD\Desktop\agent-console`（含 README、设计副本与 .gitignore），状态“独立于 VoxAlic，持续开发中”；VoxAlic 不再跟踪该任务，BOARD 的 T-AGENT-CONSOLE 已移除，仅保留本条记录。

<a id="2026-11-12-progress-freeze-review"></a>
## 2026-11-12 CC 复核冻结决定与 fail-closed 修复【Claude Code操作】

- 接受 D-008：不再改结构，进入 1–2 周观察期。本条只核对 DS 的修复与冻结范围，不提新结构改动。
- fail-closed 独立复现通过（临时目录）：同月目标已存在时 `applyMonth` 抛错拒绝，旧目标保持 `OLD`，源段未删，未生成备份、未写第二目标。本次修复有效。
- 冻结前检查仍全绿：`check_agent_docs` 通过；`check_task_records` 2 tasks / 8 decisions / 0 errors，828 IDs / 44 pointers / 0 errors；`test-task-workflow` 11/11；`git diff --check` 通过。
- 观察期只报告、不修的四项，现状登记如下（与 `task_plan.md` 审计第 3 节同编号）：
  - 第 1 项 T-DOCS 口径：`task_plan.md:71` 与 `progress.md` 验收记录仍并存"已收口 / 移出看板"两种说法。
  - 第 3 项 28,132 B「归档状态」段仍在 `progress.md`，未移动。
  - 第 5 项 `docs/logs/docs-workflow-2026-11-12.md` 仍有"尚未执行"正文与顶部补记并存。
  - 第 4 项证据锚点：`check-task-workflow.cjs` 的 `checkLinks` 只对 `d-\d{3}`、`docs-workflow-`、归档 ID 三类片段校验锚点；BOARD 指向 `task_plan.md` 的一般链接不校验段落存在。
- 风险提示：这四项都是"看的人会困惑"级别，不阻塞真实任务。若观察期内出现因它们导致的误读，按 D-008 先报告 xuziyu，不自行改结构。
- 未改工具、归档、根入口或产品规则；未构建；未 Git。

<a id="2026-11-12-progress-freeze"></a>
## 2026-11-12 结构冻结，进入观察期（给 CC）【DS操作】

- 用户决定：不再改文档流程结构，先用 1–2 周；已登记 D-008。
- CC 审计的问题已收到；归档工具同月覆盖 bug 已修（fail-closed），其余不阻塞，观察期内不逐条修。
- 归档工具修复：`applyMonth` 在写入前检查目标是否存在，存在则拒绝并保留源段/旧目标；`task-archive-move.cjs` 输出简短错误。临时 fixture 验证：已存在目标保持 `OLD`、源段未动；无目标时仍正常搬 1 段并写指针。
- 给 CC：请不要再改根入口、BOARD/DECISIONS/README、三份记录结构或归档工具；只记录真实使用问题。下次归档仍先 dry-run，确认目标不存在。
- 观察三件：BOARD 能否直接答当前状态；Agent 是否引用现行决定；BOARD 是否一周内过期。
- 本轮只改归档工具的 fail-closed 与文档说明；未改其他结构/源码；未构建，未 Git。

<a id="docs-workflow-cc-audit-progress"></a>
## 2026-11-12 CC 落地后只读审计【Claude Code操作】

- 用户要求"看日志和现有结构"。只读核对：`check_agent_docs.ps1`、`check_task_records.ps1`、`test-task-workflow.cjs`（11/11）、`git diff --check` 均通过。
- 独立核对归档完整性：22 个归档文件与 `outputs/docs-workflow-20261112T074152Z/before/` 去锚点/归档 ID/链接后逐字节相同；828 段、0 重复标题、INDEX 828 行。
- 三份活动文件与实施前备份按段比对：原有 178 段一段不少；共新增 85 段（task_plan 33 / findings 16 / progress 36），全部为今天的实施与讨论记录。体积 711→366 KB、838→342 KB、982→396 KB，仍全部超过 256 KiB。
- 临时目录复现归档工具缺陷：`task-archive-lib.cjs` 的 `applyMonth` 对同一归档目标使用 `writeFileSync` 覆盖，同月第二来源会写进第一来源的文件。现行归档是单次循环产出，未受影响。
- 本轮自身错误（已纠正、未重复）：把 `test-task-workflow.cjs` 的失败当成 DS 改坏（实际是我改 BOARD 后未恢复）；把成对代码围栏数成"落单"（在 Bash 中反引号被 shell 展开，改用 grep 后 22 个全部成对，与实施前一致）。
- 结论与证据写入 `task_plan.md`「CC 落地后审计」与 `findings.md`「三方都说没问题」两段。
- 未改工具、源码、归档、根入口或产品规则；未构建；未 Git。

<a id="2026-11-12-progress-cleanup"></a>
## 2026-11-12 文档流程收尾并进入正常使用【DS操作】

- 用户确认接手测验结束，流程进入正常使用；生效登记规则选 A，已登记 D-007。
- 发布口径落盘：D-001 改为生效；T-RELEASE-SCOPE 从 BOARD 移出。
- T-LOCAL-1111：Toast 标题通过、紫卡榜双尺寸通过、赏金最高档仍在测试；BOARD 保留待验收。
- 修正 `test-task-workflow.cjs` 的 4 个过期夹具（重复 ID、被取代、自取代、锚点），重跑 11/11 通过。
- 更新 docs-workflow 报告顶部状态、任务书完成状态、README 的检索 fallback；给旧 DS 段加“实施前快照”标记。
- 检查：check_agent_docs 通过；check_task_records 2 tasks/7 decisions/0 errors、828 IDs/44 pointers/0 errors、3 体积 + 5 历史链接告警；check-task-workflow 0 errors；git diff --check 通过。
- 未改源码、产品规则，未构建，未 Git。

<a id="2026-11-12-progress-user-confirm"></a>
## 2026-11-12 用户确认发布口径、验收与正常使用【DS操作】

- 发布检查口径：用户明确“不是只有普通才检查吗，冻结不检查啊”。即普通发布执行 current-source；冻结已接受数据的功能热修不执行 current-source。该口径与 `RELEASE.md` 第 44、88–89、139 行一致；D-001 由“待核实”改为“生效”，T-RELEASE-SCOPE 收口。
- T-LOCAL-1111 实机验收：设置 → 测试提醒标题为 VoxAlic，通过；紫卡榜 1060×680 / 700×500 显示正常，通过；三个赏金板最高档提醒仍在测试，未收口。
- 生效登记规则：用户选择 A，即已有记录包含明确原话和日期时，Agent 可直接登记为“生效”；含糊或二手记录只能写“提议”。已登记 D-007。
- 用户确认接手测验结束，文档流程进入正常使用；T-DOCS 不再作为测试任务跟踪。
- 本轮确认阶段只更新任务记录；收尾修改见上段。

<a id="docs-workflow-acceptance"></a>
## 2026-11-12 文档接手流程验收收口【Codex操作】

- DS（Harness）与 CC 各完成一轮接手测验，主持者按预设标准复核，两轮均 9/10，通过。两轮验收时复跑文档检查均通过，保留既有 3 条体积告警和 5 条历史本机引用告警。
- 按用户要求撤回两边的临时答卷和任务记录改动。DS 的改动已在 CC 开测前恢复。本次恢复 CC 后，开测清单的 168 个文件 SHA-256 再次全部一致，随后仅写入本次正式验收结论并将 T-DOCS 移出活动看板。
- 恢复预检首次因看板空行与预设不符停止，未写入文件。调整匹配后按开测清单校验通过，再执行还原。
- 本机留存：[DS 原始答卷](../../outputs/docs-workflow-20261112T074152Z/ds-run/docs/logs/handoff-result.md)、[CC 原始答卷](../../outputs/docs-workflow-20261112T074152Z/cc-run/docs/logs/handoff-result.md)，各自目录包含原始任务记录和评分。
- 观察项：下次真实任务中断后，核对下一位能否从看板“最近完成点”直接继续。业务实机验收与发布检查范围按各自看板项接续。

<a id="docs-workflow-progress"></a>
## 2026-11-12 共同接手流程落地【Codex操作】

- xuziyu 已授权修改流程。编辑前备份和原始工作区清单位于本机 outputs/docs-workflow-20261112T074152Z。
- 归档 828 段与迁移前快照逐段规范化比对通过。共同入口、4 项当前任务与 6 条决策已登记，36 处引用修复；两项结构检查及 11 项回归通过，实际接手测验待执行。
- 详细验证结果在[实施报告](../logs/docs-workflow-2026-11-12.md)原位维护，当前任务见 [BOARD](BOARD.md)。

## 2026-11-12 复核“要不要改”并收敛为入口层【DS操作】

- 用户问“有把握能改好吗”。答：结构/工具改动有把握；Agent 行为只能提高概率，不能保证。当时活动文件 347.5/328.5/380.7 KiB，压到 256 KB 需减约 290 KB。
- 用户问“这一块要更多有我的参与是吧”。答：是，但只在判断点参与：确认现行决策、确认哪些旧内容可压、批新决定生效、抽查试点；搬运/格式由 DS 做。
- 用户说“那重新评估要不要改”。第一版建议：只做 BOARD + DECISIONS + README + `rg`，暂缓压缩/INDEX/试点；用户约 30–45 分钟。
- 用户说“再思考一下”。重新实测结构后收窄：
  - `task_plan.md` 224 段、5 行 `- **状态**`；`findings.md` 201 段、0；`progress.md` 251 段、0；
  - `task_plan.md` 前 365 行全是设计讨论；
  - 结论：不能自动生成 BOARD，问题在入口不在体积；改为 BOARD + 4 条决策 + README/根入口 + `rg`，用户 10–15 分钟；先聊天草稿，不落盘。
- 实测命令与结果：
  - `Get-Item` 三份文件：355,837 / 336,353 / 389,877 B；BOARD/DECISIONS MISSING；README 4,518 B。
  - 统计 `##` 与 `- **状态**`：224/5、201/0、251/0。
  - 列 `task_plan.md` 前 50 个 `##`：前 365 行均为 2026-11-12 记录系统设计/归档讨论。
  - `grep "**状态**"`：6 处；5 处 `- **状态**`，1 处正文（L2231）。
- 错误：PowerShell 直接把 `for` 语句接管道，报 `An empty pipe element is not allowed`；改为 `$out = for (...) {...}; $out | Select-Object` 后成功。未重复同一写法。
- 用户要求“完整记录一下，我要叫 codex 看了”。本轮只在三份 planning 文件顶部追加复核记录：
  - `task_plan.md`：新增「复核：要不要改、改到什么程度」，含实测、三方案、推荐范围、4 条候选决策、验证、给 Codex 的 7 个问题；
  - `findings.md`：新增「问题在‘当前状态入口’，不在文件体积」，含实测、判断、可复用判据、改变结论的条件；
  - 本段：记录对话过程、命令、错误、待办。
- 未创建 `BOARD.md` / `DECISIONS.md`；未改 README/根入口/归档/工具；未构建；未 Git。
- 待办：
  1. Codex 审 `task_plan.md` 新增段第 8 节；
  2. xuziyu 决定是否按 C 方案（入口层）做；
  3. 若批准，先在聊天里出 BOARD + 4 条决策草稿，用户改完再落盘；
  4. 落盘后再改 README/根入口，并跑 `check_agent_docs.ps1`。

## 2026-11-12 CC 最终确认 ADR-lite 定稿【Claude Code操作】

- 读 DS 14:34 的 ADR-lite 定稿、`README.md`（14:32）与 `check_task_records.ps1` 源码。
- 在 `task_plan.md` 顶部新增「CC 最终确认」：五问逐条回答（BOARD 独立必要、生效规则写 README 不写根入口、progress 按活动不按月、撤回双层索引、先试点）、README 4 处冲突（缺 BOARD/DECISIONS、顶部看板、64 KiB、641→649）、撤回我此前关于 INDEX 依赖的过度担心、实施顺序微调一处、边界。
- 在 `findings.md` 顶部新增「check_task_records.ps1 的校验路径」：实测第 50–63 行指针校验不读 INDEX，第 88–100 行只做反向检查；教训是工具行为必须读源码判断，不能从文档角色反推。
- 未创建 `BOARD.md` / `DECISIONS.md`，未改 README/根入口/脚本/归档；未构建；未 Git。本轮只追加两段。
- 待 xuziyu：是否按六步顺序授权；第 1 步含根入口修改，需单独授权并跑 `check_agent_docs.ps1`。

## 2026-11-12 记录 ADR-lite 最终总结【DS操作】

- 设计定稿：BOARD + DECISIONS + 活动任务 progress；决策提议/生效，只有 xuziyu 能批生效；决策写否决方案。
- progress 只放活动任务，终态整段归档，跨月标 `跨月`；不按自然月硬切。
- 不做双层索引/checksum/60KB 决策库；D-ID 仅高风险警告；先试点 1–2 周再动 649 段。
- 只写记录，未创建 BOARD/DECISIONS，未改工具/归档；等 CC 最后确认、xuziyu 授权。

## 2026-11-12 修正：progress 只放活动区【DS操作】

- 用户明确：`progress.md` 只放仍在活动的任务执行记录，历史做归档；不按自然月硬切。
- 终态任务整段归档；跨月未完成的任务留在 progress，标 `跨月`；活动日志过大时先压摘要，不拆任务。
- 已同步修正 task_plan 的 ADR-lite 设计和 README 读取顺序；未改归档/工具。

## 2026-11-12 CC 提出 ADR-lite 的 6 处精进提案【Claude Code操作】

- 用户要求思考方案是否还有精进空间并记录给 DS 看。判断：文件分工已到位，缺三条硬约束（看板不可增长、决策不可自我授权、检索不可自证）。
- 在 `task_plan.md` 顶部新增「CC 对 ADR-lite 的 6 处精进提案」：独立 `BOARD.md`（只重写不追加）、D-ID 提议/生效两态、决策行必须写“否决了什么”、决策与发现的判定规则、历史检索改为命令+命中数、progress 只轮转终态段；另附两条顺序建议和三条“不要再加复杂度”。
- 在 `findings.md` 顶部新增「追加型文件无法承载当前状态」：用本次实测（12:32 降到 1.03 MB，14:14 又回到 1.08 MB）证明追加型文件的结构性缺陷。
- 未创建 `BOARD.md` / `DECISIONS.md`，未改 README/根入口/脚本/归档；未构建；未 Git。本轮只追加两段。
- 待 xuziyu 决定：是否采纳独立 `BOARD.md`（涉及新增文件与根入口指针）、是否接受 D-ID 两态与“只有 xuziyu 能标生效”。

## 2026-11-12 CC 复核 ADR-lite 设计【Claude Code操作】

- 读 DS 14:12 的 ADR-lite 最终设计（`task_plan.md` 最终设计段、`findings.md` 大厂依据段）与其第八节 5 处差异。
- 核实字节预算：根 `CLAUDE.md`/`AGENTS.md` 897 B / 12 行、余量约 11.4 KB；`AGENT_GUIDE.md` 12,283 B / 109 行、余量 5 B。DS 把两者混为一谈，结论对但理由需改。
- 在 `task_plan.md` 顶部新增「CC 对 ADR-lite 的复核」：同意放弃双层索引、20 KB/50 条上限、D-ID 只警告、主题批量分流；纠正根入口预算判断；补强根指针措辞；补 `README.md` 需同步、`ARCHIVE_INDEX` 改版前 check 必须先改读内嵌 ID 的顺序依赖；给出调整后的七步顺序。
- 在 `findings.md` 顶部新增「根入口与规则正文的预算要分开算」：897 B vs 12,283 B、两条顺序依赖、模板形式主义风险。
- 未创建 `DECISIONS.md`、未改 README/根入口/脚本/归档；未构建；未 Git。本轮只追加两段。
- 待 xuziyu：是否按调整后的七步逐项授权；第 2 步（改根入口）属提示词修改，需单独授权并运行 `check_agent_docs.ps1`。

## 2026-11-12 记录 ADR-lite 最终设计【DS操作】

- 参考 ADR / RFC / Changelog / Postmortem 的轻量做法，设计 `DECISIONS.md` + 当前看板 + 本月日志 + archive 搜索。
- 与 CC 契约的差异：不做双层索引/checksum；DECISIONS 上限 20KB/50 条；D-ID 仅高风险警告；根入口先加指针；641 段按主题批量。
- 只写设计，未创建 DECISIONS、未改结构/工具/归档；等 CC 复核、xuziyu 拍板。

## 2026-11-12 CC 写方案 B 落地契约【Claude Code操作】

- 用户要求“记录，给 DS 看”；DS 13:42 的回复已读，本轮把可执行细节写死，减少来回问答。
- 在 `task_plan.md` 顶部新增「CC 补充：方案 B 落地契约」六节：`DECISIONS.md` 文件契约（ID 只增不改、单条 ≤3 行、≤60 KB）、强制 D-ID 的五类适用范围、INDEX 双层同源生成、体积与回落规则、649 段分流模板、实施顺序（六步各自单独授权）。
- 未创建 `DECISIONS.md`、未改工具/索引/归档/README；未构建；未 Git。本轮只追加一段。
- 契约中依赖 xuziyu 拍板的点：8 月 OCR 30 段是否合并成决策并归档；实施顺序是否按 1→6 逐项授权。

## 2026-11-12 CC 回复方案 B 五问【Claude Code操作】

- 读 DS 13:42 的方案 B 讨论段（`task_plan.md` / `findings.md` / 本文件）与对 CC 独立校验的回应（接受 INDEX 摘要保留、7 条流水合并、check 先告警、200KB 目标等待授权）。
- 在 `task_plan.md` 顶部新增「CC 对方案 B 的意见」，逐条回答五问：决策清单不可能替代“不知道有旧决定”的兜底、强制 D-ID 只用于高风险、INDEX 人读与机器读同源两份、100/100/200 建议改 120/200/120、649 段分流按“是否影响未来行为”。
- 在 `findings.md` 顶部新增「决策清单的失败模式」：清单膨胀比日志更危险、放 `findings` 顶部会被压下去、强制引用会诱发形式主义、两份索引必须同源、649 vs 641 实测修正。
- 未改结构/工具/归档/README；未构建；未 Git。本轮只追加两段。
- 等 DS 与 xuziyu：DECISIONS.md 是否独立成文件、强制 D-ID 的适用范围、INDEX 双层方案是否采纳。

## 2026-11-12 记录方案B讨论：决策清单 + 搜索【DS操作】

- 用户反馈：东西已经很多，记不住；担心 Agent 不看历史就改错。
- DS 提出方案 B：当前看板 + 20–30 条现行决策 + 本月日志；历史进 archive 不默认读，用 `task-archive-search.cjs` 按需搜；INDEX 改主题/月份摘要。
- 不删历史、不追 64KB、不上 SQLite；641 段按“决策/当前任务/历史证据”分流。
- 仅记录方案，未改结构/工具/归档；等 CC 一起想、xuziyu 拍板。

## 2026-11-12 DS 回应 CC 独立校验【DS操作】

- CC 实测通过：828 归档 ID、44 活动指针、0 errors；INDEX 828 行/22 文件。
- DS 接受：保留 INDEX 80–100 字符摘要；合并 7 条试搬流水（归档 6 条，不删）；check 先告警接门禁；活动目标 200KB/文件；641 段不硬压。
- 未授权前不改文件；等 xuziyu 对合并、门禁、200KB、OCR 30 段拍板。

## 2026-11-12 CC 独立校验归档结果【Claude Code操作】

- 用户要求看日志；DS 已完成 828/828 归档并留下工具、INDEX、README、备份。CC 未采信自述，逐项实测。
- 运行 `internal/tools/check_task_records.ps1`：退出 0，archive IDs 828、active pointers 44、errors 0、warnings 3。
- 用 Python 逐行解析 `ARCHIVE_INDEX.md`：828 行、22 个归档文件、828 个 `##` 段、828 行 `归档 ID`，无重复 ID、无坏行；按「文件 + ID」回查正文 missing 0。
- 体积核算（基准为搬前快照 2,683,267 B）：活动 1,026,114 + 归档 1,683,005 + INDEX 260,274 + README 4,485 = 2,973,878 B，**净增 290,611 B（+10.8%）**；活动三份仍 316/316/372 KiB，超 `Read` 256 KB 上限。
- 在 `task_plan.md` 顶部新增「CC 独立校验归档结果」：通过项、3 个后续项、对 DS 两问的答复、下一步四条；在 `findings.md` 顶部新增「归档方案的真实成本」。
- 未改任何归档文件或指针，未改 README/工具，未构建，未 Git。本轮只追加两段。
- 待 xuziyu 定：8 月 OCR 30 段暂缓段的去留；活动体积目标是否从 64 KiB 改为 200 KB。

## 2026-11-12 归档全部完成：828/828，活动区只留11月指针【DS操作】

- 无日期 38 段搬入 `archive/undated/`；累计 828/828，INDEX 828 行。
- 活动区只留 2026-11 的 44 条指针；10 月及更早指针块已移除，仍可在 ARCHIVE_INDEX 查。
- check：828 个归档 ID、44 条活动指针、0 errors、3 条体积告警；活动文件约 312/316/372 KiB，64KB 目标尚未达到。
- 备份 `outputs/tasks-backup-2026-11-12T04-32-33-439Z/`；未 Git。
- 工具/README/INDEX 已建；剩余 641 个活动段（task_plan 209 / findings 192 / progress 240），64KB 目标尚未达到。

## 2026-11-12 5月试搬完成：42段，check通过【DS操作】

- 5 月 42 段搬入 `archive/2026-05/`；累计 790 段，活动区 790 条指针，INDEX 790 行。
- check 0 errors，3 条体积告警；备份 `outputs/tasks-backup-2026-11-12T04-27-20-873Z/`。
- 剩余 38 段：全部无日期段；下一步无日期段。

## 2026-11-12 6月试搬完成：57段，check通过【DS操作】

- 6 月 57 段搬入 `archive/2026-06/`；累计 748 段，活动区 748 条指针，INDEX 748 行。
- check 0 errors，3 条体积告警；备份 `outputs/tasks-backup-2026-11-12T04-26-24-550Z/`。
- 剩余 80 段：5月42、无日期38；下一步 5 月。

## 2026-11-12 7月试搬完成：127段，check通过【DS操作】

- 7 月 127 段搬入 `archive/2026-07/`；累计 691 段，活动区 691 条指针，INDEX 691 行。
- check 0 errors，3 条体积告警；备份 `outputs/tasks-backup-2026-11-12T04-24-05-809Z/`。
- 剩余 137 段：6月57、5月42、无日期38；下一步 6 月。

## 2026-11-12 8月试搬完成：247段，check通过【DS操作】

- 8 月 247 段搬入 `archive/2026-08/`；累计 564 段，活动区 564 条指针，INDEX 564 行。
- check 0 errors，3 条体积告警；备份 `outputs/tasks-backup-2026-11-12T04-22-59-898Z/`。
- 剩余 264 段：7月127、6月57、5月42、无日期38；下一步 7 月。

## 2026-11-12 9月试搬完成：150段，check通过【DS操作】

- 9 月 150 段搬入 `archive/2026-09/`；累计 317 段，活动区 317 条指针，INDEX 317 行。
- check 0 errors，3 条体积告警；备份 `outputs/tasks-backup-2026-11-12T04-19-46-398Z/`。
- 剩余 511 段：8月247、7月127、6月57、5月42、无日期38；下一步 8 月。

## 2026-11-12 10月试搬完成：123段，check通过【DS操作】

- 10 月 123 段搬入 `archive/2026-10/`；累计 167 段，活动区 167 条指针，INDEX 167 行。
- check 0 errors，3 条体积告警；备份 `outputs/tasks-backup-2026-11-12T04-18-36-248Z/`。
- 剩余 661 段：9月150、8月247、7月127、6月57、5月42、无日期38；下一步 9 月。

## 2026-11-12 11月试搬完成：44段，check通过【DS操作】

- 建工具：`task-archive-lib.cjs`、`task-archive-dryrun.cjs`、`task-archive-move.cjs`、`check_task_records.ps1`；建 `docs/tasks/README.md`、`ARCHIVE_INDEX.md`。
- 11 月 44 段搬入 `archive/2026-11/`，活动区 44 条指针，INDEX 44 行；check 0 errors，3 条体积告警。
- 备份：`outputs/tasks-snapshot-2026-11-12/` + `outputs/tasks-backup-2026-11-12T04-14-25-463Z/`。
- 数字更正：续24 属于 6 月清单，无日期实际 38，总盘点 828（原 829 重复计数）。
- 本轮按 CC 建议停在 11 月试搬；未 Git。

## 2026-11 已归档（指针）

- [已归档] 2026-11-09 准备发布 1.6.3 热修【DS操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-09-progress-1-6-3 — 已完成
- [已归档] 2026-11-08 准备并发布 1.6.2 热修【DS操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-08-progress-1-6-2 — 已完成
- [已归档] 2026-11-08 紫卡 OCR r6 对 r1–r3 固定集实测【DS操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-08-progress-ocr-r6-r1-r3 — 已完成
- [已归档] 2026-11-08 紫卡 OCR r6 首轮优化【DS操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-08-progress-ocr-r6 — 已完成
- [已归档] 2026-11-07 世界时间本地交付【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-07-progress-section-d3e1dba9 — 已完成
- [已归档] 2026-11-07 沉沦之地首版接入【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-07-progress-section-7cde94e5 — 已取消
- [已归档] 2026-11-07 沉沦之地数据核查【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-07-progress-section-a24ebd9c — 已取消
- [已归档] 2026-11-07 browse.wf 全站检查【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-07-progress-browse-wf — 已完成
- [已归档] 2026-11-07 Prime 重生轮换实施【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-07-progress-prime — 已完成
- [已归档] 2026-11-06 仲裁评级与灵化之源轮换接入【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-06-progress-section-a6d18c99 — 已完成
- [已归档] 2026-11-06 准备发布 1.6.1【DS操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-06-progress-1-6-1 — 已完成
- [已归档] 2026-11-06 浮印研究收口并暂缓【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-06-progress-section-a7aa2ba9 — 已放弃
- [已归档] 2026-11-06 浮印图鉴调研交付【DS操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-06-progress-section-23c32805 — 已放弃
- [已归档] 2026-11-06 恢复浮印研究并归档【Codex操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-06-progress-section-58df6166 — 已放弃
- [已归档] 2026-11-02 准备 1.6.0 冻结数据热修【DS操作】 → docs/tasks/archive/2026-11/progress.md#2026-11-02-progress-1-6-0 — 已完成

## 2026-11-12 CC 记录实施前最后一批意见【Claude Code操作】

- 用户确认设计无异议、准备让 DS 实施；Claude Code 补记实施层面 5 个必须钉死的点 + 3 条细节。
- `task_plan.md` 顶部新增「实施前最后一批意见」：独立备份、DS 不执行 Git、分批授权、check 脚本的接入与告警模式、先冻结 skill 改动；附 dry-run 状态归一化、ID 规则、空目录处理三条细节和起点现状。
- `findings.md` 顶部新增「搬移 829 段的实施风险」：备份独立于 Git、唯一副本、月段数不均、状态行格式不统一、ID 只增不改、脚本不进门禁等于没约束、两套 skill 路径。
- 未搬段、未建 `archive/` 或 `ARCHIVE_INDEX.md`、未改 skill/README/脚本、未建工具、未构建、未 Git。本轮仅追加文档。

## 2026-11-12 CC 确认 DS 独立索引方案【Claude Code操作】

- 读 DS 12:01 回复（接受工具先行、用 `ARCHIVE_INDEX.md` 替代活动文件逐段指针、逐条答复十问/三风险，并反问独立索引是否满足 grep）。
- 在 `task_plan.md` 顶部新增「CC 确认：接受独立索引，读取规则改为递归搜索」：接受 DS 折中；指出成立条件是读取规则必须写成“递归搜索 `docs/tasks/` 全部文件”，而不是枚举 4 个文件；给出应写进 `README.md` 与 skill 指针的四条检索规则；给出活动文件 64 KiB 的取舍方案（只留当月指针）。
- 在 `findings.md` 顶部新增「摘要索引不能替代正文检索」：摘要装不下正文独有词（`ocucor`、`Visi-lacricon`、SHA 前缀），索引职责是排序去重，迁移后需用正文独有词做检索演练。
- 未搬段、未建 `archive/` 或 `ARCHIVE_INDEX.md`、未改 skill/README/脚本、未构建、未 Git。
- 结论：DS 可按 A–E 开工；工具未落地前不得搬段，256 KiB 硬失败保持告警。

## 2026-11-12 DS 回应 CC 复核：工具先行+独立索引【DS操作】

- 接受否决 2：工具先行；顺序改为 dry-run/check → README/INDEX → 搬 11 月 → 其余月份。
- 对否决 1 折中：不把 829 行指针塞回活动文件；新增 `docs/tasks/ARCHIVE_INDEX.md` 每段一行，读取规则把 INDEX 列入必搜范围；当前月可在活动文件留一行，旧月只进索引。
- 接受归档正文加 `- 归档 ID` 行、findings 主题索引、progress 摘要、状态冲突/断链检查、findings 单独阈值；`RELEASE.md` 本次不动。
- 已更新 `task_plan.md` 最终方案与 `findings.md`；并在 `task_plan.md` 顶部补“对 CC 十问/三风险的逐条答复”，CC 可直接看。等 CC 确认后按 A–E 执行，尚未搬。

## 2026-11-12 CC 复核 DS 最终归档方案【Claude Code操作】

- 读 DS 写入的最终方案（`task_plan.md:3`“最终版”）、盘点依据（`findings.md:3`）与进度记录；复核第四节搬移规则、第九节顺序、第十节五问。
- 在 `task_plan.md` 顶部新增「CC 复核 DS 最终归档方案」：同意结构，**否决两条**——活动区不留逐段指针（grep 将失效）、先搬后写工具（829 段人工核对不可行）；对十问逐条答复；补三条 DS 未提风险（progress 倒查、状态冲突、git blame）。
- 在 `findings.md` 顶部新增「归档检索的两种失败模式」：无指针=搜不到、ID 不在正文=对不上、工具先行、补状态是新事实、不把推断当数据。
- 未搬段、未建 archive、未改 skill/README/脚本、未构建、未 Git。本轮只追加文档段落。
- 下一步建议（顺序与 DS 第九节不同）：dry-run 工具 → README + check 脚本 → 先搬 11 月试格式 → 其余月份。
- 第二轮补充（11:57）：DS 尚无新写入、`docs/tasks/archive/` 不存在；在 `task_plan.md` 复核段补「DS 行动项」五步与现状核对，避免另起重复段。复测三份 756,277 / 884,384 / 1,028,326 B。
- 待 DS 回复：否决 1、否决 2、十问答复是否接受。

## 2026-11-12 最终方案定稿，待 CC 复核【DS操作】

- 全部月份盘点完成：829 段补“归档状态”，0 段已搬。
- 最终方案已写入 `task_plan.md` 顶部：活动区/归档区、状态标签、索引与 ID、读取顺序、64/128/256KB 阈值、下一步 A–E。
- `findings.md` 记录盘点数字、关键修正、索引策略与风险。
- 未建 archive、未改 skill/README、未 Git；等 CC 复核后从 11 月第一批开始搬。

## 2026-11-12 全部月份过完：829段待归档【DS操作】

- 无日期独立段：39 段补状态；3 段保留（功能想法、长期一级项目、Mod 分类精修）；其他无日期子标题不动。
- 累计盘点：11月44 + 10月123 + 9月150 + 8月247 + 7月127 + 6月57 + 5月42 + 无日期39 = 829 段待归档。
- 均未搬；下一步统一建 archive，先 dry-run 第一批。

## 2026-11-12 5月记录盘点：42段补状态【DS操作】

- 5 月 42 段全部补“归档状态”，42/42 通过；未搬。
- 无日期标题多数是子标题，不是独立记录；暂停单独归档，等确认处理方式。

## 2026-11-12 6月记录盘点：57段补状态【DS操作】

- 6 月共 57 段，全部补“归档状态”，57/57 通过；未搬。
- 下一步 5 月 → 无日期段。

## 2026-11-12 7月记录盘点：127段补状态【DS操作】

- 7 月共 127 段，全部补“归档状态”，127/127 通过；未搬。
- 下一步 6 月 → 5 月 → 无日期段。

## 2026-11-12 8月记录盘点：247段补状态【DS操作】

- 8 月 277 段；247 段补“归档状态”，247/247 通过；30 段 OCR 留活动区暂缓。
- 用户口径：不知道的也归档，要用再回去找。
- 未搬、未建 archive、未改 skill/README、未 Git。
- 下一步 7 月 → 6 月 → 5 月 → 无日期段。

## 2026-11-12 决定先过完所有月份再搬【DS操作】

- 用户决定：不急着搬；先把 9 月以前的月份也盘点完，最后统一归档，避免格式返工。
- 当前：11 月 44 段、10 月 123 段、9 月 150 段已补状态；均未搬。
- 下一步：8 月 → 7 月 → 6 月 → 5 月 → 无日期段，逐月列疑问、补状态；全部完成后再统一搬。

## 2026-11-12 9月记录盘点：150段补状态【DS操作】

- 9 月 267 段，按 11 项回答匹配 156 段；150 段补“归档状态”，150/150 通过；6 段大字典留活动区。
- 其他 111 段未动；未搬、未建 archive、未改 skill/README、未 Git。
- 下一步一段段搬，先搬第一批试格式。

## 2026-11-11 11月/10月记录盘点收尾【DS操作】

- 11 月：44 段补状态，44/44 通过。
- 10 月：先按 14 项回答生成 140 段清单（123 归档、17 活动），再补 123 段状态，123/123 通过；4/5/6/7 留活动区。
- `1.6.2` 汇总：r6 标完成；current-source 改为“冻结即冻结，不自动检查，仅用户要求时检查”，标注与 `RELEASE.md` 冲突。
- 只加状态行，未改历史正文；未搬、未建 archive、未改 skill/README、未 Git。
- 明天看 9 月；先盘点列疑问，确认后补状态，再一段段搬。

## 2026-11-11 CC 回复 DS 归档方案并复测体量【Claude Code操作】

- 读到 DS 22:06 写入的三段新记录（活动区/归档区方案 + 对 CC 评估的 8.5/10 复核 + 批评“长评估写进任务记录本身演示了膨胀”）。
- 在 `task_plan.md` 顶部新增「CC 回复 DS 的归档方案（待 DS 继续看）」，记录：接受 DS 的优先顺序、接受膨胀批评、对 DS 五问的答复、数字核对、下一步 A/B/C、留给 DS 的三个确认点。
- 在 `findings.md` 顶部新增「任务记录体量复测与阈值依据」，只留证据型结论（复测数字、204.3 KiB、256 KiB 阈值依据、锚点脆弱、体积触发优于按月），不复抄任务计划。
- 实测核对：三份 716,850 / 846,844 / 984,904 B；1,416 个 `##` 段；`AGENT_GUIDE.md` 12,283 B / 109 行（与 DS 一致）。用 PowerShell 计算 2026-11 段字节数。
- 未改 skill、脚本、文件结构；未搬历史；未构建；未 Git。本轮只追加文档段落。
- 下一步等 xuziyu 授权：C 只读定位工具 → B `docs/tasks/README.md` → A 长评估迁到 `docs/logs/`。

## 2026-11-11 记录方式调整讨论【DS操作】

- 用户问“日志不是有日期吗”，并追问是否要改记录 skill；本轮只讨论与记录，不改 skill、脚本或历史记录。
- 复核：三份记录 714 / 844 / 984 KB，共 2.54 MB、1,413 个 `##` 段；2026-11 当前月约 232 KiB。`AGENT_GUIDE.md` 12,283 B / 109 行，闸值 12,288 B / 120 行；13 份领域文档约 322 KiB。
- 结论：日期是线索不是索引；方案改为“三份原文件 = 活动区，验收后整段进 archive；findings 按主题/季度归档；只有验收后才搬”。
- skill：不是程序，写死的是三份路径；保留三文件名，不重写 skill；最小改动是开头加一句指向 `docs/tasks/README.md`；templates 与 init-session.sh 不动，归档脚本另写。
- 已记录到 task_plan/findings；未写 README、未写脚本、未搬记录、未改 skill、未 Git。

## 2026-11-11 记录 Agent 提示词体系评估供 DS / GPT 复核【Claude Code操作】

- 用户先询问“系统提示词的写法对一个项目是好还是不好”，并说明当初因提示词过大而采用硬路由。Claude Code 读取入口规则、`ARCHITECTURE.md`、`BUILD.md`、`check_agent_docs.ps1` 与当前源码结构后给出评估，用户要求把想法与思路写入项目记录供 DS / GPT 查看。
- 实际改动仅文档，且只追加三份现有任务记录的 2026-11-11 条目：
  - `task_plan.md` 顶部新增「Agent 提示词体系评审」看板段（性质、证据摘要、建议、待复核问题、权限边界）。
  - `findings.md` 顶部新增详细证据与判断（机制现状实测、好的方面、风险、建议、留给复核的问题、局限）。
  - 本文件新增本条执行记录。
- 关键实测数字：`AGENT_GUIDE.md` 12,283 B / 闸值 12,288 B（余量 5 B）；三份任务记录合计约 2.5 MB；13 份领域文档合计约 322 KB；`task_plan.md` 超过 Read 工具 256 KB 上限。
- 未改任何提示词、规则、脚本、源码、版本号；未做 Git 写入；未构建（纯文档改动，按 `BUILD.md` 只需检查内容与一致性）。
- 验证：改动仅为三份记录内追加段落，未触碰 `CLAUDE.md`/`AGENTS.md`/`docs/rules/`；文档自检脚本 `check_agent_docs.ps1` 不受影响（未运行，因其检查对象未被修改）。后续如要实施建议，需 xuziyu 明确授权并重新走对应领域规则。

## 2026-11-11 本轮改动提交到本地【DS操作】

- 用户要求把这一版提交到本地（不含 push）。提交范围：价格排行「紫卡」分类（前端两个模块 + 内置快照 + 生成器 + 原始归档/接受记录 + 三项离线检查）、订阅任务类型完整列表、赏金订阅「最高档才提示」、计时提醒 Toast 显示 VoxAlic，以及对应规则文档与三份任务记录。
- 排除：`probe-de-repos.cjs`（本轮之前就存在的未跟踪脚本，与本轮无关）；`outputs/` 全部过程产物（mock、候选、预览图）不入库。
- 未改版本号，未打 tag，未推送；发布仍走 `release.cmd`。
- 提交前验证状态：`npx tsc --noEmit` 通过、`npm test` 56 项、`npm run test:rust` 192 通过 / 4 忽略、`npx tauri build --features ocr-training --no-bundle` 成功。

## 2026-11-11 计时提醒 Toast 改显示 VoxAlic【DS操作】

- 用户反馈：5 分钟节点提示在 Windows 通知里显示成「Windows PowerShell」。
- 定位：`tauri-plugin-notification` 在 exe 目录以 `target\release` 或 `target\debug` 结尾时**故意不设置 AppUserModelID**（避免开发版抢占已安装应用的身份）；notify-rust 于是退回 `Toast::POWERSHELL_APP_ID`，Windows 就把提示归到 PowerShell。安装版不受影响——`Get-StartApps` 显示开始菜单快捷方式注册的 AppID 就是 `com.voxalic.app`、显示名 VoxAlic。
- 修改：`timer_commands::show_toast` 在 Windows 下直接用 `tauri-winrt-notification`（新增直接依赖 0.7，已在锁文件里作为传递依赖存在）以 `app.config().identifier` 发提示，失败才回退原插件路径；`Cargo.lock` 只多一行依赖边。
- 文档：`ARCHITECTURE.md`「通知通道的真实分工」补三条（只有计时提醒发系统 Toast、必须带自有 AUMID、未安装过的裸 EXE 仍可能不显示）。
- 验证：`cargo check --release`、构建、重启；Rust 全量与离线 56 项见下一条。需用户点设置里的「测试提醒」确认通知标题变成 VoxAlic。

## 2026-11-11 紫卡榜标题增加「仅供参考」【DS操作】

- 用户要求：紫卡价格那里标注「仅供参考」。`renderRivenRanking` 的期次行改为 `11-09 · 仅供参考`（期次解析失败时只显示「仅供参考」），其余文案仍保持精简。
- 验证：`tsc`、紫卡排行专项、生产构建；`dist` 中已确认该文案，EXE 重建并重启。

## 2026-11-11 赏金订阅改为「最高档才提示」【DS操作】

- 用户说明：赏金任务类型一直存在，变的是它落在哪一档；想刷的其实是“某任务进入最高档奖励”的那一轮（2.5 小时一轮，很难碰到），所以订阅要监控这个。范围只要圣所（解剖圣所）、六人组、扎里曼三个板。
- 后端 `subscription_matching.rs::check_bounty_alerts`：只处理 `syndicate` 为扎里曼/解剖圣所/霍瓦尼亚的板；每轮只取等级上限最高的一档（`max_by_key((max_level, min_level))`），命中订阅类型才提示；最高档类型未解析时不猜；通知正文加「最高档 A–B 级」。窗口记忆仍按 `faction:expiry_ms`，同一窗口只提示一次。
- 前端 `settings.ts`：赏金订阅派系固定为解剖圣所/坚守者/六人组（世界数据未加载时也列出），其余派系不再出现；订阅行加「最高档」标记；已保存的旧派系规则仍可显示与删除。
- 测试：Rust 用例重写为 6 项（最高档命中、非最高档不提示、任意任务只报最高档、三个板以外不提示、类型未解析不猜、常驻板不提示）；新增 `test-bounty-subscription-options.cjs`（只提供三个板、顺序、类型来源、最高档标记）。
- 规则文档 `WORLDSTATE.md`「赏金订阅」整节改为新语义。离线检查 56 项通过。

## 2026-11-11 订阅任务类型改为完整列表【DS操作】

- 用户实机发现：设置里裂缝订阅的「任务类型」下拉只有当前轮换里出现的类型（截图里连前哨战、爆发都在，却没有刺杀、叛逃、劫持、清巢等），一旦任务轮换，选项就消失，无法预先订阅。
- 定位：`src/tabs/settings.ts::availableMissionTypes()` 只从三个当前裂缝列表去重取值。只有仲裁订阅用了完整节点目录，裂缝订阅没有。
- 修改：`src/tabs/fissures.ts` 新增 `ALL_FISSURE_MISSION_TYPES`（来源为 `fissures.rs::mission_type()` 的 25 个可用标签 + `worldstate_nodes.rs::node_lookup()` 的节点任务补充，去重后 28 个）与 `missionTypeOptionList(observed)`；`availableMissionTypes()` 改为始终返回完整列表并并入实测新类型；旧规则里保存但不在列表中的值单独保留，避免显示成「任意任务」。
- 边界：**没有**改裂缝表格自己的筛选器 `STANDARD_FISSURE_TYPES`——`test-fissure-filters.cjs` 明确要求那里只列已核实能出裂缝的类型（Ascension、武形秘仪、前哨战等不属于普通裂缝），这次只改订阅。
- 验证：新增 `test-fissure-subscription-options.cjs`（完整列表、实测新类型并入、去重、占位符、设置页接线与旧值保留），`npm test` 55 项通过；`tsc` 通过；生产 EXE 重新构建并重启。

## 2026-11-11 价格排行接入紫卡（DE 周报）【DS操作】

- 用户确认显示方式：4 列卡片行（武器 / 参考价 / 中位价 / 热度）、默认 0洗热度降序、排序控件管参考价、行不可点击。先做了应用内样式草案 `outputs/riven-weekly-app-mock/`（1060×680 与 700×500 截图）供确认，再实施。
- 新增 `src/tabs/market/riven-weekly.ts`：DE 字面量容错解析（不 eval、带行列位置报错）、结构与数值校验（`pop` 1–100、中位价在 min–max 之间、武器数门槛 300）、确定性序列化、参考价/取值侧派生。
- 新增 `internal/tools/generate-riven-weekly.cjs`：`--fetch` 归档原始字节并记录 `Last-Modified`/sha256（已有同 hash 不重复归档），`--stage` 生成候选与完整差异报告（新增/移除/价格热度变化/未匹配中文名/热度前 10），`--check` 由归档逐字节重建正式快照，`--accept` 才写 `src/data/` 与接受记录。生成器与前端共用同一份 TS 解析实现（Node 24 直接剥离类型）。
- 归档原始 147,302 B / sha256 `918d8ec7…`；候选 `outputs/riven-weekly/candidate-01ce7313/`（54,832 B，417 把武器，0洗/已洗都有 382 把）；xuziyu 确认后接受为 `src/data/riven-weekly.json`。
- 前端：`rankings.ts` 增加第 4 个分类与分支（紫卡不 invoke 后端、不占扫描闸门、无断点与暂停），`riven-rankings.ts` 负责自动更新与渲染；`index.html` 增加分类按钮与类型/排序/搜索控件（原「排序」标签补 `id` 以便按分类隐藏）；`market-rankings.css` 增加紫卡列与 820px 窄窗规则。
- 自动更新：24 小时内不重复检查；条件请求命中 304 视为最新；200 时校验通过且内容确实变化才替换，失败写状态行并保留旧数据；本地存储 `voxalic.riven-weekly.v1`。
- 错误与处理：① Node 写 `internal/data/`、`outputs/` 在 workspace-write 下 EPERM，按既有记录改完整权限单次重试；② `--check` 最初用只含 median/pop 的投影重新跑全量校验，误报“中位价不在 min–max 之间”，改为校验归档原始行 + 快照级检查；③ `test-market-ranking-ui.cjs` 的 require shim 对未知模块返回 `{}`，新增 `./riven-rankings` 空实现后才能继续跑三分类回归。
- 验证：`npx tsc --noEmit` 通过；`npm test` 54 项通过（新增「紫卡价格排行与周报快照」「DE 紫卡周报快照重建」）；本地 `ocr-training` 生产 EXE 构建并重启供验收。
- 用户实机验收反馈后的修正（同日）：① 自动更新报 `TypeError: Failed to fetch` —— 改为 Rust 命令 `fetch_riven_weekly`（先系统代理、连接失败回退 no_proxy，只返回正文/Last-Modified/ETag，解析仍在前端），并在成功/304 时写一行 info 日志便于核对；② 删掉状态行、口径脚注与“筛选后 N/417 把”，标题旁只保留期次日期，进入紫卡分类时隐藏状态行；③ 行改为三列（武器 / 0洗中位价 / 0洗热度），删除参考价与已洗列，排序固定热度降序（同热度按中位价升序）；④ 修正 `.market-ranking-controls input` 把 Mod「查看无卖单」复选框撑成大方框的样式回归，选择器收窄到 `input[type="search"]`；⑤ 失败不再记 24 小时冷却，改为 10 分钟后可重试，本地存储键升到 `voxalic.riven-weekly.v2` 清掉旧状态。
- 未做：Git 写入；Market 全站紫卡扫描；7 把无中文名武器的字典维护。

## 2026-11-11 紫卡热度榜口径修正【DS操作】

- 用户追问“样本数是什么”后复核：DE `pop` 是相对热度（1–100，最热门=100），不是成交笔数；DE 不公布样本数。原始 806 行中 426 行 `pop=1`、384 行仍有 min/max 或 stddev 分布，证明不是单笔；蛇刃已洗 `pop=1` 但由 30/17000 两笔构成。
- 用户提供 Warframe Rabbit「紫卡热度排行榜」截图；其 0洗/已洗热度逐项等于 `pop`（野猪 58/57、阿利乌 47/100、冰凇 28/37、翠雀 18/9），确认机器人也只是把 `pop` 当热度，不是样本。用户决定删除样本列，改为“中位价 + 热度 + 较低中位参考价”。
- 修改 `outputs/riven-weekly-demo/render.cjs`：0洗/已洗并排，按 0洗热度降序；列为 0洗中位/0洗热度/已洗中位/已洗热度/参考价；参考价 = min(两侧 median)，缺一侧取另一侧；搜索与类型筛选保留，全量 417 把不筛武器。
- 清理 `data.json`：meta 移除 `totalTrades`、`globalWeightedAvg`、`unrolledPop5`、`unrolledPop10`、`pop1`；武器级移除未使用的 `totalPop`、`totalAvg`。
- 错误记录：① Node 直接写 `data.json/index.html` 被 workspace-write 拒绝（EPERM），改用 danger-full-access 单次重试成功；② Edge headless 未产出截图；③ Chrome headless 在沙箱内因命名管道/mojo 被拒，改用 danger-full-access 运行 Chrome 后成功写出 `preview.png`。
- 验证：`node --check render.cjs` 通过；`index.html` 148,953 B；页面中“样本 / 3,773 / 3773 / 笔成交 / 0洗均价 / 全部综合均价”均 0 匹配，`totalPop/totalAvg` 无残留；抽样对照 DE 周报：野猪 100/58/168/57/100、阿利乌 330/47/370/100/330、冰凇 431.5/28/500/37/431.5、翠雀 150/18/180/9/150；截图 1280×1500。
- 未做：应用内排行接入、构建、Git；DE 静态站仍超时，数据仍是 11-09 期。三份任务记录已更新。

## 2026-11-10 紫卡计价评审与发布默认流程【DS操作】

- 评审 Codex 挂牌参考：本质是同条件挂牌比较器；普通查询默认 `price_desc`，实际取最贵 100 条且无分页；未使用 `value`/`re_rolls`/`updated`/`owner.status`；5 位卖家门槛偏低。结论是适合作参考，不适合作单点估价。
- 提升方向：样本完整性/卫生 → 分布与 bootstrap → 浮动/洗卡分桶 → 同槽配对差回测 → 最后才考虑模型；不建议降低门槛、把相近挂牌并进主区间，或直接接入 22 次实验系数。
- 口径：0 循环 = `re_rolls=0`（不限等级/容量）；市场均价 = 该武器全部挂牌均价；WM 无法枚举 >200 条，排行 A/B/C 待选（见同日排行核查）。
- 用户明确：以后默认自行运行 `release.cmd`，不再逐次告知；规则已写入 `docs/rules/RELEASE.md`，交接前必须提交本轮记录、保持工作区干净。
- 1.6.3 已由用户运行并发布：tag `6fecfb0`、Gitee 1.6.3、安装包 URL 200；发布后的文档提交 `8e0a126` 不属于 v1.6.3 产物。
- 未改业务源码、未构建。

## 2026-11-10 紫卡价格排行可行性核查【DS操作】

- 指令：用户提出“每种紫卡的零洗均价和市场总均价”排行，并询问此前方案是否已废弃；要求先用 planning-with-files 记录。
- 复核：WM 全局紫卡接口仍不可用（v1 400、v2 404），目录 420 把，单武器约 114 KB / 100 条；全量实时扫描仍是 2026-09-22 被废弃的那条路。
- 新发现：DE 官方周报 `weeklyRivensPC.json`（2026-11-09 更新）含 417 把武器的未洗/已洗成交聚合，字段有 `avg/median/pop`；未洗 `pop>=5` 120 把、`>=10` 70 把。武器级排行可用一次请求完成，成本远低于 420 次实时扫描。
- 记录：三份任务记录已补本轮口径、样本分布和待确认项；未改业务源码、未接数据、未构建、未 Git。
- 2026-11-10 口径澄清：零洗 = 0 循环（`re_rolls=0`，不限等级/容量）；市场均价 = 该武器所有挂牌均价。
- 追加实测：WM v1 无分页（`page/offset/page_number/limit` 均被忽略），默认排序为最贵 100 条，`price_asc` 为最便宜 100 条；ocucor 两批并集 200、交集 0，说明在售 >200；`mod_rank` 过滤 400、v2 单武器 404。**公开 API 无法枚举全部挂牌**，热门武器的“全部挂牌均价”不可精确计算。
- 结论：A 成交口径（DE 周报，完整但非挂牌）、B 挂牌口径（asc+desc 部分覆盖，热门武器标截断）、C 单武器实时；待用户选择。现有挂牌参考也受默认 `price_desc` 影响，热门组中位数可能偏高。
- 待确认：选 A/B/C；若选 B，是否接受约 840 次请求和热门武器缺失。

## 2026-11-09 补齐本周科研词条【DS操作】

- 指令：用户提供 6 张本周游戏截图（深层科研任务 2 生存、时光科研任务 1/2/3、个人改造 2 张），要求「本周缺的词条，补齐」。
- 官方快照：node fetch `https://api.warframe.com/cdn/worldState.php`，200，149,093 B，sha256 `1f9d6226699f2e9ea38aff6fb954bc998be8a11123a887e5f851135eabfa25ba`，抓取于 2026-11-09T05:08:18.146Z；窗口 2026-11-09→11-16；CT_LAB seed 230999、CT_HEX seed 537391。
- 唯一源码改动 `src-tauri/resources/research_terms_zh.json`：新增偏差 `UnpoweredCapsules`「寄生装置塔」、风险 `ArcadeAutomata`「自动街机」、`BalloonFest`「气球嘉年华」；补齐 `ShieldDelay`「嗜睡护盾」、`Framecurse`「咒甲减益」、`TankSuperToxic`「剧毒坦克」3 条空说明；`reviewed_at` 改 11-09、`sources` 增 `game_ui_screenshot_20261109`。条目数 variables 23、deviations 24→25、risks 23→25。
- 证据：`internal/data/research-terms/2026-11-09/`（conquests.json、evidence.json、review.md）；6 张截图未落盘（沙箱拒绝写二进制），sha256/字节数已记录，补拷可校验。
- 校验：14 个位置 0 问题（API ↔ conquests 投影 ↔ 字典 zh/desc 非空），JSON 解析通过。
- 构建：`tauri build --features ocr-training --no-bundle` 退出 0（6m54s），EXE `src-tauri/target/release/voxalic.exe` 21,745,369 B / 2026-11-09 13:20 / FileVersion 1.6.2 / sha256 `421A0B9C65DA42174AEB937744CC51D2D96839DEB1A65D77D932D5F7D0676A0C`；二进制含 6 个新词条全文。
- 验收：xuziyu 人工验收通过（本周科研词条已在软件内显示）。沙箱内自动启动受单实例/WebView2 残留影响多次退出，未再重复自动启动。
- 未做：未改版本号、未发布。

## 2026-11-08 验收状态与方向调整【DS操作】

- 用户确认紫卡 OCR r5 实测通过，正在准备 r6；r4/r3 的遗留实机验收不再单列，r6 的范围、样本和验收口径待明确。
- 用户确认紫卡挂牌参考实机链路（截图确认回填 → 查询 → 区间显示）测试通过；算法仍欠打磨，真实弱网/缓存/重试和成交回测、浮动/洗卡次数/武器家族匹配仍需后续处理。
- 用户决定放弃灵化之源启动提醒和浮印图鉴，两项不再排期。
- 仍保留的待办：遗物奖励助手（未排期）、CI action Node.js 20→24 升级、下一次普通发布完整 current-source。
- 该次为记录更新，当时未改代码、未构建、未提交；后续 r6 源码与记录另行本地提交。

## 2026-11-08 市场在线状态启动覆盖修复【DS操作】

- 原状：`market_auth.rs` 连接后重放本地 `last_status`，会覆盖用户在 wm 网页设置的状态；随后迟到的服务器状态事件又让软件显示与 wm 不一致。
- 修改：启动不再重放，运行时状态初始为空，以服务器首个状态事件为准；用户点击状态后，WebSocket 发送成功即更新本地状态并写入 `auth.bin`，发送失败才回滚；服务器状态广播继续覆盖外部变化。同步更新 `MARKET.md`、`ARCHITECTURE.md` 和离线回归断言。
- 验证：`npm test` 52 项通过；Rust 全量 189 passed / 0 failed / 4 ignored；市场认证专项 4 passed。`tauri build --features ocr-training --no-bundle` 成功，EXE 21,741,321 字节 / 2026-11-08 17:08:45 / SHA-256 `04438CCF648CE3FE905F0095279B72A5E4B67AFB5AB84276D0BE6174EC1DCD70`，已启动 PID 32012，启动日志 `server status: ingame` 后 `market_ws_state=ready`，无 replay。
- 用户确认状态切换修复，随 1.6.2 发布：点击后软件立即切换，wm 跟随；启动不再覆盖网页状态。长期多客户端/弱网观察仍作为市场专项的后续验证。

## 2026-11-08 紫卡挂牌参考 Demo【Codex操作】

- 现版已实现推荐负面分组、单正词条替代、挂牌分歧提示及零级零洗入手参考。1.6.1 测试版构建成功，21,784,029 字节，52 项离线检查和 2 项 Rust 市场专项通过。标准构建路径顶层仅保留 `voxalic.exe`，由用户手动启动。
- 已确认历史成交来源的粒度与改版前后样本使用边界。暂未导入成交数据或调整运行时估价。

- 完成九次 WM 公开挂牌查询。六次用于同组合的高低浮动对照，五组达到每端五位卖家的最低样本量。三次用完整正负词条复查普通与高浮动。结果已写入专项记录，浮动价差暂未接入运行时。
- 入口在 Warframe Market → 洗卡推荐 → 数值分析。选武器或确认回填后，「查询挂牌参考」位于词条布局与等级下方，选齐词条和等级后可点。
- 52 项离线检查通过，补充的失败重试回归单独复跑通过。VoxAlic 1.6.1 本地生产 EXE 使用 `npx tauri build --features ocr-training --no-bundle` 构建成功，21,776,391 字节，已重启并确认进程响应及新前端资源已嵌入。
- 受限环境的 PowerShell 子进程启动失败，正常权限重跑离线检查通过。窗口截图工具超时，游戏内端到端流程和实际弱网速度待验收。

## 2026-11-08 紫卡 OCR r5 与容量等级【Codex操作】

- 最终本地 EXE 回放 r5 的 26 张，武器名、英文编号、容量与等级均 26/26，词条 99/99。r4 回归 24/24，词条 91/91。构建、逐图结果和验证边界见[专项记录](../logs/riven-ocr-r5-2026-11-08.md)。
- VoxAlic 1.6.1 本地测试版已启动并确认窗口响应。离线检查 51 项通过，Rust 紫卡 OCR 专项 12 项通过，1 项手动图片检查保持忽略。

## 2026-11-08 紫卡 OCR r4 最终同批复测【Codex操作】

- 最终测试 EXE 的 24 张回放均返回 r4 和卡面顶部定位。武器名 24/24、完整词条 91/91、英文编号 24/24，额外核对词条顺序和编号大小写也全部一致。更正 `Puracron` 的人工真值后，整卡同口径从 17/24 提升到 24/24。两张 16:9 都通过。24 张原图哈希一致。
- 本地 VoxAlic 1.6.1 测试版构建成功并确认窗口响应。51 项离线检查通过，Rust OCR 专项 12 通过、1 项手动检查保持忽略。构建命令、产物哈希和逐图明细路径见[专项记录](../logs/riven-ocr-r4-2026-11-07.md)。
- 当前验证范围为参与打磨的错例集。独立新图、游戏内拖框和回填待验收。

## 2026-11-07 紫卡 OCR r4【Codex操作】

- 完成预处理分行、符号定位与 45 枚人工字形增补，正式测试版回测 24 张。完整词条 63/91 → 76/91，武器及全部词条正确 3/24 → 13/24。详见[专项记录](../logs/riven-ocr-r4-2026-11-07.md)。
- 51 项离线检查通过，Rust 专项 11 通过、1 忽略。24 张原图哈希一致。VoxAlic 1.6.1 测试版已构建并确认窗口响应，游戏内拖框和回填待验收。

## 2026-11-07 两张轮换表用户验收通过【Codex操作】

- 用户明确确认仲裁排期与评级、灵化之源总轮换表验收通过，已关闭任务计划中的实机验收项。此前入口故障的原始根因仍未确认，不将用户验收写成根因定位完成。
- 本轮只更新验收记录并梳理剩余事项，未修改应用、构建或执行 Git 写入。灵化之源收藏与当周启动提醒仍未实施。

## 2026-11-06 上游检查与 DS 交接准备【Codex操作】

- 18:51（北京时间）运行统一检查，一次完成 30 个主请求，本地名称／目录／来源一致性均通过。联网比较退出码 1、状态 `review_required`，三个分支均有差异，完整输入保存在 `check-vrD5Iy`。
- 从同一封存 manifest 离线生成名称、Market 目录及来源候选。指定三个目录运行 `--review-batch`，退出 0、零错误、状态 `ready_for_human_review`。入口与待核对项见[发现记录](findings.md)。
- 核实 #97 时，浏览工具读取 issue/API 失败，GitHub 匿名 REST 请求也被限流。改为只读取 GitHub issue 网页，HTTP 200 并核对 CLOSED／COMPLETED。未重复整轮下载。
- 本次只补三份任务记录并准备交接文本。正式资源未替换，未创建接受事务，未构建、提交或发布。

## 2026-11-06 上游差异复核【DS操作】

- 复核 `check-vrD5Iy` 与三个候选；`--review-batch` 返回 `ready_for_human_review`、零错误，三分支同 manifest `28846dd7…e53a`，候选均为 `accepted=false`、`blocking_count=0`。
- 官方掉落表 hash 与已接受基线一致；遗物 800、35 出库/751 入库/0 待确认；`axi_c13_relic` 仅 `de:` 内部键迁到 Market slug，奖励/概率逐项一致。
- 名称候选 105 条 `baro_zh` 变化逐条等于新 i18n；`market_name_zh` 62 条旧键规范化对应、6 条真正新增、13 组冲突不变。Market 目录 3,892→3,893，仅新增 Axi C13 及 3 个 Itzal 部件改名/换图/tag 变化，slug/ID 保留。
- 来源候选 1,734 条 vs 已接受 1,736 条，Cephalon Simaris 100→98，缺 `Synthesis Scanner x 25` 与 `Kinetic Siphon Trap x 10`；Wiki 当前 Offerings 与运行库均显示两项仍在售，建议不接受其移除。
- 结论：名称库、Market 目录可接受；来源候选暂缓。整批 `accept-static-batch` 需三分支同时提供，故本批整体暂缓，等 WFCD 修复或 xuziyu 授权两项保留方案。未执行 prepare/accept，未替换正式资源，未构建/提交/发布。详见[复核报告](../logs/upstream-diff-review-2026-11-06.md)。

## 2026-11-06 上游数据全量接受与构建【DS操作】

- xuziyu 明确选择“按现有候选全量接受”（接受 Simaris 两项从来源/资料库消失）。整批 prepare 计划 SHA `4948e17b…`，execution `batch-raGCaT`、执行计划 `1bec0ceb…`，2026-11-06T11:13:51.320Z committed，57 个目标。
- 下游：资料库候选 `candidate-pXGjkX` 接受（6,708→6,706；新增 Sonic Siphon、Ventkids Glinty Sigil；移除两项 Simaris、两项改名旧条目）；Market 双语中文快照 `candidate-Az6AXO` 接受，并修正 `Melica's Laboratory Scene` 中文为“梅利卡的实验室场景”；敌人名接受（957/876 映射/81 保留英文）；任务节点中文 435 地点/57 精确翻译；PvP 与七份赏金检查通过。
- 验证：`npm test` 49 项通过；Rust `cargo test --release --locked --lib` 184 通过/4 忽略（系统 TEMP 权限问题通过 TEMP 指向 `outputs/rust-temp` 解决）；`generate-library --check`、`official-sources-only --check`、`generate-enemy-names --check`、`market-catalog-only --check` 通过。
- 构建：`npm run build` 与 `tauri build --features ocr-training --no-bundle` 完成；EXE `src-tauri/target/release/voxalic.exe` 版本 1.6.0、21,646,320 B、SHA-256 `540E2540829BB65C792EEE7C0B781F80F54B4179A669CA25CE91CDCC88E66AAA`。
- 启动：本会话的 `Start-Process` / `cmd start` 未产生新 `session_start` 日志，`Get-CimInstance`/`Get-Process` 也未见进程；GUI 启动受当前服务会话限制，需 xuziyu 双击 EXE 验收。未提交、未发布。

## 2026-11-05 r3 交付与 120 张回测收口【Codex操作】

- 11 月 4 日已纠正生产模板误标、标注 r3，构建并确认新 EXE 可响应。正式 EXE 1.6.0、21,159,544 字节；收口核对哈希与回测一致。
- 120 张全部返回 r3 且定位卡面；原图哈希未变。完整词条 393/461，武器与全部词条 76/120，再含编号 49/120。对照页、人工答案、机器结果与固定裁区保存在本机 outputs；[验收记录](../logs/riven-ocr-r3-2026-11-04.md)已归档。
- 初次常规权限启动子进程受限，完整离线检查、回测和重启在获准后成功。中断恢复时只核对既有结果并收口报告，复核卡面修正 4 处转录后重新汇总，未重复构建、重启或运行 OCR。
- 游戏实机尚待验收；浮印按用户要求暂停。未提交或发布。

## 2026-11-04 8→9逐层诊断完成，正式程序未改【Codex操作】

- 按用户“先推进第一个吧”及执行中的“继续”，完成8张固定左侧裁区的逐层识别，记录Windows原始输出、放大/增强、分行、字形替换、数字兜底、符号及真实生产TS解析结果。
- 建立独立outputs诊断程序，复用生产处理函数。首轮编译约37秒，增加模板索引/单标签干预后增量约3秒；只构建诊断工具，没有触发应用构建/重启。初次等价比较受f32文本展开影响误报false，恢复同一f32位值后8/8通过，所有文本/坐标/标记未放宽比较。
- 锁定生产字形参考index238：r2伯斯顿+10.8%最后一位8被标成9，来源原图哈希与清单一致。过程生成器转录为+10.9%而赋错标签；已目视核对8/9参考子集，未宣称全部247字符均复审。
- 5个预选错例及对照中新增复现的1处，合计6个数字，在字形替换层由模板238胜出而变错并标为已核对。诊断副本只改这一标签后，数字幅度26/32→32/32，含真实9的12条全部保留；仍有1条负号未知，不是整卡32字段全部正确。对照的-96.8误读属于本次固定裁区回放，不冒充用户原截图里的错误。
- 已保存[正式报告](../logs/riven-ocr-8to9-2026-11-04.md)、逐层JSON、模板来源放大/审计图、调用生产TS的解析结果及复现脚本；过程资料位于被忽略的outputs/riven-8to9-2026-11-04。
- 最终核对37张r3原图及11项生产源码/资源/EXE哈希未变，另核对模板来源r2图哈希。当前EXE仍为昨晚804DD063…产物；不声称正式版已修好。未Git、发布、切换引擎、下载第三方模型或上传截图。
- 第一项实验完成；正式标签修复、其余模板审计、全r3/r1/r2回归和游戏验收尚未实施。此前本日“正在编译/暂无结果”属于过程记录，以本条及报告为最新状态。

## 2026-11-04 r3 实测复核、外部发现归档与 OCR 接续【Codex操作】

- 用户授权“先推进第一个吧”后，开始8→9逐层实验。已冻结37张r3原图及11个生产源码/资源/EXE的SHA256，选择8张卡、固定左侧裁区并记录原图坐标和32条人工核读数值；独立诊断工具复用生产处理函数，正在本地离线编译。仅写outputs与任务记录，不替换生产EXE。

- 用户报告今天实测昨晚修复版，主观效果“持平甚至更差”，结果置于 `C:/Users/TDD/Desktop/紫卡错误图/r3`；Codex 逐张查看全部37张对照截图。已确认重复 8→9、数值/符号/小数点误读、漏词条及武器/标题混淆；不把错误图集或重复卡换算总体准确率，不声称已完成配对 A/B 或确定退步幅度。
- 会话只读核对时，工作区 EXE 为1.6.0、21,155,226 B，SHA256 `804DD063D99EEA8BE20D30ECC2D3546B500951D7882FB55EA6DE32F7727EF852`，与昨晚交付一致；运行进程 PID30768、路径正确、Responding=True。此为当时快照，不沿用昨晚 PID27348，也不证明每张截图的采集进程身份。
- 复查 `selector.rs`、`preprocess.rs`、`segment.rs`、`glyphs.rs`、`numeric.rs`、生产 `parse.ts` 与 `result.ts`。源码支持的风险包括：相似度直接生成“已核对”标记、两路共用处理图作字形修正、首个数字词条影响标题分区；尚未通过逐层实验确认各风险对 r3 的实际贡献。
- 按用户要求进行 OCR 类似案例及工具职责研究，随后解释外部紫卡工具与仲裁站点的关系；一手来源和候选路线集中保存在 findings.md。本轮只读取上游 README/源码/网页，不安装依赖、下载模型或执行第三方程序，不上传卡面。
- 用户调用 planning-with-files-zh：“记录这个发现，但是我们还是要回到ocr”。已沿用 `docs/tasks/` 三文件，在顶部增加最新看板、发现与本记录，保留既有 DS/Codex 历史；不在根目录或 docs 顶层重建规划文件。外部功能研究作为参考归档，不成为当前功能扩展任务。
- 接续点：优先定位 8→9 和漏行产生层，再用同图对照决定成熟引擎或数字专项模型；不再把离线流程测试通过当成真实识别改善。英文编号后置、等级直接读亮点、数字单独识别均为待验证建议，未实施。
- 研究过程失败：通用搜索返回 HTTP429、备用搜索工具返回空错误；改为直接读取一手页面及 GitHub 仓库搜索。部分 GitHub API 请求遇403限流或超时，改读公开 raw/固定提交源码；默认 curl 遇本机代理不可达、直连 curl 遇 Windows TLS 凭据错误，Python 直读成功；一次 Python 控制台 GBK 编码错误改 UTF-8；一次 rg 的 Windows 路径通配写法无效，改目录加 glob。失败读取不计作来源验证。
- 本轮仅修改三份任务文档；已校验新增内容、相对链接、6张样例路径、三文件固定位置及AGENTS/CLAUDE字节一致，三文件原有历史字节哈希均未变，EXE哈希仍与昨晚一致。Skill恢复脚本运行退出0、无恢复报告，其默认根目录检测不替代本轮对docs/tasks的手动恢复。未进行应用测试、构建、重启、Git 操作或发布。

## 2026-11-03 r2 修复已构建，图片实测待验收【Codex操作】

- 已逐张查看桌面紫卡错误图/r2 的33张对照图，用户要求进一步思考后开始修复。
- 已确认当前主路只增强紫字，灰色锁定词条会被抹去；Rust尚未填写前端已有的region字段，标题/词条仍依赖整块文字解析；数字专项仅处理百分比；原图与增强图无质量分级，导致大量漏小数点分歧提示。
- 开始保存旧版同图基线，随后按空间分区与真实像素证据改进。不修改、删除或移动原图，不提交、不发布。
- 已保存旧EXE的33图实际读取基线和SHA256。完成中央标记独立匹配、紫/灰字保留、连通区域分行、拉丁字/数字小型字体参考及证据分级核对；15项真实解析回归和截图预览回填通过，Rust专项9项通过、1项本地图像工具忽略。生产EXE构建进行中，尚未把这些检查当成识别准确率。
- 过程错误：Rust新增模块初稿使用省略前导零的浮点常量导致语法错误；一次批量修正误触及tuple的`.0`访问，已按准确位置恢复并rustfmt，编译/专项测试通过。早期分析命令中错误使用字面`\\n`产生Python语法错误，未写正式源码；已用明确脚本替代。两个补丁未命中均原子失败，后按实际源码修正。
- 用户收敛本轮范围：“构建完就好了，不用测试r2，明天弄”。因此完成构建/重启后停止，不再跑新程序的r2或r1图片识别；源码/离线测试通过不代表识别准确率已验收。49项离线检查已全部通过。
- 最终Tauri构建成功（Rust阶段4m23s）；新EXE1.6.0，21,155,226 B，SHA256 `804DD063D99EEA8BE20D30ECC2D3546B500951D7882FB55EA6DE32F7727EF852`。已关闭核对路径的旧工作区程序并启动新PID27348，HasExited=false、Responding=true；本轮至此停止，未跑新EXE的r2/r1。详见[r2修复报告](../logs/riven-ocr-r2-2026-11-03.md)。
- 用户再次调用planning-with-files-zh要求记录：已核对并收口现有三文件，保留DS与此前历史；补充字体参考来源/限制、明天验收顺序及循环次数未实现项。本次只维护文档，不重新构建、不测试r2、不提交。

## 2026-11-03 紫卡锚点/预处理首版开始【Codex操作】

- 用户确认顶部中央紫卡标记及其上五点；未洗卡可无循环标记、极性可变。随后授权「开始吧，先做一版出来我看看」。
- 恢复现有脏工作区与 Nov 2 原生隔离截图实现，保留 DS 及既有修改；不提交、不发布、不覆盖或移动桌面原图。
- 当前进行锚点、分区预处理及解析修复；完成后构建并重启生产验收 EXE。
- 原型仅匹配单个标记时有一张误匹配到了词条，已改为顶部标记与五点联合模板并加入范围校验；此前「全部找到」仅指候选，不作为50张定位成功结论。
- 已修生产解析器，10项针对已确认问题的回归通过；真实引擎准确性仍待对照。原值/符号不再被公式修正，正负槽位独立于数值符号，未知符号保持未知。
- 环境错误：OpenCV直接imread中文路径失败，改用字节解码；Rust测试被旧EXE占用DLL阻断，核对工作区程序路径后关闭，受限终止被拒后经授权范围的提权工具成功关闭；测试重启进行中。一次TS变量遮蔽已修，单字武器测试发现Prime中文归一化同名歧义后补变体核对。
- Rust真实定位评测已对50张逐张生成裁区，均与独立OpenCV原型位置吻合（最小稀疏相关分数0.623，分数不是置信度/准确率）。原始图哈希清单在忽略的outputs中；不改原图。
- 实际Windows中文OCR对照发现「-1」会读成汉字，现改成百分比数字独立图集识别，符号和小数点位置/数字组件数按像素复核；12项生产TS解析及真实表单回填回归通过，Rust专项7通过/显式本地图评测1默认忽略。49项离线检查通过；之后补两项回填/Prime断言并再次专项验证。
- Computer Use本轮初始化成功，但用户物理Esc停止了界面自动操作，立即停止所有鼠标键盘操作，不改用其他界面控制绕过；实机截图/回填和双尺寸目视验收保留给用户。画图仅打开未载入或改写任何原图。
- 生产构建首次因esbuild子进程spawn EPERM失败，已改用正常本机权限重试同一Tauri构建；不改变构建参数或版本。
- 最终生产构建退出0，4m21s；EXE1.6.0 /20,964,071 B /SHA256 67F6E6ED621C45A67F6E50685C16635BD05228F5D15FB085DFB86BB5F2A177A0。正常启动PID26036且Responding=True，未继续界面操作。
- 新EXE实际离线重读50图：50定位，主要文本精确武器44；处理283–449ms/中位350ms（不含启动/选区）。三组重点卡面数值及负号全部匹配人工转录；英文编号、少量倍率/词条/秒数仍有错误，不报总体/整卡准确率。最终49项离线、12项生产TS与真实表单、7项Rust通过。
- 50张原图哈希与首轮清单全部一致。离线50图回放页及证据在outputs，正式结论见[专项报告](../logs/riven-anchor-ocr-2026-11-03.md)。已交付首版供用户试用，无Git写入、无发布。


## 2026-11-03 自研紫卡 OCR 可行性评估记录【DS操作】

- 用户 m00082 提出自研紫卡 OCR 可行性问题；m00130 要求用 planning-with-files 记录，稍后交 Codex 评估。
- 本轮只读检查：`selector.rs`、`riven_capture.rs`、`cnn.rs`、`ocr.rs`、`parse.ts`、`numerical-model.ts`、`train_cnn_v13.py`、`OCR_TIMER.md`、`game.json.gz` 及任务记录；未改代码/数据/版本。
- 结论：可行，但建议做“固定版式 + 闭集词条 + 数字序列 + 约束解码”的专用识别，Windows OCR 降级为草稿/兜底；完整自研 OCR 作为备选，不直接投入。
- 关键理由：已有 24×24 CNN（81,196 B、v9）、v8–v13 训练/评估/切分资产；紫卡闭集仅 54 词条/130 汉字/632 武器；现有错误主要来自小字、无 word 框/置信度、公式内静默误读；专用方案可在图像层给置信度并门控回填。
- 方案阶段：P0 基准 3–5 天（50–100 张分层卡、字段级指标）；P1 预处理约 1 周（卡面归一化/上采样/多路投票）；P2 混合识别 3–5 周（数字 CNN + 54/632 闭集分类 + 约束解码）；P3 全自研 2–3 个月（仅 P2 不达标）。
- 比例/分辨率：平面截图无需透视；按卡面真实宽高比归一化，不拉伸；数字字高 <16 px 设提示下限；4K 先裁卡面再缩放，避免 2560 二次降采样；训练多尺度、验证按分辨率/HUD 分桶。
- 数据：现有约 15 张真实卡，目标 200–500 张；P0 先 50–100 张；需用户同意本地采集卡面（只存卡面、不上传），复用标注页，按采集组切分。
- 状态：记录完成，待 Codex 评审；未实施 P0/P1/P2，未构建、未 Git、未发布。等 Codex 意见后再由用户决定是否投入。
- 风险：标注成本、隐私/版权/许可、游戏改版、过拟合与维护；闭集分类器必须保留低置信候选，不能静默回填。

## 2026-11-02 紫卡 OCR 重建交付与待验收【Codex操作】

- 按用户“记录”要求完成收尾核对：沿用docs/tasks三文件，保留历史；本段“正在构建/尚未构建”是过程状态，最终以本段顶部及[专项报告最终证据](../logs/riven-capture-rebuild-2026-11-02.md)为准。尚待真实卡面、拖框、Esc/右键、多屏验收；本次只更新记录，不重复构建、不提交、不发布。

- 最终收尾：关闭占用实例后重建4m19s成功；EXE1.6.0 / 20,839,786 B / SHA256 4AE3E02BC271367C2EBCB4C08BD1ECB69B740DA338F5AEF2F91C9CB23B570DFE，内嵌main-rcjD2Kjv.js / main-Deh8YbyV.css。
- 最终worker探针明确输出protected→captured→selecting→cancelled_timeout→空结果；实际计时预算1秒，验证与生产45秒共用WM_TIMER退出路径，不声称完整等候45秒。watchdog真实终止受控挂起子进程已由Rust专项证明。
- 最终生产页1060×680和700×500入口可见、无水平溢出，截图已目视检查。退出CDP调试实例43532后正常启动43344；后续原生拖框、Esc/右键、真实卡面OCR与混合DPI仍待用户验收。未提交、未发布，静态数据与版本字段未改。

- 实施进展：异步主窗命令、独立 Win32 冻结桌面框选及 Windows OCR、独立句柄 watchdog、结果预览确认后回填均已实现。外部保护以子进程创建时间与同 EXE 路径核验身份，不按进程名批量结束。
- 已通过：cargo check；新增 UI 生命周期回归（重复点击/取消/切模式旧响应/预览不覆盖/确认回填/失败恢复）；旧 CLI 40 项；48 项完整离线检查；3 项 Rust 专项，其中真实等待子进程经错误身份拒绝后，被150ms测试预算独立终止。
- 环境失败：npm test 普通权限下 spawnSync powershell EPERM，正常权限重跑48项通过；Computer Use 两个工具初始化均报“failed to write kernel assets / os error 3”，无法用其点击原生选区。改用程序自身受保护的1秒自动取消探针验证窗口生命周期；不会把该探针说成 Esc/右键实机验收。
- 正在执行 ocr-training 生产构建；未提交、未发布。
- 首轮构建4m40s成功，1秒原生窗口取消探针正常；生产页两种尺寸入口可用。真实调用约20.2秒取消并恢复，非45秒超时证明；随后增加取消原因阶段并修正按钮样式。
- 最终重建首次因工作区EXE被PID47020（20:52启动）占用而链接失败（os error5）。完整权限核对精确路径后关闭该工作区实例重试；不归为源码错误，不结束其他程序。

- 核对事故版代码、当前回滚状态与依赖的 Windows 死锁警告，用户授权重建。初始工作区干净，版本 1.6.0。
- 采用独立原生框选/系统 OCR 与外部超时保护；尚未构建或验收，不恢复旧透明 WebView。
- 记录补丁首次因 findings 标题不同而未应用，核对标题后修正；未覆盖历史记录。

## 2026-11-02 本周科研词条补齐【DS操作】

- 指令：用户 m01169「本周的科研词条，继续补充」+ 16 张游戏内截图（深层科研/时光科研各 1 张总览、3 张任务、4 张个人改造）。
- 抓取：node fetch `https://api.warframe.com/cdn/worldState.php`，176,554 B、sha256 `d879f122…`（harness web_fetch 对该 URL 约 100KB 截断，不能用）；窗口 2026-11-02→11-09；CT_LAB seed 369434、CT_HEX seed 423391。
- 改动仅 `src-tauri/resources/research_terms_zh.json`：`reviewed_at` 11-02；`sources` 新增 `game_ui_screenshot_20261102`；新增 Exhaustion「能量枯竭」、InfectedWounds「感染伤口」、GestatingTumors「孢子增殖」；补 AlchemicalShields「炼金难侵」与 ChemicalNoise「噪音抑制」空描述。条目数 variables 21→23、deviations 23→24、risks 23。
- 证据：`internal/data/research-terms/2026-11-02/`（conquests.json 投影、evidence.json、review.md）；截图未落盘（沙箱 EPERM），16 张 sha256/字节数已记录。
- 校验：`outputs/_tmp-final-check.cjs` → 14 位置 0 问题（实时 API ↔ conquests.json ↔ 字典 zh 三方一致）；JSON 解析通过。
- 构建：`npm run build` 通过（83 modules，main-Dxx7iGzx.js 299.77 kB / main-D4tU_K5G.css 163.03 kB）；`node node_modules\@tauri-apps\cli\tauri.js build --features ocr-training --no-bundle` 退出 0（7m05s），EXE `src-tauri/target/release/voxalic.exe` 21,126,884 B / 2026-11-02 18:59 / v1.5.19 / sha256 `FB638837C689844F759AF7AC35A31B9FB508468456D2B35E407BBA2212838447`；二进制含「能量枯竭」UTF-8 与内嵌前端资源。
- 启动核对：pid 40000、Responding=True、标题 VoxAlic、工作集 33.2MB，日志 session=20261102T190140497-40000 且 market_ws_state connected→ready。
- 环境备注：本会话沙箱默认拦截 esbuild/cargo 子进程（`spawn EPERM`），构建需完整权限；`cargo test` 因 cargo 无法写 `src-tauri/target`（os error 5）未执行。
- 未做：未改版本号、未 Git 写入、未发布。

## 2026-11-01 移除截图识别入口（应用卡死后按用户要求下线）【DS操作】

- 事件：用户点击「截图识别」后应用无响应。Windows 事件日志 `Application Hang` Id 1002：2026-11-01 22:33:55 `voxalic.exe` 1.5.19.0 停止响应并被系统关闭（AppHangB1）；应用日志无任何 `riven_ocr` 记录，说明卡在创建选区窗口，尚未进入截图/OCR。
- 根因：`open_capture_overlay` 用 `.fullscreen(true).transparent(true).always_on_top(true).skip_taskbar(true).shadow(false).focused(true)`，且流程是先隐藏主窗再创建该窗口；命令为同步命令（跑主线程），无看门狗、无失败恢复 → 透明全屏置顶窗口创建阶段挂住主线程，主窗已隐藏、选区窗未出现，输入全部积压。
- 决定：用户选择「先彻底移除这个功能」，只保留解析器与报告。
- 移除：删除 `src/riven-ocr/capture.ts`、`capture-overlay.html`、`src/capture-overlay.ts`、`src/styles/capture-overlay.css`、`src-tauri/src/riven_capture.rs`、`src-tauri/capabilities/capture-overlay.json`；`src-tauri/src/lib.rs` 去掉 `mod riven_capture;` 与 5 个命令注册；`src-tauri/Cargo.toml` 回退 windows features（`Foundation`、`Foundation_Collections`、`Globalization`、`Graphics_Imaging`、`Media_Ocr`、`Storage_Streams`）；`vite.config.ts` 去掉 `captureOverlay` 入口；`numerical.ts` 去掉「截图识别」按钮、回填函数与 `initial` 参数；`recommendations.ts` 去掉空态入口与 `pendingCard`；`src/styles/riven-tools.css` 去掉 `.riven-ocr-empty*` 与 `.riven-numeric-capture-*`。
- 保留：`src/riven-ocr/parse.ts`（解析核心，当前无 UI 调用）、`internal/tools/riven-ocr-parse.cjs` + 40 项测试 + `riven-name-parts.json`、报告 `docs/logs/riven-ocr-recognition-2026-11-01.md`。
- 验证：`tsc --noEmit` 0；`tauri build --no-bundle` 0（release 4m18s）；EXE **21,095,589 B**、SHA256 `293327AF749B67B987387B71BA7B8B551284A1A559324E26CDBAC39894773E5B`；PID 3024 启动正常（`official_ok`、市场 `hedge_ok`）；`dist` 已无 `captureOverlay-*` 资源。
- 未提交：本次移除尚未提交；提交 `49b1962` 仍包含该功能，后续如需清理历史可补一次移除提交。
- 恢复入口：重新接入前必须改成「先全屏截图 → 不透明冻结画面窗口 → 图上框选 → 从原图裁切」，并加 30 秒看门狗、Esc 退出、任何失败都恢复主窗；**不要**恢复透明全屏 overlay。

## 2026-11-01 截图识别入口可见化：数值分析空态按钮 + 自动选武器【DS操作】

- 问题：用户 m04558「入口在哪」——此前「截图识别」按钮只在 `mountNumericalPanel` 里，必须先选武器才挂载，数值分析页在未选武器时是空白。
- 改动：新增 `src/riven-ocr/capture.ts`（`onCapture` 单例监听 + `startCapture` 藏主窗/开 overlay）；`numerical.ts` 改用共享 capture 模块并支持 `initial?: ParsedCard` 回填；`recommendations.ts` 在「数值分析」且未选武器时渲染 `.riven-ocr-empty`（`截图识别` 按钮 + 说明 + 状态行），识别成功后用 `数值数据.weapons` 按中文/英文名自动选武器 → 挂面板并回填，识别不到则提示手动选；`src/styles/riven-tools.css` 补空态样式。
- 验证：`tsc --noEmit` 0；`tauri build --no-bundle` 0（release 4m03s），EXE 20,759,126 B、SHA256 `4DA73ECD0C6BC99C6518DB4DA9C99492B7E2AAB9BCE60FBB9B2274BB68CD1302`，PID 6808 启动正常（`official_ok`、市场 `hedge_ok`）。
- 未提交（工作区改动：`src/riven-ocr/capture.ts`、`src/tabs/market/riven-tools/{numerical,recommendations}.ts`、`src/styles/riven-tools.css`、本记录）。

## 2026-11-01 紫卡截图识别接入应用：Rust 截图 + 系统 OCR + 选区窗口 + 面板回填【DS操作】

- Rust：新增 `src-tauri/src/riven_capture.rs`——`capture_region`（BitBlt + GetDIBits，alpha 补 0xFF）→ `SoftwareBitmap::CreateCopyFromBuffer` → `windows::Media::Ocr`（`zh-Hans-CN`，失败回退用户配置语言）；命令 `capture_and_ocr_region` / `set_main_window_visible` / `open_capture_overlay` / `hide_capture_overlay` / `close_capture_overlay`；`Cargo.toml` 仅新增 windows features，零第三方依赖、不打包模型。
- 选区窗口：新增 `capture-overlay.html`、`src/capture-overlay.ts`、`src/styles/capture-overlay.css`，全屏透明置顶、拖拽框选、Esc 取消，`emitTo('main','riven-capture-ocr', …)` 回传；`vite.config.ts` 增入口，`src-tauri/capabilities/capture-overlay.json` 只放行事件 emit。
- 解析器移植：新增 `src/riven-ocr/parse.ts`（行合并 / 词条名六段匹配 / 取数与公式修正 / 布局 / 类别×等级枚举 / 编号 / 武器名），把 `riven-name-parts.json` 的 54 条前缀后缀内联为 `NAME_PARTS`；4 张真卡样本（Ogris、Karyst、Falcor、Zarr）解析全部通过，覆盖括号折行、跨类别同名词条、flat 与 mult。
- 回填：`numerical.ts` 面板加「截图识别」按钮与状态区；识别后自动设布局/等级、按词条名匹配 id 回填数值（倍率带 `×`、负面带 `-`），并显示 `武器 · 编号 · 布局 · 等级 · 类别 · 可信 n/m · 耗时` 与警告。
- 验证：`tsc --noEmit` 0；`vite build` 0；`tauri build --no-bundle` 0（release 4m16s），EXE 20,759,126 B、SHA256 `85E56C5B40A12705D99DF68DAB098491CD4AA5ECB0F3A85A3612C87F80A463BB`，PID 30908 启动正常（`official_ok`、市场 `hedge_ok`）。
- 未验证：`cargo test --lib ocr_screen_probe` 在测试进程里因缺少 WebView2Loader 入口失败（0xc0000139），探针未跑通；WinRT 位图/语言包/真机截屏链路需游戏内实测；overlay 坐标按 100% 缩放假设，多屏与高 DPI 未处理。
- 恢复入口：`node node_modules/typescript/bin/tsc --noEmit`；`node node_modules/@tauri-apps/cli/tauri.js build --no-bundle`。

## 2026-11-01 紫卡截图 OCR 识别层：解析器收口 + 接入方案报告【DS操作】

- 本轮把试验阶段的识别层整理成可提交资产：`internal/tools/riven-ocr-parse.cjs`（1,203 行）、`internal/tools/test-riven-ocr-parse.cjs`（630 行 / 40 项）、`internal/tools/riven-name-parts.json`（54 条编号前后缀，来自 `wxhn1225/riven-roll@986f37c…`）。
- 能力：OCR 文本 → 行合并 → 词条名六段匹配 → 取数与修正 → 布局 → 类别/卡等级枚举 → 编号核对 → 武器名补全；输出带 `✎`（词条名纠正）、`*`（数值修正）、`†`（数值补全）、`待核对` 标注。
- 15 张真实卡实测：12 张 4/4；卡 13（响胆 Vexican）Windows OCR 返回 0 行（图片格式问题，已加白底扁平化兜底）；卡 15 有一处区间内静默误读（-50.8 读成 -58.0，公式校验拦不住）；卡 5/8 为已知低分辨率退化。
- 接入方案报告：`docs/logs/riven-ocr-recognition-2026-11-01.md`。路线 = Windows.Media.Ocr（windows 0.58 crate 已含模块，零新增依赖）→ Rust `capture_and_ocr_region` 命令 + `capture-overlay` 全屏选区窗口 → 解析器移植 `src/riven-ocr/parse.ts` → 回填「数值分析」面板；入口为面板内「截图识别」按钮，点击隐藏主窗、微信式框选。
- 分阶段 P0–P4 估时 5–7 天；验收 = 15 张旧卡 + 5 张新截图在正常分辨率下全 4/4，失败必须给出原因。
- 未做：未改应用代码、未移植解析器、未建 overlay 窗口；本地沙箱禁止写临时目录，扁平化兜底与端到端 OCR 需用户在真机验证。
- 恢复入口：`node internal/tools/test-riven-ocr-parse.cjs`（40 项）；阶段拆解见报告第 6 节。

## 2026-11-01 校园网市场链路修复与三次构建【DS操作】

- 只读诊断 → 改码 → 构建 → 实机验证，全程未推送；探测脚本在 `outputs/`（gitignored）。
- 改动文件：`src-tauri/src/market_orders.rs`（请求层重写）、`market.rs`（回退边缘 IP + `connect_timeout(8s)` + detail/orders 走统一层）、`market_auth.rs`（网络错误保留凭据、WS 限流、15 s CSRF 读体）、`market_riven.rs`（三个命令走统一层）、`src/tabs/market/orders.ts`（失败文案带原因）。
- 构建 3 次：①16:56 EXE 21,126,372 B / `FA544DBB…`（首版对冲，7 s 预算）→ 17:19 实机黑洞窗口 4 次尝试全超时，证明 7 s 与旧 IP 都不够；②17:19 预算调宽（12 s/20 s/25 s、hedge 2 s、client 60 s）；③17:26 回退客户端换 6 个可用边缘 → EXE 21,126,884 B / SHA256 `7229A57D60402296BC7AE32E17BCC514B082F0E2D233455AD2B6CA22CBC5AE37`、PID 29220。
- 验证：`tsc --noEmit` 0；`cargo test --release --locked --lib` → 174 passed / 0 failed / 3 ignored（13.19 s）；`run-offline-checks.cjs` → 47 项全过；`npx tauri build` 本机秒退（只打印 Looking up installed tauri packages），改用 `node node_modules/@tauri-apps/cli/tauri.js build --features ocr-training --no-bundle` 成功（3 m 58 s）。
- 实机日志（session 20261101T172705273-29220）：17:27:08.755 `riven_attributes` hedge_ok、17:27:08.985 `riven_weapons` hedge_ok、17:27:09.927 `list_orders` hedge_ok、17:27:25 `market_ws_state=ready`；世界状态 oracle 回退成功、`official_ok=true`。
- 未做：幂等写重试、订单/紫卡离线缓存、版本号与 CHANGELOG、推送/发布。

## 2026-11-01 本机重建产物并启动新 EXE【DS操作】

- 用户要求读日志确认 Codex 推进并重建本地产物。核对 HEAD `df95bdf`（紫卡数值分析 + 洗卡推荐）与 v1.5.19 记录；`git status` 干净。
- 构建：`npx tauri build --features ocr-training --no-bundle` 退出 0，总 611s（cargo release 9m51s），含 `tsc && vite build` 83 modules。
- 产物：`src-tauri/target/release/voxalic.exe` v1.5.19、20,985,600 B（20.01 MiB）、2026-11-01 16:10:51、SHA256 `EC257AAD4E111793E2998FEE33A86E6ED297839524D7AE69CB0DAF88872622B3`；内嵌 `main-VHKk3yey.js` / `recommendations-CKx6T9XN.js` / `main-D4tU_K5G.css` / tauri.localhost 标记均存在。
- 前端：dist 27 文件 2,063,335 B；`main-VHKk3yey.js` 299,604 B、`main-D4tU_K5G.css` 163,033 B、懒加载 `recommendations-CKx6T9XN.js` 369,629 B（gzip 49.30 kB）。
- 新增可见入口：市场工具栏「洗卡推荐」按钮 `#market-riven-tools` + `#market-view-recommendations` 视图，内部切换洗卡推荐／数值分析。
- 启动核对：普通沙箱下 EXE 因 `%APPDATA%\com.voxalic.app\logs` 写入被拒（os error 5）立即退出；以完整权限启动后 PID 2476、Responding=True、标题 VoxAlic，日志 `official_ok:true`、`market_ws_state=ready`。
- 未执行：Rust/离线全量测试复跑（复用 Codex 11-01 的 45/47 项与生产构建记录）、实机界面视觉验收、版本号/CHANGELOG 修改、提交/推送/tag/发布。

## 2026-10-24 全项目四维优化评估（只读）【DS操作】

- 用户指令（m00001）要求阅读整个项目、结合日志进度与工作记录给出架构/性能/视觉/手感四维优化报告，并明确「这一轮不碰代码」；m00303 追加「记录，我会叫codex也看一下」。
- 读取范围：`AGENT_GUIDE.md`(109 行)/`ARCHITECTURE.md`(179)/`VISUAL_DESIGN.md`(176) 全文、`RELEASE.md`/`BUILD.md` 关键段；三份记录按关键词检索（未全文加载）；`src-tauri/src` 全模块清单 + 16 个热点文件；`src` 全模块清单 + bootstrap/state/tabs/market/hud 关键文件；18 个 CSS 全量统计；dist / target / resources / public 体积；6 张实机截图；Git 近期 20 次提交。
- 并行：5 个只读子代理（Rust 后端、前端运行时、视觉与手感、工作记录、工程基建），返回带 `文件:行` 的结论后逐条抽查复核；结论未照单全收——历史子代理建议「视觉排在性能后」，我按确定性收益把性能提到视觉前。
- 复核手段：PowerShell 统计（`@keyframes` 全集、`animation: pulse` 引用、token 定义/引用、9-10px 字号、紫色硬编码计数、`@media` 分布、`:focus-visible`/`outline:none`）、Select-String 定位、读取 CSS/HTML/Rust 片段。未运行构建、未跑测试、未启动 EXE。
- 产出：`outputs/optimization-review-2026-10-24.md`（372 行 / 34,465 B / 22:36），结构与结论见 `task_plan.md` 同日条目。`outputs/` 被 `.gitignore:8` 忽略，报告不进入提交。
- 只读核对：`git status --porcelain` 仍只有此前 12 个在途文件，本轮未新增受跟踪改动；未碰「更新横幅 + 静默安装」工作。
- 主要结论：P0 三项——市场目录索引每次请求重建（约 6.7×10^6 次比较）、每秒全量 tick IPC（599/600 秒内容相同）、主题只覆盖一半（紫色仍是第二主色、36 个 token 从未引用）；工程侧最痛的是质量门空转（CI 只在打 tag 跑，常规发布不跑任何测试）。
- 环境：本轮只读操作未遇阻塞。基建子代理在沙箱内跑离线检查被 `spawnSync powershell.exe EPERM` 拦住（环境限制），已按未验证记录，没有据此判断测试健康度。
- 未做：未改任何源码/CSS/配置，未构建，未跑 `npm test` / `cargo test`，未启动 EXE，未提交/推送/tag。
- 后续：等 xuziyu 与 Codex 复核后再定批次，入口是 `task_plan.md` 同日条目的 4 个待决策项。
## 2026-10-20 会话收尾：采样线待续【DS操作】

- 今日完成：样本 4 落账（第 5 窗口，Seed 34571）+ 任务书 §5 追加五 + 根记录三处同步；采样线累计 **5 个独立窗口 / 7 张图**（样本 0 只有 13:39:58 补证图，原 12:57 首图未存盘，无法补）。
- 明日续做清单已写入 `docs/tasks/task_plan.md` 顶部（再采 1–2 窗、可选真盲测「先抓 Oracle 再等截图」、由用户决定结案与否）；恢复入口与操作教训同段。
- 本轮只改文档：`git status` 为任务书 / `docs/tasks/progress.md` / `docs/tasks/task_plan.md` / `docs/tasks/findings.md` 变脏；未构建、未 Git 写入、未改源码或版本号。

## 2026-11-01 Demo05 人工洗卡推荐交付比对【Codex操作】

后续状态：用户明确保留当前内容／顺序并授权正式接入，已完成市场上方中间独立入口、推荐工作区、正式快照与离线生成／检查，详见[正式接入报告](../logs/riven-recommendations-integration-2026-11-01.md)。最终 44 项离线检查、15 组浏览器交互及真实生产 EXE 入口验证通过，v1.5.19／20,999,985 bytes 已构建并正常重启。后续评价／分析仍未实现；本轮无 Git 写入或发布。

- 用户明确授权接入独立 HTML，实施 `internal/mockups/riven-recommendations/` 的原文归档、快照、精确中文名连接、离线重建及 UI，生成同名 `riven-analysis-demo.html` Demo05。原有卡面输入仍空白，数值分析覆盖保持 27 把；推荐覆盖 419 条，并有中文／英文搜索、五分类、复制、原表链接与英文原文展开。
- 验证：推荐专项 18 组、原空白／数值 17 组、融合 15 组通过；融合含 18,522 显示值对照。419 条原文显示完整、416 个已接受中文名精确连接；1060／700／375px 无横向溢出，无页面异常或 HTTP 请求。离线原文重建逐字节确定一致，JS 语法和 git diff --check 通过。
- 截图已查看，测试输入仅在浏览器检查会话，交付文件没有默认武器／卡面。单 HTML 201,699 bytes；未整合 Tauri，因此本轮仅浏览器验证，不构建或重启与 Demo 无关的正式 EXE；无版本／Git 写入、发布或正式数据接受。
- 失败记录：.NET 并发来源请求取消，切换 curl 单请求成功获取六页；第一次浏览器启动 EPERM，获准桌面进程环境重跑成功。原有工具输出过长按模块缩小；旧检查名称保留 Demo04 字样，但实际访问的是当前 Demo05 文件。
- 未完成：用户与机器人逐项比对、全部人工条件的中文解释／当前机制复核、整卡评分。原表倾向出售、旧倾向阈值与歧义保持显式标识。

## 2026-11-01 洗卡推荐精简重设计交付【Codex操作】

- 用户否决侧栏／详情解释布局后，改为单武器输入选择框，按字符顺序匹配；初始空白，选中后仅展示原顺序推荐组合与负面词条。独立中间入口更明显，加入 DEMO、测试提示和网页反馈链接。
- 名称与明确别名独立匹配，避免跨别名误命中；保留原始 419 条推荐内容、条件及审核证据，页面隐藏条件不等于重新验证其适用性。
- 45 项离线、15 组浏览器及实际生产 EXE 界面验证通过；生产程序 v1.5.19／20,999,978 bytes 已正常重启供用户验收，完整产物 hash／验证范围见[精简重设计报告](../logs/riven-recommendations-compact-2026-11-01.md)。用户尚未验收，不包含整卡评分或游戏实测。
- 官网源码在另一台电脑，用户同意明天切换环境再更新反馈表单；本轮仅接入现有地址，没有重建、部署官网或提交反馈。未改版本号、Git 写入或发布。

## 2026-11-01 按用户要求补记本轮交付【Codex操作】

- 已恢复并核对现有任务、发现、执行记录与精简重设计报告，追加用户验收、跨环境官网表单更新及评分未实施的明确接续点；没有在根目录重建规划文件，也没有覆盖历史。
- 上轮验证结论保持：45 项离线、15 组浏览器和实际生产 EXE 界面检查通过；v1.5.19／20,999,978 bytes 已构建并正常重启。此处复用上轮已保存证据，本轮仅记录，没有重跑应用测试或构建，也未新增验收结论。
- 上轮收尾恢复时，旧构建会话 ID 已失效、受限进程查询被拒绝；随后以实际产物、桌面进程查询和生产界面检查完成核对。一次多文件补丁因匹配行不存在而整体未应用，核对原文后缩小补丁成功，未覆盖无关改动。
- 本轮只修改 docs/tasks 下既有三份记录，检查差异与链接；未修改源码、版本、官网或私有长期记忆，未提交、推送或发布。

## 2026-11-01 当前版本本地提交前核对【Codex操作】

- xuziyu 明确要求“把目前这一版提交到本地”。纳入本次紫卡研究、HTML Demo、人工推荐原文与接受包、市场洗卡推荐正式源码／UI、共享反馈入口、测试及相关规则／任务记录，共 49 个文件；评分草案作为研究文档保存，不表示评分已实现或新 UI 已获视觉验收。
- 排除已忽略的 outputs 检查日志／截图／临时脚本、dist、target／EXE 和其他本机产物；不修改版本号，不推送、不打 tag、不发布，官网表单更新仍待切换环境。
- 提交前重新运行 npm test，45 项离线检查全部通过；推荐生成器 --check、相关 JS 语法与差异检查通过。首次普通权限回归在启动 powershell.exe 时出现 EPERM，正常进程权限重跑通过；敏感内容扫描一次因 Windows 通配符路径无效退出，改为目录加文件过滤后完成，未发现所检私钥／访问令牌／Bark 链接格式。
- 本条保存提交前范围和验证；提交是否成功、实际哈希及提交后工作区状态以随后 Git 核对为准。
- 提交暂存检查额外发现两处空白格式问题，以及来源 JSON 的 CRLF 字节 hash 与仓库 LF 规则不一致。已清除 Demo 空白行尾／审核文件多余尾空行，将来源与原型快照规范化为 LF，并只同步接受记录中的 source_sha256；JSON 语义逐项相等，原始 gzip 与正式运行输出 hash 保持不变。另核对 Git 暂存区实际字节，防止仅工作区校验通过而换电脑检出失败。

## 2026-11-01 全网追加洗卡推荐来源研究【Codex操作】

- 按用户要求恢复上一轮人工推荐与评分调查，完成中英文搜索及一手材料核对。新增[来源调查报告](../logs/riven-recommendation-sources-followup-2026-11-01.md)，更新既有计划与发现；未修改正式推荐／界面／Demo、构建、Git写入或发布。
- 成功获取 Megrim／Valkyrial／Lia 原始 CSV（61,338 bytes，SHA-256 ec00d13dc84f3bf03bf200c0c74443bdc2291945b6f96e064cd5bb8d2828402c），用自行编写的隔离解析器核对417个不同武器名及五个样例，未执行上游脚本。读取 VoidLens master真实脚本证实表来源，保留列结构与当前表不一致的限制。
- 核实 ninjase 托里德／Syam 正文的融合与配装条件、RivenLens官方人工Desired Stats说明、Underframe真实域名与Rolls Scan Setup；未声称已拿到RivenLens全量规则或已执行模拟器验证。
- 失败与限制：批量读文输出截断后改分段；Google编辑页／部分GitHub与Notion页面不能读取，改公开CSV与真实master路径；CW路径404，Morrow Shore403；curl普通环境代理127.0.0.1:9连接失败后正常网络权限成功；Python控制台中文编码改-X utf8确认；Cedo页面搜索摘要／正文矛盾、WFSim HTTP200客户端壳均未当结果采纳。详细边界写入报告。
- 研究证据仅在被忽略的 outputs/riven-followup-2026-11-01，稳定来源URL／原始hash与结论写入正式文档；本轮只验证文档差异、链接及正式资源未改，不重复执行无代码变化的应用构建或回归。

## 2026-11-01 Megrim新表词条展示交付【Codex操作】

- 按用户已查看并指定的新表和“先只展示词条”范围完成接入。419条／699套，身份／类别／中文名不变；仅展示正面组合、备选／优先级和负面，备注完整留存，不显示条件解释或评分。旧表及接受记录封存，未删除历史、改独立HTML Demo或其他正式数据。
- 同批CSV与补取HTML的3,364个非空单元格匹配；使用真实合并范围，补齐初查漏掉的Vinquibus步枪／近战模式、跨列第三槽及正确的负面关联。完整差异、来源和接受hash见[接入报告](../logs/riven-megrim-integration-2026-11-01.md)及internal/data/riven-recommendations/megrim-2026-11-01。
- 最终45项离线检查通过，含5项生成器完整性／失败保护回归；17组浏览器检查包含419条／699套全遍历，双尺寸截图已查看。Tauri ocr-training生产构建退出0（4分09秒），实际内嵌页面检查通过，程序已正常重启且窗口可响应，检查端口和预览服务均已关闭。
- 产物v1.5.19／21,004,074 bytes／SHA-256 514A8C7BFFCA2CADCAFC747F630E6C708A5B077E18F3EB76F620359270F8A3FB；绝对路径与截图范围见报告。用户视觉验收及游戏实测未完成，官网表单更新仍待换环境；未提交、推送或发布。
- 过程失败：一次临时内联Python引号错误改为文件执行；列字母头无编号改为明确跳过表头；Latron单备选池经原文核对后按真实1～3来源分槽保留。均已记录和复查，不把失败尝试计为通过。

## 2026-11-01 紫卡工具页布局交付【Codex操作】

- 完成标题／DEMO与武器选择同一顶部工具栏、独立工作区、宽窗正负并排／窄窗上下排列，减少纵向占用，为后续分析扩展保留结构和空间。仅修改推荐页面容器与CSS；现有419条／699套、来源hash和选择行为保持，不添加伪分析入口或额外解释。
- 45项离线、20组浏览器检查通过；全部699套双尺寸文字不截断、不重叠，多套末行可滚动到达，下拉在窗口内并与输入内边框对齐。已查看单／多组合、下拉及实际EXE双尺寸截图。
- Tauri ocr-training生产构建退出0（4分01秒），实际内嵌页面验证新工具栏、宽窄布局、词条和反馈地址；正常重启后窗口可响应，9223和1421检查服务均已关闭。v1.5.19／21,004,081 bytes，产物路径与SHA见[布局报告](../logs/riven-tools-layout-2026-11-01.md)。
- 失败记录：技能搜索脚本本机缺失，沿既有视觉规则和检查表实施；一次rg路径通配错误改目录过滤；读取输出过长改分段；一次下拉几何测试严格小于2px忽略了外框边界，核对后按真实边框容差修正，全部浏览器检查重跑通过。
- 用户视觉验收、后续紫卡分析功能仍待完成；官网反馈表单仍待换环境。本轮无版本修改、数据刷新、提交、推送或发布。
## 2026-11-01 紫卡数值分析交付【Codex操作】

- 用户要求实现图片最上方数值分析，确认接受固定来源7类／632武器候选接入测试。加入页内推荐／数值分析切换、共享武器输入位置、全空手动卡面、四布局／等级、常规及融合词条、低／均／高与浮动；错误不产生有效结果，负面仅描述幅度。不实现OCR、整卡评分、伤害或行情，不改旧推荐／其他静态资源。
- 参数、原文及完整审查封存于internal/data/riven-numerical，生成器只读重建／独立候选，不自动接受。正式数据hash与获准候选相同。初版报告／测试误认视使之触为Torid，已核实Ocucor/Pistol并保存更正，目录和获准参数字节原本正确；按实际类别重验四项匹配。OCR只读评估，建议后续作为可编辑表单的本地截图填入入口。
- 47项离线、20304个既有Demo显示值、35208次舍入反求、11条截图样例、20组浏览器和实际生产EXE双尺寸检查通过，截图已查看。Tauri ocr-training无安装器构建退出0，4分15秒；正常重启后11396号进程窗口VoxAlic／可响应，预览1421和调试9223监听已关闭。
- 产物v1.5.19／21,024,554B（20.05MiB），路径C:/Users/Administrator/Desktop/tauri-warframe-monitor/src-tauri/target/release/voxalic.exe；SHA256 CAC764B863BDE23A38C6F3DC07ABEDC609A43160FF3FADB80D4C40ECBF31C5D3。完整范围、失败与边界见[报告](../logs/riven-numerical-integration-2026-11-01.md)。用户视觉和游戏实机仍待验收，未提交、推送、发布或改版本。
## 2026-11-01 当前版本本地提交准备【Codex操作】

- 按用户“记录，然后把这一版提交到本地”授权，恢复并补充既有task_plan／findings／progress，保留历史，不另建同名三文件。审查起点HEAD为3d7aa35；已核对Git身份CCvTDD，未改变身份或版本。
- 纳入同一版全部正式改动：Megrim人工推荐表与旧来源归档、推荐呈现／响应布局、632武器数值分析、接受证据与离线工具、规则及研究／交付文档。排除默认忽略的outputs、dist、target／EXE、浏览器截图和临时脚本。
- 本条记录提交范围与准备，不预写成功哈希；完成后以Git回执、提交文件清单和干净工作区验证。未授权推送、tag或发布。OCR／评分／官网表单与游戏验收仍保持待办，不因本地提交而声称实现。
- 提交前47项离线检查全部通过，Python语法通过；普通执行环境中的Node启动Git子进程未能启动（status为null），改用正常进程权限核对明确文件清单。此为检查进程环境问题，未据此改业务代码。
