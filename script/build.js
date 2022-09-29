const fs = require('fs');

const input = fs.readFileSync('./src/index.js', 'utf8').toString().trim();
const pattern = fs.readFileSync('./node_modules/emoji-test-regex-pattern/dist/latest/javascript.txt', 'utf8').toString().trim();
const output = input.replace('<% pattern %>', pattern) + '\n';

fs.writeFileSync('./index.js', output);

const inputModule = fs.readFileSync('./src/index.mjs', 'utf8').toString().trim();
const outputModule = inputModule.replace("<% pattern %>", pattern) + "\n";

fs.writeFileSync('./index.mjs', outputModule);
