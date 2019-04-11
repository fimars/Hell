import fs = require("fs-extra");
import * as path from "path";

const tempCache = new Map();

export function createTemp(tempPath?: string) {
  if (!tempPath) {
    tempPath = path.resolve(__dirname, "../../.temp");
  } else {
    tempPath = path.resolve(tempPath);
  }

  if (!fs.existsSync(tempPath)) {
    fs.ensureDirSync(tempPath);
  } else {
    fs.emptyDirSync(tempPath);
  }

  async function writeTemp(file: string, content: string | Buffer) {
    const destPath = path.join(tempPath as string, file);
    await fs.ensureDir(path.parse(destPath).dir);

    const cached = tempCache.get(file);
    if (cached !== content) {
      await fs.writeFile(destPath, content);
      tempCache.set(file, content);
    }
    return destPath;
  }

  return { writeTemp, tempPath };
}

export function isIndexFile(file: string) {
  return /^(index|readme)\.md$/i.test(file);
}
