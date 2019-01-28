import fs = require('fs-extra');

import { atApp } from '../util/resolvePaths' 

const tempCache = new Map();
export async function writeTemp(file: string, content: string | Buffer) {
  const cached = tempCache.get(file);
  if (cached !== content) {
    await fs.outputFile(atApp(`.temp/${file}`), content);
    tempCache.set(file, content);
  }
}
