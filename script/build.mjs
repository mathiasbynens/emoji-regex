import { readFile, writeFile } from 'node:fs/promises';

const input = (await readFile('./src/index.mjs', 'utf8')).trim();
const pattern = (
	await readFile(
		'./node_modules/emoji-test-regex-pattern/dist/latest/javascript.txt',
		'utf8',
	)
).trim();
const output = input.replace('<% pattern %>', pattern) + '\n';

await writeFile('./index.mjs', output);
