# Changelog

All notable changes to Task Pulse are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-11-13

### Added

- Read-only **Progress** view in DSH with grouped task rows: now, waiting for you, next, paused, and needs verification.
- Task detail card with next step, blockers, goal, scope, evidence links, and copy actions.
- Decision log with status filters and evidence links.
- Activity feed with the latest session handoff.
- Health view with file sizes, stale tasks, and parser warnings.
- Onboarding card for workspaces without `docs/tasks/`, with a copyable prompt that teaches an agent the record format.
- `prompts/task-records.md`, inlined into the client bundle at build time.
- Tests for parser fixtures, prompt examples, and build consistency.
- CI workflow for Node.js 20, 22, and 24.

### Changed

- Missing task files are treated as an uninitialized workspace, not a read error.
- Empty or malformed records show a neutral onboarding state instead of a red banner.

### Security

- The plugin only reads workspace files through `ctx.remote.workspaceFiles`; it does not write, call the network, or run shell commands.

## [0.1.0]

- Internal prototype: read-only board, decision list, activity list, and health view.

[0.2.0]: https://github.com/SwingRainbow/dsh-task-pulse/releases/tag/v0.2.0
