import fs = require("fs-extra");

const tempCache = new Map();
export async function writeTemp(file: string, content: string | Buffer) {
  const cached = tempCache.get(file);
  if (cached !== content) {
    await fs.outputFile(file, content);
    tempCache.set(file, content);
  }
}

export function isIndexFile(file: string) {
  return /^(index|readme)\.md$/i.test(file);
}
