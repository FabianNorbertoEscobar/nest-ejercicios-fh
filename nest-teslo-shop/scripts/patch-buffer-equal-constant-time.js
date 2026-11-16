const fs = require('fs');
const path = require('path');

const packageFile = path.join(
  __dirname,
  '..',
  'node_modules',
  'buffer-equal-constant-time',
  'index.js',
);
const legacyDeclaration =
  "var SlowBuffer = require('buffer').SlowBuffer;";
const compatibleDeclaration =
  "var SlowBuffer = require('buffer').SlowBuffer || Buffer;";

if (!fs.existsSync(packageFile)) {
  process.exit(0);
}

const source = fs.readFileSync(packageFile, 'utf8');

if (source.includes(compatibleDeclaration)) {
  process.exit(0);
}

if (!source.includes(legacyDeclaration)) {
  throw new Error('Unsupported buffer-equal-constant-time source.');
}

fs.writeFileSync(
  packageFile,
  source.replace(legacyDeclaration, compatibleDeclaration),
);