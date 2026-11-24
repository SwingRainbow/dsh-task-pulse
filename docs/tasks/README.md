# 任务记录

本目录是 Task Pulse 项目自己的任务记录。DSH 的「进度」页签只读这里的三份 Markdown，不创建、修改或删除文件。

## 文件

- `BOARD.md`：当前任务，唯一事实源。一个任务一个 `## T-...` 二级标题，十个字段齐全。
- `DECISIONS.md`：已确认的决定。标题为 `## D-三位数字 ...`，锚点紧贴标题上方。
- `progress.md`：按日期倒序的执行记录。标题以日期开头，执行者写在末尾【】里。
- 可选：`task_plan.md`、`findings.md`、`ARCHIVE_INDEX.md`，页签只读体积和健康提示，不解析结构。

## 维护规则

- 开始任务：在 BOARD 加一条，阶段「进行中」，写清目标和完成条件。
- 有结果：更新「最近完成点」和「更新时间」。
- 需要用户拍板：阶段改「待核实」，问题写进「阻塞或待确认项」。
- 用户确认：写 `DECISIONS.md`，状态「生效」，再更新 BOARD。
- 收尾：结果写进 `progress.md`；BOARD 改为「待验收」或移除。
- 会话结束：涉及交接时补一段标题含「会话交接」的 progress。
- 不编造事实；找不到依据的写「待核实」。
- 不删除历史 progress；归档只追加说明。
- 证据用相对 `docs/tasks/` 的 Markdown 链接，锚点指向标题上方的 `<a id="..."></a>`。

## 链接

- 记录规范：[prompts/task-records.md](../../prompts/task-records.md)
- 仓库说明：[README.md](../../README.md)
- 插件版本：`0.2.1`，DSH `^0.2.3-alpha.2`
