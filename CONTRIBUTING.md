# Contributing

Thanks for looking at Task Pulse. The plugin is intentionally small: a Markdown parser, a client template, and a build script with no runtime dependencies.

## Requirements

- Node.js 20 or newer
- A DSH checkout only if you want to test the plugin inside the Harness UI

## Build

`lib/client.js` is a committed build artifact. Do not edit it by hand.

```sh
npm run build
```

The build inlines `src/parse.mjs` and `prompts/task-records.md` into `src/client.template.js`.

## Test

```sh
npm test
```

This runs three suites:

- `test/parse.test.mjs` — parser fixtures
- `test/build.test.mjs` — `lib/client.js` must match a fresh build
- `test/prompt-examples.test.mjs` — the prompt's examples must parse

If you change the record format, update `test/fixtures/` and the prompt examples together.

## Pull requests

- Keep changes focused; the plugin is read-only by design.
- Do not add writes, network calls, or shell execution.
- Rebuild `lib/client.js` before committing.
- Update `CHANGELOG.md` for user-visible changes.
- Describe the user-facing behavior in the PR, not only the code change.

## Scope

0.2.0 deliberately excludes archive browsing, editing, drag-and-drop phase changes, and workspace-wide aggregation. Existing archive links still open in the evidence drawer.

## License

By contributing, you agree that your changes are licensed under the MIT License.
