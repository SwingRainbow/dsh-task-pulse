# dsh-task-pulse — Task Pulse

**Task Pulse** 是一个独立的 DSH 客户端插件：在会话的「对话 / 进度」旁加一个「进度」页签，读取**当前会话工作区**的 `docs/tasks/`，按用户视角分组显示：

**现在在做 / 等你确认 / 接下来 / 暂缓 / 待核实**

每行只显示任务名、阶段 + 日期、下一步和等待项；点击查看完整详情。只读，不写文件、不联网、不执行 shell。工作区还没有任务记录时，页签会显示接入入口，可直接复制配套提示词给 Agent。

## 为什么叫 Task Pulse

“Pulse” 指当前任务的状态脉搏：打开就能看到现在在做什么、什么在等自己确认、什么暂停了，而不是一堆字段。

## 安装

- DSH 插件页 → 添加插件 → 本地绝对路径：`C:\Users\TDD\Desktop\dsh-task-pulse`
- 或者发布到 GitHub 后，用插件页的 Git 地址安装；包名是 `dsh-task-pulse`。发布时把 `lib/client.js` 一起提交，Git 安装不会自动构建。
- 安装后在插件页可禁用或卸载 `dsh-task-pulse`。
- 安装会改 DSH 的 `desktop` profile 依赖和组合包列表；卸载即恢复。

## 配套提示词（新项目接入）

插件本身只读，不创建文件。工作区没有 `docs/tasks/`，或三份记录都存在但没有可解析内容时，页签会显示接入提示：

- **复制初始化提示词**：把 `prompts/task-records.md` 整段发给 Agent，由它先读项目、再按固定格式建立 `BOARD.md`、`DECISIONS.md`、`progress.md`。
- **查看完整规范**：页签右上角「规范」或空状态里的入口，随时查看并复制同一份内容。
- 初始化后点「刷新」，页签会自动读取；后续由 Agent 按规范维护，插件继续只读。

提示词源文件是 `prompts/task-records.md`，构建时内联进 `lib/client.js`，因此离线可用。

## 开发

- 解析器：`src/parse.mjs`
- 客户端模板：`src/client.template.js`
- 配套提示词：`prompts/task-records.md`
- 构建：`node build.mjs` → `lib/client.js`
- 测试：`node test/parse.test.mjs`、`node test/build.test.mjs`、`node test/prompt-examples.test.mjs`
- 测试读取 `test/fixtures/` 的固定快照，不依赖特定仓库；需要更新格式时替换 fixtures。
- 修改 `src/client.template.js`、`src/parse.mjs` 或 `prompts/task-records.md` 后，运行 `node build.mjs`，再在插件页把 `dsh-task-pulse` 行关/开一次，或刷新 DSH 页面。

## 边界

- 只读；不拖拽改阶段，不写回任务记录；初始化由 Agent 按提示词创建文件。
- 绑定当前会话工作区；空白新会话不显示该页签。
- 工作区没有 `docs/tasks/` 时显示接入提示，不把缺失文件当成读取失败。
- 版本钉 `0.2.2-rc.1`；升级 DSH 后先复核客户端模块格式。
- 证据抽屉读取本地 Markdown 锚点；Markdown 预览暂不支持源码行跳转。

## 视觉与布局

- 照 DSH 设置页做：720px 单列、16px 标题、14px 行、设置卡片材质（`--dsw-alias-settings-card-fill/stroke`）、`--dsw-radius-xl`、下划线页签、36px 次级按钮。
- 默认是单列分组进度列表，不是三列看板；只渲染有任务的分组。
- 详情是居中的设置卡弹层（640px），黑色 45% 遮罩；头部标题/关闭和底部复制按钮固定，正文单独滚动；开头是“下一步 / 等待”焦点块。

## 仓库结构

- `lib/`：构建产物，提交进仓库，Git 安装时可直接加载。
- `src/`：解析器和客户端模板。
- `prompts/`：配套提示词，构建时内联进客户端。
- `test/`：固定 fixtures、构建一致性、提示词示例三组测试。

## 非目标（第一版）

- 不写任务记录；不移动、归档或删除文件。归档暂不做，已有归档仍可通过证据链接打开。
- 不做跨工作区聚合；页签只绑定当前会话工作区。
- 不做编辑、拖拽改阶段或状态写回。

## 版本管理

- 当前插件版本 `0.2.0`：新增未初始化工作区接入提示、配套提示词和空状态。
- 仓库初始化在 `main` 分支；`lib/client.js` 随源码一起提交，Git 安装时无需构建。

## License

MIT。见 [LICENSE](LICENSE)。
