import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const parser = (await readFile(path.join(root, 'src/parse.mjs'), 'utf8'))
  .replace(/^export\s+/gm, '');
const prompt = await readFile(path.join(root, 'prompts/task-records.md'), 'utf8');
const template = await readFile(path.join(root, 'src/client.template.js'), 'utf8');
const output = template
  .replace('/*__PARSER__*/', () => parser)
  .replace('/*__PROMPTS__*/', () => `const TASK_RECORDS_PROMPT = ${JSON.stringify(prompt)};`);

await mkdir(path.join(root, 'lib'), { recursive: true });
await writeFile(path.join(root, 'lib/client.js'), output, 'utf8');
console.log(`built lib/client.js (${output.length} chars)`);
