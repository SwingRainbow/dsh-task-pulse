import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parseBoard, parseDecisions, parseProgress } from '../src/parse.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const prompt = await readFile(path.join(root, 'prompts/task-records.md'), 'utf8');
const blocks = [...prompt.matchAll(/```markdown\n([\s\S]*?)```/g)].map((match) => match[1]);

assert.equal(blocks.length, 3, 'prompt should contain BOARD, DECISIONS and progress examples');

const board = parseBoard(blocks[0]);
const decisions = parseDecisions(blocks[1]);
const progress = parseProgress(blocks[2]);

assert.equal(board.tasks.length, 1, 'BOARD example should parse one task');
assert.equal(board.tasks[0].id, 'T-DEMO');
assert.equal(board.tasks[0].phase, '进行中');
assert.equal(board.issues.length, 0, JSON.stringify(board.issues));

assert.equal(decisions.decisions.length, 1, 'DECISIONS example should parse one decision');
assert.equal(decisions.decisions[0].status, '生效');
assert.equal(decisions.issues.length, 0, JSON.stringify(decisions.issues));

assert.equal(progress.entries.length, 2, 'progress example should parse two entries');
assert.ok(progress.handoff, 'progress example should include a handoff');
assert.equal(progress.handoff.handoff['范围'], '本次交接覆盖什么。');

console.log(JSON.stringify({
  board: board.tasks.map((task) => `${task.id}:${task.phase}`),
  decisions: decisions.decisions.map((item) => `${item.id}:${item.status}`),
  entries: progress.entries.length,
  handoff: progress.handoff.date
}, null, 2));
