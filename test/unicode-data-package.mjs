import { readFile } from 'node:fs/promises';

const getUnicodeDataDependency = async () => {
	const pkg = JSON.parse(
		await readFile(new URL('../package.json', import.meta.url), 'utf8'),
	);
	for (const name of Object.keys(pkg.devDependencies)) {
		if (name.startsWith('@unicode/unicode-')) {
			return name;
		}
	}
	throw new Error('No @unicode/unicode-* devDependency found.');
};

const unicodeDataPackage = await getUnicodeDataDependency();

export default unicodeDataPackage;
