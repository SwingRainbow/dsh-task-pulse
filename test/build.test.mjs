import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (name) => readFile(path.join(root, name), 'utf8');

const [parserSource, prompt, template, built] = await Promise.all([
  read('src/parse.mjs'),
  read('prompts/task-records.md'),
  read('src/client.template.js'),
  read('lib/client.js')
]);

const parser = parserSource.replace(/^export\s+/gm, '');
const expected = template
  .replace('/*__PARSER__*/', () => parser)
  .replace('/*__PROMPTS__*/', () => `const TASK_RECORDS_PROMPT = ${JSON.stringify(prompt)};`);

assert.equal(built, expected, 'lib/client.js is stale; run node build.mjs');

for (const token of [
  'docs/tasks/BOARD.md',
  'docs/tasks/DECISIONS.md',
  'docs/tasks/progress.md',
  '## T-',
  '- 阶段：',
  '- 状态：',
  '待验证',
  '<a id="d-001"></a>',
  '会话交接'
]) {
  assert.ok(prompt.includes(token), `prompt is missing ${token}`);
}

console.log(JSON.stringify({
  build: 'up to date',
  promptChars: prompt.length,
  bundleChars: built.length
}, null, 2));
