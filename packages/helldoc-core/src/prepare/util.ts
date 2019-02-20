import fs = require("fs-extra");
import { resolveAppPath } from "../util";

const tempCache = new Map();
export async function writeTemp(file: string, content: string | Buffer) {
  const cached = tempCache.get(file);
  if (cached !== content) {
    await fs.outputFile(resolveAppPath(`src/.temp/${file}`), content);
    tempCache.set(file, content);
  }
}

export function isIndexFile(file: string) {
  return /^(index|readme)\.md$/i.test(file);
}
