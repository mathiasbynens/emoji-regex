function getUnicodeDataDependency() {
	const pkg = require('../package.json');
	for (const name of Object.keys(pkg.devDependencies)) {
		if (name.startsWith('@unicode/unicode-')) {
			return name;
		}
	}
	throw new Error('No @unicode/unicode-* devDependency found');
}

const unicodeDataPackage = getUnicodeDataDependency();
module.exports = unicodeDataPackage;
