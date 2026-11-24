window.__ModuleLoader__.load({
  id: "dsh-task-pulse",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");
    const { useEffect, useMemo, useRef, useState } = React;
    const h = React.createElement;

    /*__PARSER__*/

    /*__PROMPTS__*/

    const CSS = `
.vb-root {
  --vb-border: #e5e6eb;
  --vb-panel: #ffffff;
  --vb-panel-2: #f7f8fa;
  --vb-text: #1f2329;
  --vb-text-2: #646a73;
  --vb-text-3: #8f959e;
  --vb-blue: #3370ff;
  --vb-green: #00a870;
  --vb-amber: #d97706;
  --vb-purple: #7c3aed;
  --vb-red: #d54941;
  --vb-gray: #8a919f;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  padding: 20px 24px 48px;
  color: var(--vb-text);
  font-size: 13px;
  line-height: 1.55;
  background: transparent;
}
body[data-ds-dark-theme] .vb-root {
  --vb-border: #33363d;
  --vb-panel: #24262b;
  --vb-panel-2: #1b1d21;
  --vb-text: #e8eaed;
  --vb-text-2: #aeb4bd;
  --vb-text-3: #7e858f;
  --vb-blue: #6b9bff;
  --vb-green: #3bc98a;
  --vb-amber: #f0a34a;
  --vb-purple: #a78bfa;
  --vb-red: #f0736a;
  --vb-gray: #8a919f;
}
.vb-root *, .vb-root *::before, .vb-root *::after { box-sizing: border-box; }
.vb-root button { font: inherit; color: inherit; }
.vb-root button:focus-visible, .vb-root summary:focus-visible, .vb-root [tabindex]:focus-visible {
  outline: 2px solid var(--vb-blue);
  outline-offset: 2px;
}
.vb-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.vb-title { font-size: 18px; font-weight: 600; letter-spacing: .2px; }
.vb-sub { margin-top: 4px; color: var(--vb-text-2); font-size: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.vb-muted { color: var(--vb-text-3); }
.vb-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.vb-read { color: var(--vb-text-3); font-size: 12px; }
.vb-health { display: inline-flex; align-items: center; gap: 6px; padding: 2px 9px; border-radius: 999px; font-size: 12px; border: 1px solid var(--vb-border); color: var(--vb-text-2); }
.vb-health::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--vb-gray); }
.vb-health-ok::before { background: var(--vb-green); }
.vb-health-warn::before { background: var(--vb-amber); }
.vb-health-error::before { background: var(--vb-red); }
.vb-btn { border: 1px solid var(--vb-border); background: var(--vb-panel); color: var(--vb-text); border-radius: 7px; padding: 5px 11px; cursor: pointer; line-height: 20px; white-space: nowrap; }
.vb-btn:hover { border-color: var(--vb-blue); color: var(--vb-blue); }
.vb-btn-small { padding: 2px 8px; font-size: 12px; border-radius: 6px; }
.vb-btn-primary { border-color: var(--vb-blue); color: var(--vb-blue); }
.vb-summary { display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0 16px; }
.vb-chip { display: inline-flex; align-items: baseline; gap: 6px; padding: 5px 10px; border: 1px solid var(--vb-border); border-radius: 8px; background: var(--vb-panel); }
.vb-chip-num { font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.vb-chip-label { color: var(--vb-text-2); font-size: 12px; }
.vb-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--vb-border); margin-bottom: 14px; }
.vb-tab { border: 0; background: transparent; padding: 7px 12px; cursor: pointer; color: var(--vb-text-2); border-bottom: 2px solid transparent; margin-bottom: -1px; }
.vb-tab:hover { color: var(--vb-text); }
.vb-tab[aria-selected="true"] { color: var(--vb-blue); border-bottom-color: var(--vb-blue); font-weight: 600; }
.vb-banner { margin: 0 0 14px; padding: 9px 12px; border: 1px solid color-mix(in srgb, var(--vb-red) 45%, var(--vb-border)); background: color-mix(in srgb, var(--vb-red) 8%, transparent); border-radius: 8px; color: var(--vb-text); font-size: 12px; }
.vb-board { display: flex; gap: 12px; align-items: flex-start; overflow-x: auto; padding: 2px 2px 10px; }
.vb-column { flex: 0 0 226px; min-width: 226px; border: 1px solid var(--vb-border); border-radius: 10px; background: var(--vb-panel-2); padding: 9px; }
.vb-column-head { display: flex; align-items: center; gap: 7px; padding: 2px 2px 9px; }
.vb-column-title { font-weight: 600; font-size: 12px; }
.vb-count { margin-left: auto; color: var(--vb-text-3); font-size: 12px; font-variant-numeric: tabular-nums; }
.vb-dot { width: 8px; height: 8px; border-radius: 50%; flex: none; background: var(--vb-gray); }
.vb-column-body { display: flex; flex-direction: column; gap: 8px; min-height: 42px; }
.vb-empty-col { color: var(--vb-text-3); text-align: center; padding: 14px 0; }
.vb-card { display: block; width: 100%; text-align: left; border: 1px solid var(--vb-border); border-radius: 8px; background: var(--vb-panel); padding: 10px; cursor: pointer; }
.vb-card:hover { border-color: var(--vb-blue); }
.vb-card-top { display: flex; align-items: center; gap: 6px; justify-content: space-between; }
.vb-card-id { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; font-size: 11px; color: var(--vb-text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vb-card-title { margin: 5px 0 6px; font-size: 13px; font-weight: 600; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.vb-card-next { color: var(--vb-text-2); font-size: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.vb-card-foot { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 8px; color: var(--vb-text-3); font-size: 11px; }
.vb-badge { display: inline-flex; align-items: center; gap: 4px; padding: 1px 6px; border-radius: 999px; border: 1px solid var(--vb-border); font-size: 11px; color: var(--vb-text-2); white-space: nowrap; }
.vb-badge-warn { border-color: color-mix(in srgb, var(--vb-amber) 45%, var(--vb-border)); color: var(--vb-amber); }
.vb-badge-danger { border-color: color-mix(in srgb, var(--vb-red) 45%, var(--vb-border)); color: var(--vb-red); }
.vb-badge-muted { color: var(--vb-text-3); }
.vb-drawer-backdrop { position: fixed; inset: 0; z-index: 40; background: rgba(0, 0, 0, .28); display: flex; justify-content: flex-end; }
.vb-drawer { width: min(540px, 100%); height: 100%; overflow: auto; background: var(--vb-panel); border-left: 1px solid var(--vb-border); padding: 18px 20px 40px; box-shadow: -8px 0 24px rgba(0, 0, 0, .12); }
.vb-drawer-head { display: flex; align-items: flex-start; gap: 10px; justify-content: space-between; margin-bottom: 14px; }
.vb-drawer-title { font-size: 16px; font-weight: 600; line-height: 1.4; }
.vb-drawer-sub { margin-top: 4px; color: var(--vb-text-3); font-size: 12px; }
.vb-drawer-close { border: 0; background: transparent; cursor: pointer; color: var(--vb-text-2); font-size: 20px; line-height: 1; padding: 2px 6px; border-radius: 6px; }
.vb-drawer-close:hover { background: color-mix(in srgb, var(--vb-text) 8%, transparent); }
.vb-field { border-top: 1px solid var(--vb-border); padding: 10px 0; }
.vb-field:first-of-type { border-top: 0; }
.vb-field-label { color: var(--vb-text-3); font-size: 11px; margin-bottom: 3px; }
.vb-field-value { white-space: pre-wrap; overflow-wrap: anywhere; }
.vb-links { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
.vb-link { border: 1px solid var(--vb-border); background: var(--vb-panel-2); color: var(--vb-blue); border-radius: 6px; padding: 2px 7px; font-size: 12px; cursor: pointer; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vb-link:hover { border-color: var(--vb-blue); }
.vb-code { margin: 0; padding: 12px; border: 1px solid var(--vb-border); border-radius: 8px; background: var(--vb-panel-2); white-space: pre-wrap; overflow-wrap: anywhere; font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; font-size: 12px; line-height: 1.6; max-height: 60vh; overflow: auto; }
.vb-decisions { display: flex; flex-direction: column; gap: 8px; }
.vb-decision { border: 1px solid var(--vb-border); border-radius: 8px; background: var(--vb-panel); padding: 0 12px; }
.vb-decision summary { cursor: pointer; padding: 10px 0; display: flex; align-items: center; gap: 8px; list-style: none; }
.vb-decision summary::-webkit-details-marker { display: none; }
.vb-decision summary::before { content: "›"; color: var(--vb-text-3); transition: transform .12s; display: inline-block; width: 12px; }
.vb-decision[open] summary::before { transform: rotate(90deg); }
.vb-decision-id { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; color: var(--vb-text-2); font-size: 11px; }
.vb-decision-title { font-weight: 600; flex: 1; min-width: 0; }
.vb-decision-body { padding: 0 0 10px 20px; }
.vb-status { display: inline-flex; align-items: center; gap: 4px; padding: 1px 7px; border-radius: 999px; border: 1px solid var(--vb-border); font-size: 11px; color: var(--vb-text-2); white-space: nowrap; }
.vb-activity { display: flex; flex-direction: column; gap: 8px; }
.vb-handoff { border: 1px solid color-mix(in srgb, var(--vb-blue) 40%, var(--vb-border)); background: color-mix(in srgb, var(--vb-blue) 6%, transparent); border-radius: 10px; padding: 12px 14px; margin-bottom: 4px; }
.vb-handoff-title { font-weight: 600; margin-bottom: 8px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.vb-handoff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 8px 16px; }
.vb-entry { border: 1px solid var(--vb-border); border-radius: 8px; background: var(--vb-panel); padding: 0 12px; }
.vb-entry summary { cursor: pointer; padding: 9px 0; display: flex; align-items: center; gap: 8px; list-style: none; flex-wrap: wrap; }
.vb-entry summary::-webkit-details-marker { display: none; }
.vb-entry summary::before { content: "›"; color: var(--vb-text-3); width: 12px; display: inline-block; }
.vb-entry[open] summary::before { transform: rotate(90deg); }
.vb-entry-date { font-variant-numeric: tabular-nums; color: var(--vb-text-2); font-size: 12px; }
.vb-entry-title { font-weight: 600; flex: 1; min-width: 0; }
.vb-executor { font-size: 11px; color: var(--vb-text-2); border: 1px solid var(--vb-border); border-radius: 999px; padding: 1px 7px; white-space: nowrap; }
.vb-entry-body { padding: 0 0 10px 20px; }
.vb-bullet { margin: 4px 0; }
.vb-bullet-label { color: var(--vb-text-3); font-size: 11px; margin-right: 4px; }
.vb-filters { display: flex; gap: 6px; flex-wrap: wrap; margin: 0 0 12px; }
.vb-filter { border: 1px solid var(--vb-border); background: var(--vb-panel); color: var(--vb-text-2); border-radius: 999px; padding: 2px 9px; font-size: 12px; cursor: pointer; }
.vb-filter[aria-pressed="true"] { border-color: var(--vb-blue); color: var(--vb-blue); background: color-mix(in srgb, var(--vb-blue) 8%, transparent); }
.vb-health-table { width: 100%; border-collapse: collapse; margin: 4px 0 14px; font-size: 12px; }
.vb-health-table th, .vb-health-table td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--vb-border); vertical-align: top; }
.vb-health-table th { color: var(--vb-text-3); font-weight: 500; }
.vb-issue { display: flex; gap: 8px; padding: 7px 0; border-bottom: 1px solid var(--vb-border); align-items: flex-start; }
.vb-issue:last-child { border-bottom: 0; }
.vb-issue-file { color: var(--vb-text-3); font-size: 11px; white-space: nowrap; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
.vb-issue-msg { flex: 1; min-width: 0; overflow-wrap: anywhere; }
.vb-section-title { font-size: 14px; font-weight: 600; margin: 20px 0 8px; }
.vb-section-title:first-child { margin-top: 0; }
.vb-note { color: var(--vb-text-2); font-size: 12px; margin: 6px 0 10px; }
.vb-empty { border: 1px dashed var(--vb-border); border-radius: 10px; padding: 28px 18px; text-align: center; color: var(--vb-text-2); }
.vb-loading { display: flex; align-items: center; justify-content: center; gap: 10px; height: 100%; min-height: 240px; color: var(--vb-text-2); }
.vb-spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--vb-border); border-top-color: var(--vb-blue); animation: vb-spin .8s linear infinite; }
@keyframes vb-spin { to { transform: rotate(360deg); } }
.vb-error { border: 1px solid color-mix(in srgb, var(--vb-red) 40%, var(--vb-border)); border-radius: 10px; padding: 18px; background: color-mix(in srgb, var(--vb-red) 6%, transparent); }
.vb-error-title { font-weight: 600; margin-bottom: 6px; }
.vb-error-message { color: var(--vb-text-2); white-space: pre-wrap; overflow-wrap: anywhere; margin-bottom: 12px; }
.vb-mono { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; }
.vb-inline-code { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; font-size: .92em; line-height: 1.4; padding: 0 4px; border: .5px solid var(--dsw-alias-border-l1, var(--vb-border)); border-radius: 4px; background: var(--vb-surface-2); color: var(--dsw-alias-label-primary, var(--vb-text)); }
.vb-actions-row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
/* readability pass: comfortable defaults, larger text and spacing */
.vb-root {
  --vb-border: #dfe3e8;
  --vb-text: #1a1d23;
  --vb-text-2: #4e5969;
  --vb-text-3: #6b7280;
  --vb-panel: #ffffff;
  --vb-panel-2: #f4f6f9;
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 26px 30px 60px;
  font-size: 14px;
  line-height: 1.65;
}
body[data-ds-dark-theme] .vb-root {
  --vb-border: #3a3e46;
  --vb-text: #eef1f5;
  --vb-text-2: #b7bec8;
  --vb-text-3: #9aa1ab;
  --vb-panel: #282b32;
  --vb-panel-2: #1f2228;
}
.vb-title { font-size: 20px; }
.vb-sub, .vb-read, .vb-health, .vb-chip-label, .vb-btn, .vb-status, .vb-executor, .vb-filter { font-size: 13px; }
.vb-tab { font-size: 14px; padding: 9px 14px; }
.vb-tabs { gap: 6px; margin-bottom: 18px; }
.vb-btn { padding: 6px 13px; }
.vb-btn-small { padding: 3px 9px; font-size: 12.5px; }
.vb-summary { gap: 10px; margin: 18px 0 20px; }
.vb-chip { padding: 7px 12px; gap: 7px; border-radius: 9px; }
.vb-chip-num { font-size: 17px; }
.vb-board-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 0 2px 12px; }
.vb-board { gap: 16px; }
.vb-column { flex: 0 0 272px; min-width: 272px; padding: 12px; border-radius: 12px; }
.vb-column-head { padding: 2px 2px 11px; gap: 8px; }
.vb-column-title, .vb-count { font-size: 13px; }
.vb-column-body { gap: 10px; }
.vb-card { padding: 12px 13px; border-radius: 9px; }
.vb-card-id { font-size: 12px; }
.vb-card-title { margin: 6px 0 7px; font-size: 14.5px; line-height: 1.5; -webkit-line-clamp: 3; }
.vb-card-next { font-size: 13px; line-height: 1.6; -webkit-line-clamp: 3; }
.vb-card-foot { margin-top: 10px; font-size: 12px; gap: 7px; }
.vb-badge { padding: 2px 7px; font-size: 12px; }
.vb-drawer { width: min(640px, 100%); padding: 24px 28px 48px; }
.vb-drawer-title { font-size: 18px; }
.vb-drawer-sub { font-size: 13px; }
.vb-field { padding: 12px 0; }
.vb-field-label { font-size: 12px; margin-bottom: 4px; }
.vb-field-value { font-size: 14px; line-height: 1.7; }
.vb-link { padding: 3px 9px; font-size: 13px; }
.vb-code { padding: 14px; font-size: 13px; line-height: 1.7; }
.vb-decision { padding: 0 14px; }
.vb-decision summary { padding: 12px 0; gap: 9px; }
.vb-decision-id { font-size: 12px; }
.vb-decision-title { font-size: 14px; }
.vb-decision-body { padding: 0 0 12px 21px; }
.vb-entry { padding: 0 14px; }
.vb-entry summary { padding: 11px 0; gap: 9px; }
.vb-entry-date, .vb-entry-title { font-size: 14px; }
.vb-entry-body { padding: 0 0 12px 21px; }
.vb-bullet { margin: 6px 0; font-size: 13.5px; }
.vb-bullet-label { font-size: 12px; }
.vb-handoff { padding: 16px 18px; }
.vb-handoff-title { font-size: 14px; }
.vb-health-table { font-size: 13px; }
.vb-health-table th, .vb-health-table td { padding: 8px 10px; }
.vb-issue { padding: 9px 0; font-size: 13px; }
.vb-issue-file { font-size: 12px; }
.vb-section-title { font-size: 15px; margin: 24px 0 10px; }
.vb-note { font-size: 13px; line-height: 1.65; }
.vb-empty { padding: 34px 20px; font-size: 14px; }
.vb-error-title { font-size: 16px; }
.vb-error-message { font-size: 13.5px; }

/* visual pass: in-view sheet, layered dark surfaces, larger type */
.vb-root {
  --vb-bg: #f5f7fa;
  --vb-panel: #ffffff;
  --vb-panel-2: #eef1f5;
  --vb-panel-3: #e4e9ef;
  --vb-border: #d7dde5;
  --vb-border-strong: #c6cfd9;
  --vb-text: #171a1f;
  --vb-text-2: #4b5563;
  --vb-text-3: #6b7280;
  --vb-blue: #2f6fed;
  --vb-green: #0f9d6e;
  --vb-amber: #b45309;
  --vb-purple: #6d4aff;
  --vb-red: #d14343;
  --vb-gray: #7b8490;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: var(--vb-bg);
  font-size: 14.5px;
  line-height: 1.7;
}
body[data-ds-dark-theme] .vb-root {
  --vb-bg: #14161a;
  --vb-panel: #262a31;
  --vb-panel-2: #1c1f25;
  --vb-panel-3: #2f343d;
  --vb-border: #3a404a;
  --vb-border-strong: #4a515c;
  --vb-text: #f2f4f8;
  --vb-text-2: #c4cbd4;
  --vb-text-3: #98a2ae;
  --vb-blue: #7aa7ff;
  --vb-green: #4ed19b;
  --vb-amber: #f2b45c;
  --vb-purple: #b49aff;
  --vb-red: #ff8a80;
  --vb-gray: #9aa3af;
}
.vb-scroll { flex: 1; min-height: 0; overflow: auto; }
.vb-content { width: 100%; max-width: 1680px; margin: 0 auto; padding: 28px 32px 64px; }
.vb-title { font-size: 21px; }
.vb-sub, .vb-read, .vb-health { font-size: 13.5px; }
.vb-tab { font-size: 14.5px; }
.vb-chip-num { font-size: 18px; }
.vb-chip-label { font-size: 13.5px; }
.vb-chip { background: var(--vb-panel); }
.vb-summary { gap: 10px; }
.vb-column { flex: 0 0 286px; min-width: 286px; background: var(--vb-panel-2); border-color: var(--vb-border); }
.vb-column-title, .vb-count { font-size: 13.5px; }
.vb-card { background: var(--vb-panel); border-color: var(--vb-border); box-shadow: 0 1px 2px rgba(0, 0, 0, .08); }
.vb-card:hover { border-color: var(--vb-blue); }
.vb-card-title { font-size: 15.5px; line-height: 1.5; }
.vb-card-next { font-size: 14px; line-height: 1.6; color: var(--vb-text-2); }
.vb-card-id { font-size: 12.5px; }
.vb-card-foot { font-size: 12.5px; }
.vb-badge { font-size: 12.5px; }
.vb-drawer-backdrop { position: absolute; inset: 0; z-index: 30; background: rgba(0, 0, 0, .38); }
.vb-drawer { width: min(660px, 100%); height: 100%; padding: 24px 30px 48px; background: var(--vb-panel); border-left: 1px solid var(--vb-border-strong); box-shadow: -12px 0 32px rgba(0, 0, 0, .22); }
.vb-drawer-head { position: sticky; top: 0; z-index: 2; margin: -4px 0 0; padding: 4px 0 14px; background: var(--vb-panel); border-bottom: 1px solid var(--vb-border); }
.vb-drawer-title { font-size: 19px; }
.vb-drawer-sub { font-size: 13.5px; }
.vb-field { border-top: 1px solid var(--vb-border); }
.vb-field-label { font-size: 12.5px; }
.vb-field-value { font-size: 15px; line-height: 1.7; }
.vb-meta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 22px; padding: 14px 0; border-bottom: 1px solid var(--vb-border); }
.vb-meta-item { min-width: 0; }
.vb-meta-value { margin-top: 2px; font-size: 14.5px; font-weight: 500; color: var(--vb-text); overflow-wrap: anywhere; }
.vb-code { font-size: 13.5px; line-height: 1.7; }
.vb-health-table { font-size: 13.5px; }
.vb-issue { font-size: 13.5px; }
.vb-note { font-size: 13.5px; }
.vb-empty { background: var(--vb-panel-2); border-color: var(--vb-border); }
.vb-error-message { font-size: 14px; }
.vb-link { background: var(--vb-panel-2); }

/* native redesign: DSH tokens, quiet surfaces, open lanes, floating sheet */
.vb-root, body[data-ds-dark-theme] .vb-root {
  --vb-hairline: var(--dsh-hairline-width, .5px);
  --vb-border: var(--dsw-alias-border-l1, rgba(127, 127, 127, .22));
  --vb-border-strong: var(--dsw-alias-border-l3, rgba(127, 127, 127, .38));
  --vb-text: var(--dsw-alias-label-primary, #1f2329);
  --vb-text-2: var(--dsw-alias-label-secondary, #646a73);
  --vb-text-3: var(--dsw-alias-label-tertiary, #8f959e);
  --vb-surface: var(--dsw-alias-bg-layer-1, #ffffff);
  --vb-surface-2: var(--dsw-alias-bg-layer-2, #f7f8fa);
  --vb-surface-3: var(--dsw-alias-bg-layer-3, #eef1f5);
  --vb-panel: var(--dsw-alias-bg-layer-1, #ffffff);
  --vb-panel-2: var(--dsw-alias-bg-layer-2, #f7f8fa);
  --vb-panel-3: var(--dsw-alias-bg-layer-3, #eef1f5);
  --vb-bg: var(--dsw-alias-bg-base, transparent);
  --vb-accent: var(--dsw-alias-state-business-primary, #3370ff);
  --vb-blue: var(--dsw-alias-state-business-primary, #3370ff);
  --vb-green: var(--dsw-alias-state-success-primary, #00a870);
  --vb-amber: var(--dsw-alias-state-warn-primary, #d97706);
  --vb-red: var(--dsw-alias-state-error-primary, #d54941);
  --vb-purple: var(--dsw-alias-state-done-primary, #7c3aed);
  --vb-gray: var(--dsw-alias-label-tertiary, #8a919f);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: var(--vb-bg);
  color: var(--vb-text);
  font-size: 14.5px;
  line-height: 1.7;
}
.vb-scroll { flex: 1; min-height: 0; overflow: auto; }
.vb-content { width: 100%; max-width: 1080px; margin: 0 auto; padding: 30px 36px 72px; }
.vb-header { align-items: center; }
.vb-title { font-size: 22px; font-weight: 600; letter-spacing: -.01em; }
.vb-sub { margin-top: 6px; color: var(--vb-text-3); font-size: 13px; gap: 7px; }
.vb-actions { gap: 14px; }
.vb-health { border: 0; padding: 0; background: transparent; color: var(--vb-text-3); font-size: 13px; gap: 7px; }
.vb-health::before { width: 6px; height: 6px; }
.vb-read { color: var(--vb-text-3); font-size: 13px; }
.vb-btn { border: var(--vb-hairline) solid var(--vb-border); background: transparent; color: var(--vb-text-2); border-radius: 8px; padding: 6px 12px; font-size: 13px; }
.vb-btn:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .08)); border-color: var(--vb-border-strong); color: var(--vb-text); }
.vb-btn-small { padding: 3px 9px; font-size: 12.5px; }
.vb-stats { display: flex; align-items: baseline; gap: 22px; flex-wrap: wrap; margin: 22px 0 26px; }
.vb-stat { color: var(--vb-text-3); font-size: 13px; }
.vb-stat b { color: var(--vb-text); font-size: 18px; font-weight: 600; margin-right: 6px; font-variant-numeric: tabular-nums; }
.vb-tabs { display: inline-flex; align-items: center; gap: 2px; padding: 3px; margin-bottom: 24px; border: var(--vb-hairline) solid var(--vb-border); border-radius: 10px; background: var(--vb-surface); }
.vb-tab { border: 0; background: transparent; color: var(--vb-text-3); border-radius: 7px; padding: 6px 14px; margin: 0; font-size: 13.5px; }
.vb-tab:hover { color: var(--vb-text); }
.vb-tab[aria-selected="true"] { background: var(--vb-surface-2); color: var(--vb-text); border: 0; font-weight: 500; box-shadow: 0 1px 2px rgba(0, 0, 0, .08); }
.vb-board-toolbar { margin: 0 2px 14px; align-items: baseline; }
.vb-board-toolbar .vb-muted { color: var(--vb-text-3); font-size: 13px; }
.vb-text-btn { border: 0; background: transparent; color: var(--vb-text-3); font-size: 12.5px; padding: 2px 4px; cursor: pointer; }
.vb-text-btn:hover { color: var(--vb-text); }
.vb-board { gap: 22px; padding: 0 0 12px; }
.vb-column { flex: 0 0 300px; min-width: 300px; padding: 0; border: 0; border-radius: 0; background: transparent; }
.vb-column-head { padding: 0 2px 12px; margin-bottom: 12px; border-bottom: var(--vb-hairline) solid var(--vb-border); }
.vb-column-title, .vb-count { font-size: 13.5px; }
.vb-count { color: var(--vb-text-3); }
.vb-column-body { gap: 12px; }
.vb-card { padding: 15px 16px; border: var(--vb-hairline) solid var(--vb-border); border-radius: 12px; background: var(--vb-surface); box-shadow: none; }
.vb-card:hover { border-color: var(--vb-border-strong); background: var(--vb-surface-2); }
.vb-card-top { align-items: baseline; }
.vb-card-id { font-size: 12px; color: var(--vb-text-3); }
.vb-card-date { font-size: 12px; color: var(--vb-text-3); font-variant-numeric: tabular-nums; }
.vb-card-title { margin: 8px 0 7px; font-size: 15.5px; line-height: 1.5; color: var(--vb-text); }
.vb-card-next { font-size: 13.5px; line-height: 1.6; color: var(--vb-text-2); }
.vb-card-foot { margin-top: 11px; color: var(--vb-text-3); font-size: 12px; gap: 0; }
.vb-empty { border: var(--vb-hairline) dashed var(--vb-border); background: transparent; color: var(--vb-text-3); }
.vb-drawer-backdrop { position: absolute; inset: 0; display: flex; justify-content: flex-end; padding: 16px; background: var(--dsw-alias-bg-overlay, rgba(0, 0, 0, .32)); }
.vb-drawer { width: min(620px, 100%); height: 100%; padding: 26px 30px 44px; background: var(--vb-surface-2); border: var(--vb-hairline) solid var(--vb-border); border-radius: 16px; box-shadow: var(--dsw-elevation-panel, 0 16px 48px rgba(0, 0, 0, .22)); }
.vb-drawer-head { position: sticky; top: 0; z-index: 2; margin: 0 0 4px; padding: 0 0 16px; background: var(--vb-surface-2); border-bottom: var(--vb-hairline) solid var(--vb-border); }
.vb-drawer-title { font-size: 19px; }
.vb-drawer-sub { margin-top: 5px; color: var(--vb-text-3); font-size: 12.5px; }
.vb-drawer-close { width: 30px; height: 30px; padding: 0; border-radius: 8px; color: var(--vb-text-3); font-size: 20px; }
.vb-drawer-close:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .08)); color: var(--vb-text); }
.vb-meta-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 24px; padding: 16px 0; border-bottom: var(--vb-hairline) solid var(--vb-border); }
.vb-meta-value { font-size: 14px; }
.vb-field { border-top: 0; padding: 14px 0 0; }
.vb-field + .vb-field { margin-top: 16px; padding-top: 16px; border-top: var(--vb-hairline) solid var(--vb-border); }
.vb-field-label { font-size: 12px; color: var(--vb-text-3); margin-bottom: 5px; }
.vb-field-value { font-size: 14.5px; line-height: 1.7; color: var(--vb-text); }
.vb-links { gap: 14px; }
.vb-link { border: 0; background: transparent; padding: 0; color: var(--vb-accent); font-size: 13px; text-decoration: underline; text-underline-offset: 2px; }
.vb-link:hover { color: var(--vb-accent); opacity: .8; }
.vb-actions-row { gap: 8px; margin-top: 14px; }
.vb-badge, .vb-status, .vb-executor { border: 0; background: transparent; padding: 0; color: var(--vb-text-3); font-size: 12.5px; }
.vb-badge-warn { color: var(--vb-amber); }
.vb-badge-danger { color: var(--vb-red); }
.vb-health-table { font-size: 13px; }
.vb-health-table th, .vb-health-table td { padding: 8px 10px; border-bottom: var(--vb-hairline) solid var(--vb-border); }
.vb-issue { border-bottom: var(--vb-hairline) solid var(--vb-border); }
.vb-section-title { font-size: 14px; margin: 22px 0 10px; }
.vb-code { background: var(--vb-surface); border: var(--vb-hairline) solid var(--vb-border); font-size: 13px; }
.vb-note { color: var(--vb-text-3); font-size: 13px; }
.vb-error { background: transparent; border: var(--vb-hairline) solid var(--vb-border); }
.vb-loading { color: var(--vb-text-3); }
.vb-filters { gap: 16px; }
.vb-filter { border: 0; background: transparent; color: var(--vb-text-3); padding: 2px 0; font-size: 13px; }
.vb-filter[aria-pressed="true"] { border: 0; background: transparent; color: var(--vb-text); font-weight: 600; }
.vb-handoff { background: var(--vb-surface); border: var(--vb-hairline) solid var(--vb-border); border-radius: 12px; padding: 16px 18px; }
.vb-decision { background: transparent; border: 0; border-bottom: var(--vb-hairline) solid var(--vb-border); border-radius: 0; padding: 0 2px; }
.vb-decision summary { padding: 13px 0; }
.vb-decision-body { padding: 0 0 14px 20px; }
.vb-entry { background: transparent; border: 0; border-bottom: var(--vb-hairline) solid var(--vb-border); border-radius: 0; padding: 0 2px; }
.vb-entry summary { padding: 12px 0; }

.vb-summary-line { margin: 18px 0 24px; color: var(--vb-text-2); font-size: 14px; }
.vb-progress { max-width: 1000px; }
.vb-group { margin: 0 0 26px; }
.vb-group-head { display: flex; align-items: center; gap: 8px; padding: 0 2px 10px; border-bottom: var(--vb-hairline) solid var(--vb-border); }
.vb-group-label { font-size: 13px; font-weight: 600; color: var(--vb-text-2); letter-spacing: .02em; }
.vb-group-count { margin-left: auto; color: var(--vb-text-3); font-size: 12.5px; font-variant-numeric: tabular-nums; }
.vb-row { position: relative; display: block; width: 100%; padding: 16px 30px 16px 2px; border: 0; border-bottom: var(--vb-hairline) solid var(--vb-border); background: transparent; color: inherit; text-align: left; cursor: pointer; }
.vb-row:hover { background: var(--vb-surface); }
.vb-row:last-child { border-bottom: 0; }
.vb-row-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.vb-row-id { font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace; font-size: 11.5px; color: var(--vb-text-3); }
.vb-row-meta { color: var(--vb-text-3); font-size: 12px; white-space: nowrap; }
.vb-row-title { margin: 5px 0 7px; font-size: 16px; font-weight: 600; line-height: 1.45; color: var(--vb-text); }
.vb-row-line { display: flex; align-items: flex-start; gap: 10px; margin-top: 5px; font-size: 13.5px; line-height: 1.65; color: var(--vb-text-2); }
.vb-row-label { flex: 0 0 38px; color: var(--vb-text-3); font-size: 12px; line-height: 1.8; }
.vb-row-text { flex: 1; min-width: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.vb-row-line-wait, .vb-row-line-wait .vb-row-label { color: var(--vb-amber); }
.vb-row-arrow { position: absolute; right: 4px; top: 16px; color: var(--vb-text-3); font-size: 18px; line-height: 1; }

/* settings-page pass: copy DSH settings section proportions and card material */
.vb-content { max-width: 720px; padding: 24px 24px 64px; }
.vb-title { font-size: 16px; font-weight: 500; line-height: 24px; letter-spacing: 0; }
.vb-sub { margin-top: 4px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 14px; line-height: 22px; gap: 6px; }
.vb-actions { gap: 8px; }
.vb-btn { height: 36px; padding: 0 14px; border: .5px solid var(--dsw-alias-border-l3, var(--vb-border)); border-radius: var(--dsw-radius-md, 8px); background: transparent; color: var(--dsw-alias-label-primary, var(--vb-text)); font-size: 14px; line-height: 22px; }
.vb-btn:hover { background: var(--dsw-alias-interactive-bg-hover-solid, var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, .08))); color: var(--dsw-alias-label-primary, var(--vb-text)); border-color: var(--dsw-alias-border-l3, var(--vb-border)); }
.vb-summary-line { margin: 8px 0 16px; color: var(--dsw-alias-label-secondary, var(--vb-text-2)); font-size: 14px; line-height: 22px; }
.vb-tabs { display: flex; gap: 24px; padding: 0; margin: 4px 0 20px; border: 0; border-bottom: .5px solid var(--dsw-alias-border-l1, var(--vb-border)); border-radius: 0; background: transparent; }
.vb-tab { position: relative; border: 0; border-radius: 0; background: transparent; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 14px; line-height: 22px; padding: 0 0 10px; margin: 0; }
.vb-tab:hover { color: var(--dsw-alias-label-primary, var(--vb-text)); }
.vb-tab[aria-selected="true"] { background: transparent; color: var(--dsw-alias-label-primary, var(--vb-text)); font-weight: 500; box-shadow: none; }
.vb-tab[aria-selected="true"]::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--dsw-alias-state-business-primary, var(--vb-accent)); border-radius: 2px; }
.vb-progress { max-width: none; }
.vb-group { display: flex; flex-direction: column; gap: 8px; margin: 0 0 24px; }
.vb-group-head { display: flex; align-items: center; gap: 8px; padding: 0; margin: 0 0 2px; border: 0; }
.vb-group-label { color: var(--dsw-alias-label-primary, var(--vb-text)); font-size: 14px; font-weight: 500; line-height: 22px; letter-spacing: 0; }
.vb-group-count { margin-left: 2px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 12px; line-height: 18px; }
.vb-row { display: flex; flex-direction: column; gap: 4px; width: 100%; padding: 12px 14px; border: .5px solid var(--dsw-alias-settings-card-stroke, var(--vb-border)); border-radius: var(--dsw-radius-xl, 12px); background: var(--dsw-alias-settings-card-fill, var(--vb-surface)); color: var(--dsw-alias-label-primary, var(--vb-text)); text-align: left; cursor: pointer; }
.vb-row:hover { border-color: var(--dsw-alias-border-l3, var(--vb-border-strong)); background: var(--dsw-alias-settings-card-fill, var(--vb-surface)); }
.vb-row:last-child { border-bottom: .5px solid var(--dsw-alias-settings-card-stroke, var(--vb-border)); }
.vb-row-head { display: flex; align-items: center; gap: 8px; padding: 0; border: 0; }
.vb-row-title { display: block; flex: 1; min-width: 0; margin: 0; color: var(--dsw-alias-label-primary, var(--vb-text)); font-size: 14px; font-weight: 500; line-height: 22px; -webkit-line-clamp: unset; overflow: visible; }
.vb-phase-tag { flex: none; border: .5px solid var(--dsw-alias-border-l3, var(--vb-border)); border-radius: var(--dsw-radius-xs, 4px); color: var(--dsw-alias-label-secondary, var(--vb-text-2)); padding: 1px 6px; font-size: 11px; line-height: 16px; font-weight: 400; }
.vb-row-arrow { position: static; flex: none; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 16px; line-height: 1; }
.vb-row-meta { color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 11px; line-height: 16px; margin: 0; }
.vb-row-line { display: flex; align-items: flex-start; gap: 8px; margin: 2px 0 0; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary, var(--vb-text-2)); }
.vb-row-label { flex: 0 0 36px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 12px; line-height: 20px; }
.vb-row-text { flex: 1; min-width: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.vb-row-line-wait, .vb-row-line-wait .vb-row-label { color: var(--dsw-alias-state-warn-label, var(--vb-amber)); }
.vb-empty { background: var(--dsw-alias-settings-card-fill, var(--vb-surface)); border: .5px solid var(--dsw-alias-settings-card-stroke, var(--vb-border)); border-radius: var(--dsw-radius-xl, 12px); padding: 24px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); text-align: center; }
.vb-drawer { width: min(560px, 100%); padding: 20px 22px 32px; background: var(--dsw-alias-settings-card-fill, var(--vb-surface)); border: .5px solid var(--dsw-alias-settings-card-stroke, var(--vb-border)); border-radius: var(--dsw-radius-xl, 12px); box-shadow: var(--dsw-elevation-panel, 0 16px 48px rgba(0, 0, 0, .22)); }
.vb-drawer-head { position: sticky; top: 0; z-index: 2; margin: 0 0 4px; padding: 0 0 12px; background: var(--dsw-alias-settings-card-fill, var(--vb-surface)); border-bottom: .5px solid var(--dsw-alias-border-l1, var(--vb-border)); }
.vb-drawer-title { font-size: 16px; font-weight: 500; line-height: 24px; color: var(--dsw-alias-label-primary, var(--vb-text)); }
.vb-drawer-sub { margin-top: 3px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 12px; line-height: 18px; }
.vb-meta-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 18px; padding: 12px 0; border-bottom: .5px solid var(--dsw-alias-border-l1, var(--vb-border)); }
.vb-meta-value { font-size: 14px; line-height: 22px; }
.vb-field { border-top: 0; padding: 12px 0 0; }
.vb-field + .vb-field { margin-top: 12px; padding-top: 12px; border-top: .5px solid var(--dsw-alias-border-l1, var(--vb-border)); }
.vb-field-label { font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); margin-bottom: 3px; }
.vb-field-value { font-size: 14px; line-height: 22px; color: var(--dsw-alias-label-primary, var(--vb-text)); }
.vb-link { font-size: 13px; }
.vb-btn-small { height: 28px; padding: 0 10px; border-radius: var(--dsw-radius-sm, 6px); font-size: 12px; line-height: 18px; }

/* detail modal: centered settings-style card with fixed head/foot */
.vb-drawer-backdrop { display: flex; align-items: center; justify-content: center; min-height: 0; padding: 24px; overflow: hidden; background: rgba(0, 0, 0, .45); }
.vb-drawer { display: flex; flex-direction: column; width: min(640px, 100%); max-height: 100%; height: auto; min-height: 0; padding: 0; overflow: hidden; }
.vb-drawer-head { display: flex; align-items: flex-start; gap: 12px; flex: none; position: static; margin: 0; padding: 20px 24px 14px; background: var(--dsw-alias-settings-card-fill, var(--vb-surface)); border-bottom: .5px solid var(--dsw-alias-border-l1, var(--vb-border)); }
.vb-drawer-head-text { flex: 1; min-width: 0; }
.vb-drawer-title { font-size: 18px; line-height: 26px; }
.vb-drawer-sub { font-size: 12px; line-height: 18px; }
.vb-drawer-body { flex: 1; min-height: 0; overflow: auto; overscroll-behavior: contain; padding: 18px 24px 20px; }
.vb-drawer-actions { display: flex; flex: none; flex-wrap: wrap; gap: 8px; padding: 12px 24px 16px; border-top: .5px solid var(--dsw-alias-border-l1, var(--vb-border)); }
.vb-detail-focus { border: .5px solid color-mix(in srgb, var(--dsw-alias-state-business-primary, #3370ff) 28%, var(--dsw-alias-border-l1, #e5e6eb)); background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #3370ff) 7%, transparent); border-radius: var(--dsw-radius-lg, 10px); padding: 12px 14px; margin-bottom: 10px; }
.vb-detail-focus-label { color: var(--dsw-alias-state-business-primary, #3370ff); font-size: 12px; line-height: 18px; margin-bottom: 3px; }
.vb-detail-focus-text { color: var(--dsw-alias-label-primary, var(--vb-text)); font-size: 14px; line-height: 22px; white-space: pre-wrap; overflow-wrap: anywhere; }
.vb-detail-wait { border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #d97706) 30%, var(--dsw-alias-border-l1, #e5e6eb)); background: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #d97706) 8%, transparent); }
.vb-detail-wait .vb-detail-focus-label { color: var(--dsw-alias-state-warn-label, #b45309); }
.vb-detail-meta { display: flex; flex-wrap: wrap; gap: 16px; margin: 2px 0 14px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 12px; line-height: 18px; }
.vb-drawer-body .vb-code { max-height: none; }

/* onboarding: shown when a workspace has no Task Pulse records yet */
.vb-onboarding { max-width: 640px; margin: 8px 0 0; padding: 20px 22px; border: .5px solid var(--dsw-alias-settings-card-stroke, var(--vb-border)); border-radius: var(--dsw-radius-xl, 12px); background: var(--dsw-alias-settings-card-fill, var(--vb-surface)); }
.vb-onboarding-title { font-size: 16px; font-weight: 500; line-height: 24px; color: var(--dsw-alias-label-primary, var(--vb-text)); }
.vb-onboarding-text { margin-top: 8px; color: var(--dsw-alias-label-secondary, var(--vb-text-2)); font-size: 14px; line-height: 22px; }
.vb-onboarding-files { margin: 12px 0; padding: 10px 14px 10px 30px; border-radius: 8px; background: var(--vb-surface-2); color: var(--dsw-alias-label-secondary, var(--vb-text-2)); font-size: 13px; line-height: 22px; }
.vb-onboarding-files .vb-mono { color: var(--dsw-alias-label-primary, var(--vb-text)); font-size: 12.5px; }
.vb-onboarding-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.vb-onboarding-note { margin-top: 12px; color: var(--dsw-alias-label-tertiary, var(--vb-text-3)); font-size: 12px; line-height: 18px; }
.vb-empty-hint { margin: 6px 0 12px; font-size: 12px; }

@media (max-width: 720px) {
  .vb-content { padding: 16px 16px 44px; }
  .vb-column { flex-basis: 240px; min-width: 240px; }
  .vb-drawer { width: 100%; }
  .vb-meta-grid { grid-template-columns: 1fr; }
  .vb-header { gap: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .vb-root *, .vb-root *::before, .vb-root *::after { animation: none !important; transition: none !important; }
}
`;

    function cx(...parts) {
      return parts.filter(Boolean).join(" ");
    }

    function fmtBytes(value) {
      if (!Number.isFinite(value)) return "—";
      if (value < 1024) return `${value} B`;
      if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KiB`;
      return `${(value / 1024 / 1024).toFixed(1)} MiB`;
    }

    function fmtTime(timestamp) {
      if (!timestamp) return "—";
      try {
        return new Date(timestamp).toLocaleTimeString("zh-CN", { hour12: false });
      } catch {
        return "—";
      }
    }

    function repoRoot(absolutePath) {
      if (!absolutePath) return "";
      return String(absolutePath).replace(/[\\/]docs[\\/]tasks[\\/][^\\/]+$/i, "");
    }

    function shortPath(value) {
      if (!value) return "当前会话工作区";
      const parts = String(value).replace(/\\/g, "/").split("/").filter(Boolean);
      return parts.slice(-2).join("/") || String(value);
    }

    function decodeBytes(value) {
      return new TextDecoder("utf-8", { fatal: true }).decode(value.data);
    }

    const PHASE_META = {
      "待办": { color: "var(--vb-gray)" },
      "进行中": { color: "var(--vb-blue)" },
      "待验证": { color: "var(--vb-amber)" },
      "待验收": { color: "var(--vb-purple)" },
      "暂缓": { color: "var(--vb-gray)" },
      "待核实": { color: "var(--vb-red)" },
      "未分类": { color: "var(--vb-amber)" }
    };

    const STATUS_META = {
      "生效": { color: "var(--vb-green)" },
      "提议": { color: "var(--vb-blue)" },
      "待核实": { color: "var(--vb-amber)" },
      "被取代": { color: "var(--vb-gray)" },
      "已废止": { color: "var(--vb-red)" }
    };

    function phaseColor(phase) {
      return (PHASE_META[phase] || PHASE_META["未分类"]).color;
    }

    function statusColor(status) {
      return (STATUS_META[status] || { color: "var(--vb-gray)" }).color;
    }

    function isBlocked(task) {
      const value = (task.blockers || "").trim();
      return value && !["无", "暂无", "无。", "暂无。"].includes(value);
    }

    async function copyText(value) {
      const text = String(value ?? "");
      if (!text) return false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch {
        // fall through to the textarea fallback
      }
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        return ok;
      } catch {
        return false;
      }
    }

    function CopyButton({ value, label = "复制", className = "vb-btn vb-btn-small" }) {
      const [copied, setCopied] = useState(false);
      const timer = useRef(0);
      useEffect(() => () => window.clearTimeout(timer.current), []);
      const onCopy = async () => {
        const ok = await copyText(value);
        if (!ok) return;
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 1500);
      };
      return h("button", { type: "button", className, onClick: onCopy }, copied ? "已复制" : label);
    }

    function useBoardData(sessionId, remote) {
      const [state, setState] = useState({ status: "loading", data: null, error: "", issues: [], missing: [], readAt: 0 });
      const [reloadKey, setReloadKey] = useState(0);
      const versionsRef = useRef({});

      useEffect(() => {
        const controller = new AbortController();
        let cancelled = false;
        let busy = false;
        let timer = 0;
        let generation = 0;

        const readBytes = async (file) => {
          try {
            const result = await remote.readBytes(sessionId, file, {}, controller.signal);
            if (result && result.ok) return result.value;
            return { __error: result && result.error ? result.error : { message: `读取失败：${file}` } };
          } catch (error) {
            if (controller.signal.aborted) return { __aborted: true };
            return {
              __error: {
                code: error && error.code ? error.code : "",
                message: String(error && error.message ? error.message : error)
              }
            };
          }
        };

        const statFile = async (file) => {
          try {
            const result = await remote.stat(sessionId, file, controller.signal);
            return result && result.ok ? result.value : null;
          } catch {
            return null;
          }
        };

        const check = async () => {
          if (cancelled || busy) return;
          if (document.visibilityState === "hidden") {
            timer = window.setTimeout(check, 5000);
            return;
          }
          const files = [
            ["board", "docs/tasks/BOARD.md"],
            ["decisions", "docs/tasks/DECISIONS.md"],
            ["progress", "docs/tasks/progress.md"],
            ["plan", "docs/tasks/task_plan.md"],
            ["findings", "docs/tasks/findings.md"],
            ["archive", "docs/tasks/ARCHIVE_INDEX.md"]
          ];
          const results = await Promise.all(files.map(async ([key, file]) => [key, await statFile(file)]));
          if (cancelled) return;
          const changed = results.some(([key, value]) => (value && value.version ? value.version : "") !== (versionsRef.current[key] || ""));
          if (changed) setReloadKey((value) => value + 1);
          else timer = window.setTimeout(check, 5000);
        };

        const load = async (silent) => {
          if (cancelled || busy) return;
          busy = true;
          const gen = ++generation;
          if (!silent) {
            setState((previous) => ({
              ...previous,
              status: previous.data ? previous.status : "loading",
              error: ""
            }));
          }
          const issues = [];
          try {
            const [boardValue, decisionsValue, progressValue, planValue, findingsValue, archiveValue] = await Promise.all([
              readBytes("docs/tasks/BOARD.md"),
              readBytes("docs/tasks/DECISIONS.md"),
              readBytes("docs/tasks/progress.md"),
              statFile("docs/tasks/task_plan.md"),
              statFile("docs/tasks/findings.md"),
              statFile("docs/tasks/ARCHIVE_INDEX.md")
            ]);
            if (cancelled || gen !== generation) return;

            const text = { board: "", decisions: "", progress: "" };
            const sources = [
              ["board", boardValue, "BOARD.md"],
              ["decisions", decisionsValue, "DECISIONS.md"],
              ["progress", progressValue, "progress.md"]
            ];
            const missing = [];
            for (const [key, value, name] of sources) {
              if (value && !value.__aborted && !value.__error) {
                try {
                  text[key] = decodeBytes(value);
                } catch {
                  issues.push({ file: name, line: 0, severity: "error", message: "不是有效的 UTF-8 文本" });
                }
              } else if (value && value.__error && !value.__aborted) {
                const error = value.__error;
                const description = `${error.code || ""} ${error.message || ""}`;
                if (error.code === "workspace-file/not-found" || description.includes("workspace-file/not-found")) {
                  missing.push({ key, name, path: `docs/tasks/${name}` });
                } else {
                  issues.push({
                    file: name,
                    line: 0,
                    severity: "error",
                    message: `${error.code || "read-failed"}：${error.message || ""}`.trim()
                  });
                }
              }
            }
            const noCoreFiles = missing.length === sources.length;
            if (!noCoreFiles) {
              for (const item of missing) {
                issues.push({ file: item.name, line: 0, severity: "warning", message: "文件不存在，已跳过" });
              }
            }

            const board = text.board ? parseBoard(text.board) : { tasks: [], issues: [] };
            const decisions = text.decisions ? parseDecisions(text.decisions) : { decisions: [], issues: [] };
            const progress = text.progress ? parseProgress(text.progress) : { entries: [], handoff: null };
            const allIssues = [...issues, ...board.issues, ...decisions.issues];
            const health = computeHealth({
              boardText: text.board,
              decisionsText: text.decisions,
              progressText: text.progress,
              taskPlan: planValue,
              findings: findingsValue,
              archiveIndex: archiveValue,
              issues: allIssues,
              tasks: board.tasks,
              decisions: decisions.decisions,
              entries: progress.entries
            });
            const absolute = [boardValue, decisionsValue, progressValue]
              .map((value) => (value && value.absolutePath ? value.absolutePath : ""))
              .find(Boolean) || "";
            versionsRef.current = {
              board: boardValue && boardValue.version ? boardValue.version : "",
              decisions: decisionsValue && decisionsValue.version ? decisionsValue.version : "",
              progress: progressValue && progressValue.version ? progressValue.version : "",
              plan: planValue && planValue.version ? planValue.version : "",
              findings: findingsValue && findingsValue.version ? findingsValue.version : "",
              archive: archiveValue && archiveValue.version ? archiveValue.version : ""
            };
            const hasData = board.tasks.length > 0
              || decisions.decisions.length > 0
              || progress.entries.length > 0;
            const readFailed = issues.some((issue) => issue.severity === "error");
            const status = hasData ? "ready" : noCoreFiles ? "uninitialized" : readFailed ? "error" : "empty";
            setState({
              status,
              data: {
                tasks: board.tasks,
                decisions: decisions.decisions,
                entries: progress.entries,
                handoff: progress.handoff,
                health,
                workspacePath: repoRoot(absolute)
              },
              error: status === "error" ? "读取任务记录失败，请检查 docs/tasks 下的文件。" : "",
              issues: allIssues,
              missing: missing.map((item) => item.path),
              readAt: Date.now()
            });
          } catch (error) {
            if (!cancelled && gen === generation) {
              setState((previous) => ({
                ...previous,
                status: previous.data ? "partial" : "error",
                error: String(error && error.message ? error.message : error)
              }));
            }
          } finally {
            busy = false;
            if (!cancelled) {
              window.clearTimeout(timer);
              timer = window.setTimeout(check, 5000);
            }
          }
        };

        void load(false);
        return () => {
          cancelled = true;
          controller.abort();
          window.clearTimeout(timer);
        };
      }, [sessionId, remote, reloadKey]);

      return { state, refresh: () => setReloadKey((value) => value + 1) };
    }

    function Header({ data, onRefresh, onPrompt }) {
      const latest = data && data.health ? data.health.latestUpdate : "";
      return h("div", { className: "vb-header" },
        h("div", null,
          h("div", { className: "vb-title" }, "任务进度"),
          h("div", { className: "vb-sub" },
            h("span", { title: data && data.workspacePath ? data.workspacePath : "" }, "只读"),
            latest ? h("span", { className: "vb-muted" }, "·") : null,
            latest ? h("span", { className: "vb-muted" }, `更新 ${latest}`) : null
          )
        ),
        h("div", { className: "vb-actions" },
          h("button", { type: "button", className: "vb-btn", onClick: onPrompt }, "规范"),
          h("button", { type: "button", className: "vb-btn", onClick: onRefresh }, "刷新")
        )
      );
    }

    function Summary({ data }) {
      const health = data.health;
      const doing = health.phaseCounts["进行中"] || 0;
      const waiting = (health.phaseCounts["待验证"] || 0) + (health.phaseCounts["待验收"] || 0);
      const todo = (health.phaseCounts["待办"] || 0) + (health.phaseCounts["待核实"] || 0);
      const paused = health.phaseCounts["暂缓"] || 0;
      const parts = [`${health.taskCount} 个任务`];
      if (doing) parts.push(`${doing} 个进行中`);
      if (waiting) parts.push(`${waiting} 个待你确认`);
      if (todo) parts.push(`${todo} 个待办`);
      if (paused) parts.push(`${paused} 个暂缓`);
      return h("div", { className: "vb-summary-line" }, parts.join(" · "));
    }

    function Tabs({ tab, onChange }) {
      const items = [
        ["board", "任务"],
        ["decisions", "决定"],
        ["activity", "动态"],
        ["health", "健康"]
      ];
      return h("div", { className: "vb-tabs", role: "tablist" },
        items.map(([id, label]) => h("button", {
          key: id,
          type: "button",
          role: "tab",
          id: `vb-tab-${id}`,
          "aria-selected": tab === id,
          "aria-controls": `vb-panel-${id}`,
          className: "vb-tab",
          onClick: () => onChange(id)
        }, label))
      );
    }

    const PROGRESS_GROUPS = [
      { id: "doing", label: "现在在做", phases: ["进行中"], color: "var(--vb-accent)" },
      { id: "waiting", label: "等你确认", phases: ["待验证", "待验收"], color: "var(--vb-amber)" },
      { id: "todo", label: "接下来", phases: ["待办"], color: "var(--vb-text-3)" },
      { id: "paused", label: "暂缓", phases: ["暂缓"], color: "var(--vb-text-3)" },
      { id: "check", label: "待核实", phases: ["待核实"], color: "var(--vb-red)" }
    ];

    function InlineText({ text }) {
      const value = String(text ?? "");
      if (!value.includes("`")) return value;
      const parts = value.split(/(`[^`\n]+`)/g);
      return h(React.Fragment, null, parts.map((part, index) => {
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return h("code", { key: index, className: "vb-inline-code" }, part.slice(1, -1));
        }
        return h("span", { key: index }, part);
      }));
    }

    function TaskRow({ task, onOpen }) {
      return h("button", {
        type: "button",
        className: "vb-row",
        onClick: () => onOpen(task),
        "aria-label": `${task.id} ${task.title}，${task.phase || "未分类"}`
      },
      h("div", { className: "vb-row-head" },
        h("span", { className: "vb-row-title" }, h(InlineText, { text: task.title })),
        h("span", { className: "vb-phase-tag" }, task.phase || "未分类"),
        h("span", { className: "vb-row-arrow" }, "›")
      ),
      h("div", { className: "vb-row-meta" }, `${task.id} · ${task.updatedAt || "无日期"}`),
      task.next ? h("div", { className: "vb-row-line" },
        h("span", { className: "vb-row-label" }, "下一步"),
        h("span", { className: "vb-row-text" }, h(InlineText, { text: task.next }))
      ) : null,
      isBlocked(task) ? h("div", { className: "vb-row-line vb-row-line-wait" },
        h("span", { className: "vb-row-label" }, "等待"),
        h("span", { className: "vb-row-text" }, h(InlineText, { text: task.blockers }))
      ) : null);
    }

    function BoardView({ data, onOpen, onOpenPrompt }) {
      const groups = PROGRESS_GROUPS
        .map((group) => ({ ...group, tasks: data.tasks.filter((task) => group.phases.includes(task.phase)) }))
        .filter((group) => group.tasks.length > 0);
      const other = data.tasks.filter((task) => !PHASES.includes(task.phase));
      if (other.length) groups.push({ id: "other", label: "未分类", color: "var(--vb-amber)", tasks: other });
      if (!data.tasks.length) {
        return h("div", { role: "tabpanel", id: "vb-panel-board", "aria-labelledby": "vb-tab-board", className: "vb-grow" },
          h("div", { className: "vb-empty" },
            h("div", null, "当前看板没有任务。"),
            h("div", { className: "vb-empty-hint" }, "如果这个工作区还没有 docs/tasks/ 记录，可以复制配套提示词让 Agent 建立。"),
            h("button", { type: "button", className: "vb-btn vb-btn-small", onClick: onOpenPrompt }, "查看接入规范")
          )
        );
      }
      return h("div", { role: "tabpanel", id: "vb-panel-board", "aria-labelledby": "vb-tab-board", className: "vb-grow" },
        h("div", { className: "vb-progress" },
          groups.map((group) => h("section", { key: group.id, className: "vb-group" },
            h("div", { className: "vb-group-head" },
              h("span", { className: "vb-dot", style: { background: group.color } }),
              h("span", { className: "vb-group-label" }, group.label),
              h("span", { className: "vb-group-count" }, String(group.tasks.length))
            ),
            group.tasks.map((task) => h(TaskRow, { key: `${task.id}-${task.line}`, task, onOpen }))
          ))
        )
      );
    }

    function Field({ label, children }) {
      const value = typeof children === "string" ? h(InlineText, { text: children }) : children;
      return h("div", { className: "vb-field" },
        h("div", { className: "vb-field-label" }, label),
        h("div", { className: "vb-field-value" }, value || "—")
      );
    }

    function LinkChips({ links, onEvidence }) {
      if (!links || links.length === 0) return null;
      return h("div", { className: "vb-links" },
        links.map((link, index) => h("button", {
          key: `${link.href}-${index}`,
          type: "button",
          className: "vb-link",
          title: link.href,
          onClick: () => onEvidence(link)
        }, link.label))
      );
    }

    function TaskDetail({ task, onClose, onEvidence }) {
      const closeRef = useRef(null);
      useEffect(() => {
        const onKey = (event) => {
          if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        if (closeRef.current) closeRef.current.focus();
        return () => window.removeEventListener("keydown", onKey);
      }, [onClose]);
      const meta = [
        task.startDate ? `开始 ${task.startDate}` : "",
        task.endDate ? `结束 ${task.endDate}` : "",
        task.updatedAt ? `更新 ${task.updatedAt}${task.updatedBy ? ` ${task.updatedBy}` : ""}` : ""
      ].filter(Boolean).join(" · ");
      return h("div", { className: "vb-drawer-backdrop", onClick: onClose },
        h("aside", {
          className: "vb-drawer",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": `${task.id} ${task.title}`,
          onClick: (event) => event.stopPropagation()
        },
        h("div", { className: "vb-drawer-head" },
          h("div", { className: "vb-drawer-head-text" },
            h("div", { className: "vb-drawer-title" }, h(InlineText, { text: task.title })),
            h("div", { className: "vb-drawer-sub" }, `${task.id} · ${task.phase || "未分类"}`)
          ),
          h("button", { ref: closeRef, type: "button", className: "vb-drawer-close", onClick: onClose, "aria-label": "关闭" }, "×")
        ),
        h("div", { className: "vb-drawer-body" },
          task.next ? h("div", { className: "vb-detail-focus" },
            h("div", { className: "vb-detail-focus-label" }, "下一步"),
            h("div", { className: "vb-detail-focus-text" }, h(InlineText, { text: task.next }))
          ) : null,
          isBlocked(task) ? h("div", { className: "vb-detail-focus vb-detail-wait" },
            h("div", { className: "vb-detail-focus-label" }, "等待"),
            h("div", { className: "vb-detail-focus-text" }, h(InlineText, { text: task.blockers }))
          ) : null,
          meta ? h("div", { className: "vb-detail-meta" }, meta) : null,
          h(Field, { label: "目标与完成条件" }, task.goal),
          h(Field, { label: "已确认范围" }, task.scope),
          h(Field, { label: "最近完成点" }, task.latest),
          h("div", { className: "vb-field" },
            h("div", { className: "vb-field-label" }, "证据"),
            h(LinkChips, { links: task.evidence, onEvidence }),
            task.evidence.length === 0 ? h("div", { className: "vb-muted" }, "—") : null
          )
        ),
        h("div", { className: "vb-drawer-actions" },
          h(CopyButton, { value: task.raw, label: "复制任务块" }),
          h(CopyButton, { value: task.next, label: "复制下一步" }),
          h(CopyButton, { value: task.id, label: "复制 ID" })
        )
      ));
    }

    function DecisionsView({ data, onEvidence }) {
      const [filter, setFilter] = useState("全部");
      const statuses = ["全部"].concat(DECISION_STATUSES);
      const list = data.decisions.filter((item) => filter === "全部" || item.status === filter);
      return h("div", { role: "tabpanel", id: "vb-panel-decisions", "aria-labelledby": "vb-tab-decisions" },
        h("div", { className: "vb-filters" },
          statuses.map((status) => h("button", {
            key: status,
            type: "button",
            className: "vb-filter",
            "aria-pressed": filter === status,
            onClick: () => setFilter(status)
          }, status))
        ),
        list.length ? h("div", { className: "vb-decisions" },
          list.map((item) => h("details", { key: item.id, className: "vb-decision" },
            h("summary", null,
              h("span", { className: "vb-dot", style: { background: statusColor(item.status) } }),
              h("span", { className: "vb-decision-id" }, item.id),
              h("span", { className: "vb-decision-title" }, h(InlineText, { text: item.title })),
              h("span", { className: "vb-status" }, item.status || "未知")
            ),
            h("div", { className: "vb-decision-body" },
              h(Field, { label: "决定与范围" }, item.scope),
              h(Field, { label: "理由与替代方案" }, item.reason),
              h("div", { className: "vb-field" },
                h("div", { className: "vb-field-label" }, "确认依据"),
                h(LinkChips, { links: item.confirmation, onEvidence }),
                item.confirmation.length === 0 ? h("div", { className: "vb-muted" }, "—") : null
              ),
              h("div", { className: "vb-field" },
                h("div", { className: "vb-field-label" }, "关联规则"),
                h(LinkChips, { links: item.related, onEvidence }),
                item.related.length === 0 ? h("div", { className: "vb-muted" }, "—") : null
              ),
              h(Field, { label: "取代关系" }, item.replacement.length ? item.replacement.join("、") : item.replacementText)
            )
          ))
        ) : h("div", { className: "vb-empty" }, "没有符合筛选的决定。")
      );
    }

    function HandoffCard({ handoff }) {
      if (!handoff) return null;
      const fields = handoff.handoff || {};
      const labels = ["范围", "已完成", "未完成 / 下一步", "决定", "风险 / 未验证", "接手入口", "工作区状态"];
      return h("div", { className: "vb-handoff" },
        h("div", { className: "vb-handoff-title" },
          h("span", null, "最新交接"),
          h("span", { className: "vb-badge vb-badge-muted" }, handoff.date || "无日期"),
          handoff.executor ? h("span", { className: "vb-executor" }, handoff.executor) : null
        ),
        h("div", { className: "vb-handoff-grid" },
          labels.map((label) => fields[label] ? h("div", { key: label },
            h("div", { className: "vb-field-label" }, label),
            h("div", { className: "vb-field-value" }, h(InlineText, { text: fields[label] }))
          ) : null)
        )
      );
    }

    function ActivityView({ data }) {
      const [executor, setExecutor] = useState("全部");
      const executors = ["全部"].concat(Array.from(new Set(data.entries.map((item) => item.executor).filter(Boolean))));
      const list = data.entries.filter((item) => executor === "全部" || item.executor === executor);
      return h("div", { role: "tabpanel", id: "vb-panel-activity", "aria-labelledby": "vb-tab-activity" },
        h(HandoffCard, { handoff: data.handoff }),
        h("div", { className: "vb-filters" },
          executors.map((name) => h("button", {
            key: name,
            type: "button",
            className: "vb-filter",
            "aria-pressed": executor === name,
            onClick: () => setExecutor(name)
          }, name))
        ),
        list.length ? h("div", { className: "vb-activity" },
          list.slice(0, 30).map((entry) => h("details", { key: `${entry.line}-${entry.title}`, className: "vb-entry" },
            h("summary", null,
              h("span", { className: "vb-entry-date" }, entry.date || "无日期"),
              entry.executor ? h("span", { className: "vb-executor" }, entry.executor) : null,
              h("span", { className: "vb-entry-title" }, entry.title)
            ),
            h("div", { className: "vb-entry-body" },
              entry.bullets.length ? entry.bullets.map((bullet, index) => h("div", { key: index, className: "vb-bullet" },
                bullet.label ? h("span", { className: "vb-bullet-label" }, `${bullet.label}：`) : null,
                h("span", null, h(InlineText, { text: bullet.text }))
              )) : h("div", { className: "vb-muted" }, "（无列表内容）"),
              h("div", { className: "vb-actions-row" },
                h(CopyButton, { value: entry.raw, label: "复制这一段" })
              )
            )
          ))
        ) : h("div", { className: "vb-empty" }, "没有进度记录。")
      );
    }

    function healthStatus(file) {
      if (file.bytes === null || file.bytes === undefined) return { label: "未读取", tone: "muted" };
      if (file.over && file.bytes > file.over) return { label: "超限", tone: "danger" };
      if (file.warn && file.bytes > file.warn) return { label: "告警", tone: "warn" };
      if (file.target && file.bytes > file.target) return { label: "超目标", tone: "warn" };
      return { label: "正常", tone: "ok" };
    }

    function HealthView({ data, state, onOpenPrompt }) {
      const health = data.health;
      return h("div", { role: "tabpanel", id: "vb-panel-health", "aria-labelledby": "vb-tab-health" },
        h("div", { className: "vb-note" },
          "这里只做展示；结构、链接和锚点以 docs/tasks/ 下的 Markdown 为准。"
        ),
        h("table", { className: "vb-health-table" },
          h("thead", null, h("tr", null,
            h("th", null, "文件"), h("th", null, "大小"), h("th", null, "阈值"), h("th", null, "状态")
          )),
          h("tbody", null,
            health.files.map((file) => {
              const status = healthStatus(file);
              const limit = file.warn ? `${fmtBytes(file.target)} / ${fmtBytes(file.warn)}` : "不解析";
              return h("tr", { key: file.name },
                h("td", { className: "vb-mono" }, file.name),
                h("td", null, fmtBytes(file.bytes)),
                h("td", { className: "vb-muted" }, limit),
                h("td", null, h("span", { className: cx("vb-badge", status.tone === "danger" ? "vb-badge-danger" : status.tone === "warn" ? "vb-badge-warn" : "vb-badge-muted") }, status.label))
              );
            })
          )
        ),
        health.stale.length ? h("div", null,
          h("div", { className: "vb-section-title" }, "超过 7 天未更新"),
          health.stale.map((item) => h("div", { key: item.id, className: "vb-issue" },
            h("span", { className: "vb-badge vb-badge-warn" }, `${item.days} 天`),
            h("span", { className: "vb-issue-msg" }, `${item.id} ${item.title}`),
            h("span", { className: "vb-issue-file" }, item.updatedAt)
          ))
        ) : null,
        h("div", { className: "vb-section-title" }, `解析提示（${health.issues.length}）`),
        health.issues.length ? h("div", null,
          health.issues.slice(0, 80).map((issue, index) => h("div", { key: `${issue.file}-${issue.line}-${index}`, className: "vb-issue" },
            h("span", { className: cx("vb-badge", issue.severity === "error" ? "vb-badge-danger" : "vb-badge-warn") }, issue.severity === "error" ? "错误" : "提示"),
            h("span", { className: "vb-issue-file" }, `${issue.file}${issue.line ? `:${issue.line}` : ""}`),
            h("span", { className: "vb-issue-msg" }, issue.message)
          ))
        ) : h("div", { className: "vb-muted" }, "没有解析提示。"),
        h("div", { className: "vb-section-title" }, "记录规范与提示词"),
        h("div", { className: "vb-note" }, "新项目接入、换 Agent 接手或记录格式对不上时，把配套提示词发给 Agent 即可。"),
        h("div", { className: "vb-actions-row" },
          h("button", { type: "button", className: "vb-btn vb-btn-small", onClick: onOpenPrompt }, "查看完整规范"),
          h(CopyButton, { value: TASK_RECORDS_PROMPT, label: "复制提示词" })
        ),
        state.error ? h("div", { className: "vb-banner" }, state.error) : null
      );
    }

    function EvidenceDrawer({ evidence, sessionId, remote, onClose }) {
      const [state, setState] = useState({ status: "loading", title: evidence.label, text: "" });
      const closeRef = useRef(null);
      useEffect(() => {
        const controller = new AbortController();
        const target = evidence.target;
        const run = async () => {
          if (!target) {
            setState({ status: "ready", title: evidence.label, text: "无法解析这个链接。" });
            return;
          }
          if (target.kind === "external") {
            setState({ status: "ready", title: evidence.label, text: target.href });
            return;
          }
          if (target.kind === "invalid") {
            setState({ status: "ready", title: evidence.label, text: `不读取：${target.reason}` });
            return;
          }
          const path = target.path;
          if (!path) {
            setState({ status: "ready", title: evidence.label, text: "这个链接没有可读取的文件路径。" });
            return;
          }
          try {
            const result = await remote.readBytes(sessionId, path, {}, controller.signal);
            if (!result || !result.ok) {
              const error = result && result.error ? result.error : {};
              throw new Error(`${error.code || "read-failed"}：${error.message || path}`);
            }
            const text = decodeBytes(result.value);
            const section = target.anchor ? extractSection(text, target.anchor) : null;
            setState({
              status: "ready",
              title: section ? section.heading : path,
              text: section ? section.text : target.anchor ? `未找到锚点：${target.anchor}` : text.slice(0, 20000)
            });
          } catch (error) {
            if (!controller.signal.aborted) {
              setState({ status: "error", title: evidence.label, text: String(error && error.message ? error.message : error) });
            }
          }
        };
        void run();
        const onKey = (event) => {
          if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        if (closeRef.current) closeRef.current.focus();
        return () => {
          controller.abort();
          window.removeEventListener("keydown", onKey);
        };
      }, [evidence, sessionId, remote, onClose]);

      return h("div", { className: "vb-drawer-backdrop", onClick: onClose },
        h("aside", {
          className: "vb-drawer",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": state.title,
          onClick: (event) => event.stopPropagation()
        },
        h("div", { className: "vb-drawer-head" },
          h("div", { className: "vb-drawer-head-text" },
            h("div", { className: "vb-drawer-title" }, state.title),
            h("div", { className: "vb-drawer-sub" }, evidence.href)
          ),
          h("button", { ref: closeRef, type: "button", className: "vb-drawer-close", onClick: onClose, "aria-label": "关闭" }, "×")
        ),
        h("div", { className: "vb-drawer-body" },
          state.status === "loading"
            ? h("div", { className: "vb-loading" }, h("span", { className: "vb-spinner" }), "正在读取…")
            : h("pre", { className: "vb-code" }, state.text || "（空）")
        ),
        h("div", { className: "vb-drawer-actions" },
          h(CopyButton, { value: state.text, label: "复制内容" })
        )
      ));
    }

    function Loading({ text }) {
      return h("div", { className: "vb-loading" }, h("span", { className: "vb-spinner" }), text);
    }

    function ErrorState({ message, onRetry }) {
      return h("div", { className: "vb-error" },
        h("div", { className: "vb-error-title" }, "看板读取失败"),
        h("div", { className: "vb-error-message" }, message || "未知错误"),
        h("button", { type: "button", className: "vb-btn vb-btn-primary", onClick: onRetry }, "重试")
      );
    }

    function Onboarding({ missing, onOpenPrompt }) {
      const files = Array.isArray(missing) && missing.length
        ? missing
        : ["docs/tasks/BOARD.md", "docs/tasks/DECISIONS.md", "docs/tasks/progress.md"];
      return h("div", { className: "vb-onboarding" },
        h("div", { className: "vb-onboarding-title" }, "这个工作区还没有任务记录"),
        h("div", { className: "vb-onboarding-text" }, "Task Pulse 只读取 docs/tasks/ 下的三份 Markdown；当前工作区缺少："),
        h("ul", { className: "vb-onboarding-files" },
          files.map((file) => h("li", { key: file }, h("span", { className: "vb-mono" }, file)))
        ),
        h("div", { className: "vb-onboarding-text" }, "把配套提示词发给 Agent，它会先读项目，再按固定格式建立记录；完成后回到这里点“刷新”。"),
        h("div", { className: "vb-onboarding-actions" },
          h(CopyButton, { value: TASK_RECORDS_PROMPT, label: "复制初始化提示词", className: "vb-btn vb-btn-primary" }),
          h("button", { type: "button", className: "vb-btn", onClick: onOpenPrompt }, "查看完整规范")
        ),
        h("div", { className: "vb-onboarding-note" }, "插件不会写文件；初始化由 Agent 在你确认后完成。")
      );
    }

    function EmptyRecords({ state, onOpenPrompt }) {
      const errors = state.issues.filter((issue) => issue.severity === "error");
      return h("div", { className: "vb-onboarding" },
        h("div", { className: "vb-onboarding-title" }, "没有解析到任务或决定"),
        h("div", { className: "vb-onboarding-text" }, "docs/tasks/ 下的文件存在，但内容还不符合页签格式，或者记录还是空的。可以先对照规范补字段，再点“刷新”。"),
        errors.length ? h("div", { className: "vb-banner" },
          errors.slice(0, 3).map((issue) => `${issue.file}${issue.line ? `:${issue.line}` : ""} ${issue.message}`).join("；")
        ) : null,
        h("div", { className: "vb-onboarding-actions" },
          h("button", { type: "button", className: "vb-btn vb-btn-primary", onClick: onOpenPrompt }, "查看格式规范"),
          h(CopyButton, { value: TASK_RECORDS_PROMPT, label: "复制提示词" })
        ),
        h("div", { className: "vb-onboarding-note" }, "解析提示可以在“健康”页签查看。")
      );
    }

    function PromptModal({ onClose }) {
      const closeRef = useRef(null);
      useEffect(() => {
        const onKey = (event) => {
          if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        if (closeRef.current) closeRef.current.focus();
        return () => window.removeEventListener("keydown", onKey);
      }, [onClose]);
      return h("div", { className: "vb-drawer-backdrop", onClick: onClose },
        h("aside", {
          className: "vb-drawer",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "任务记录规范",
          onClick: (event) => event.stopPropagation()
        },
        h("div", { className: "vb-drawer-head" },
          h("div", { className: "vb-drawer-head-text" },
            h("div", { className: "vb-drawer-title" }, "任务记录规范"),
            h("div", { className: "vb-drawer-sub" }, "复制给 Agent，或放进项目的 AGENTS.md / CLAUDE.md")
          ),
          h("button", { ref: closeRef, type: "button", className: "vb-drawer-close", onClick: onClose, "aria-label": "关闭" }, "×")
        ),
        h("div", { className: "vb-drawer-body" },
          h("pre", { className: "vb-code" }, TASK_RECORDS_PROMPT)
        ),
        h("div", { className: "vb-drawer-actions" },
          h(CopyButton, { value: TASK_RECORDS_PROMPT, label: "复制提示词" })
        )
      ));
    }

    function BoardPage(props) {
      const { sessionId, remote } = props;
      const { state, refresh } = useBoardData(sessionId, remote);
      const [tab, setTab] = useState("board");
      const [task, setTask] = useState(null);
      const [evidence, setEvidence] = useState(null);
      const [promptOpen, setPromptOpen] = useState(false);

      if (state.status === "loading" && !state.data) {
        return h("div", { className: "vb-root" },
          h("div", { className: "vb-content" }, h(Loading, { text: "正在读取 docs/tasks…" }))
        );
      }
      if (state.status === "error" && !state.data) {
        return h("div", { className: "vb-root" },
          h("div", { className: "vb-content" }, h(ErrorState, { message: state.error, onRetry: refresh }))
        );
      }

      const data = state.data;
      const errorIssues = state.issues.filter((issue) => issue.severity === "error");
      const uninitialized = state.status === "uninitialized";
      const emptyRecords = state.status === "empty";
      const openPrompt = () => setPromptOpen(true);
      return h("div", { className: "vb-root" },
        h("div", { className: "vb-scroll" },
          h("div", { className: "vb-content" },
            h(Header, { data, onRefresh: refresh, onPrompt: openPrompt }),
            uninitialized
              ? h(Onboarding, { missing: state.missing, onOpenPrompt: openPrompt })
              : emptyRecords
                ? h(EmptyRecords, { state, onOpenPrompt: openPrompt })
                : h(React.Fragment, null,
                  data ? h(Summary, { data }) : null,
                  data ? h(Tabs, { tab, onChange: setTab }) : null,
                  errorIssues.length ? h("div", { className: "vb-banner" },
                    `解析/读取提示：${errorIssues.slice(0, 3).map((issue) => `${issue.file}${issue.line ? `:${issue.line}` : ""} ${issue.message}`).join("；")}`
                  ) : null,
                  data && tab === "board" ? h(BoardView, { data, onOpen: setTask, onOpenPrompt: openPrompt }) : null,
                  data && tab === "decisions" ? h(DecisionsView, { data, onEvidence: setEvidence }) : null,
                  data && tab === "activity" ? h(ActivityView, { data }) : null,
                  data && tab === "health" ? h(HealthView, { data, state, onOpenPrompt: openPrompt }) : null
                )
          )
        ),
        task ? h(TaskDetail, { task, onClose: () => setTask(null), onEvidence: setEvidence }) : null,
        evidence ? h(EvidenceDrawer, { evidence, sessionId, remote, onClose: () => setEvidence(null) }) : null,
        promptOpen ? h(PromptModal, { onClose: () => setPromptOpen(false) }) : null
      );
    }

    function apply(ctx) {
      const remote = ctx.remote.workspaceFiles;
      const style = document.createElement("style");
      style.dataset.plugin = "dsh-task-pulse";
      style.textContent = CSS;
      document.head.appendChild(style);
      ctx.effect(() => () => style.remove(), "dsh-task-pulse: styles");
      ctx.slots.inject("conversation.view", () => ctx.slots.register({
        name: "conversation.view",
        id: "dsh-task-pulse",
        order: 50,
        label: () => "进度",
        inject: (sessionId) => ({ sessionId, remote })
      }, BoardPage));
    }

    exports.apply = apply;
    exports.inject = ["slots", "remote", "remote.workspaceFiles"];
    return module.exports;
  }
});
