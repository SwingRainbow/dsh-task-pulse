import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  computeHealth,
  extractSection,
  parseBoard,
  parseDecisions,
  parseProgress,
  resolveLink
} from '../src/parse.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (name) => readFile(path.join(here, 'fixtures', name), 'utf8');

const [boardText, decisionsText, progressText] = await Promise.all([
  read('BOARD.md'),
  read('DECISIONS.md'),
  read('progress.md')
]);

const board = parseBoard(boardText);
const decisions = parseDecisions(decisionsText);
const progress = parseProgress(progressText);

assert.equal(board.tasks.length, 4, 'expected 4 fixture tasks');
assert.equal(decisions.decisions.length, 12, 'expected 12 decisions');
assert.equal(decisions.decisions.filter((item) => item.status === '生效').length, 12);
assert.ok(board.tasks.every((task) => task.phase), 'every task needs a phase');
assert.ok(board.tasks.some((task) => task.id === 'T-DSH-BOARD'));
assert.ok(board.tasks.some((task) => task.id === 'T-LOCAL-INSTALLER-RETENTION'));
assert.ok(board.tasks.some((task) => task.id === 'T-DOCS-ARCH'));
assert.ok(board.tasks.some((task) => task.id === 'T-TIMER'));
assert.ok(decisions.decisions.some((item) => item.id === 'D-012' && item.anchor === 'd-012'));
assert.ok(progress.entries.length > 50, 'progress entries should be parsed');
assert.ok(progress.handoff, 'latest handoff should be found');
assert.ok(progress.handoff.handoff && progress.handoff.handoff['范围']);

assert.equal(resolveLink('../rules/RELEASE.md').path, 'docs/rules/RELEASE.md');
assert.equal(resolveLink('../../outputs/x.md').path, 'outputs/x.md');
assert.equal(resolveLink('C:\\x').kind, 'invalid');
assert.equal(resolveLink('https://example.com/a').kind, 'external');

assert.ok(extractSection(decisionsText, 'd-012'));
assert.ok(extractSection(progressText, '2026-11-13-handoff-local-installer-retention'));

const health = computeHealth({
  boardText,
  decisionsText,
  progressText,
  tasks: board.tasks,
  decisions: decisions.decisions,
  entries: progress.entries,
  issues: [...board.issues, ...decisions.issues]
});
assert.equal(health.taskCount, board.tasks.length);
assert.equal(health.decisionCount, 12);
assert.ok(health.files.length >= 6);

console.log(JSON.stringify({
  tasks: board.tasks.map((task) => `${task.id}:${task.phase}`),
  decisions: decisions.decisions.length,
  progress: progress.entries.length,
  handoff: progress.handoff?.date || null,
  health: health.summary
}, null, 2));
