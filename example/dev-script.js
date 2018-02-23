const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const sh = require('shelljs');

// rm -rf dist .cache
sh.rm('-rf', 'dist');
sh.rm('-rf', '.cache');

sh.mkdir('dist');
sh.cp('-rf', 'example/assets', 'dist/assets');

const readme = path.join(__dirname, './assets/README.md');
fs.watch(readme, (evt, filename) => {
  sh.cp(`example/assets/${filename}`, `dist/assets/${filename}`)
})

// `parcel` index.html
sh.exec(`parcel example/dev.html`);
console.log('open: http://127.0.0.1:1234')
