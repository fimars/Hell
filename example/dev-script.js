const path = require('path');

// Packages
const sh = require('shelljs');

// rm -rf dist .cache
sh.rm('-rf', 'dist');
sh.rm('-rf', '.cache');

sh.mkdir('dist');
sh.cp('-rf', 'example/assets', 'dist/assets');

// `parcel` index.html
sh.exec(`parcel example/dev.html`);
