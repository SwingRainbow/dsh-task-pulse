# 当前任务

最后核对 2026-11-24。Task Pulse 0.2.1 已适配 DSH 0.2.3-alpha.2 并恢复启用，当前在验收页签并初始化本项目自己的任务记录。维护方式见 [共同流程](README.md)。

<a id="t-task-pulse-v020"></a>
## T-TASK-PULSE-V020 Task Pulse 0.2.0 发布与验收

- 目标与完成条件：0.2.0 可从 GitHub 安装；页签在「有记录」和「无记录」两种工作区都能正确显示；CI 通过；用户确认可以收尾。
- 阶段：待验收
- 开始日期：2026-11-13
- 结束日期：未结束
- 已确认范围：只读页签、无记录工作区接入提示、配套提示词、双语 README、CI 和 MIT 开源；不做归档浏览。
- 最近完成点：2026-11-13 完成 0.2.0 功能、仓库打磨和 v0.2.0 Release；CI 在 Node 20/22/24 通过；仓库已公开。
- 下一步：用户刷新 DSH，在「进度」页签确认有记录和无记录两种状态；确认后移除本条，或把遗留项拆成新任务。
- 阻塞或待确认项：等待用户验收；README 还缺一张真实界面截图。
- 证据：[实现记录](progress.md#2026-11-13-progress-implementation)、[发布记录](progress.md#2026-11-13-progress-release)、[Release](https://github.com/SwingRainbow/dsh-task-pulse/releases/tag/v0.2.0)
- 更新时间：2026-11-13【DS操作】

<a id="t-tasks-init"></a>
## T-TASKS-INIT 本项目任务记录初始化

- 目标与完成条件：按 Task Pulse 规范建立 `docs/tasks/BOARD.md`、`DECISIONS.md`、`progress.md` 和说明，页签能解析出真实任务、决定和动态。
- 阶段：进行中
- 开始日期：2026-11-13
- 结束日期：未结束
- 已确认范围：只新增 `docs/tasks/` 记录，不改插件代码，不提交 Git；按用户发来的提示词执行。
- 最近完成点：按提示词创建三份记录和 `docs/tasks/README.md`，内容来自本次会话和仓库事实。
- 下一步：刷新 DSH「进度」页签，确认解析结果；无问题后改为待验收。
- 阻塞或待确认项：无。
- 证据：[初始化记录](progress.md#2026-11-13-progress-tasks-init)、[记录规范](README.md)
- 更新时间：2026-11-13【DS操作】

<a id="t-screenshot"></a>
## T-SCREENSHOT README 界面截图

- 目标与完成条件：README 加入真实「进度」页截图和 `screenshots.json`，仓库首页和市场能展示实际界面。
- 阶段：待办
- 开始日期：未记录
- 结束日期：未结束
- 已确认范围：只加截图和文档，不改功能。
- 最近完成点：已确认需要一张带 `docs/tasks` 的会话截图。
- 下一步：用户刷新 DSH 后截图；保存为 `assets/screenshot-1.png`，在 README 加 Preview，并创建 `screenshots.json`。
- 阻塞或待确认项：等待用户提供截图。
- 证据：[仓库打磨记录](progress.md#2026-11-13-progress-release)
- 更新时间：2026-11-13【DS操作】

<a id="t-archive-browse"></a>
## T-ARCHIVE-BROWSE 归档浏览

- 目标与完成条件：需要时提供只读归档入口，按记录里的链接或可选索引聚合；不按文件名或目录名猜。
- 阶段：暂缓
- 开始日期：未记录
- 结束日期：未结束
- 已确认范围：0.2.0 不做；将来若做，只读、按链接或索引，不写文件。
- 最近完成点：2026-11-13 讨论后决定先不做，避免依赖各 Agent 的归档命名。
- 下一步：出现“找不到旧记录”的真实需求时再评估。
- 阻塞或待确认项：归档命名不统一；目前没有明确需求。
- 证据：[归档讨论](DECISIONS.md#d-003)、[非目标](../README.md)
- 更新时间：2026-11-13【DS操作】
