import fs = require("fs-extra");

const tempCache = new Map();
export async function writeTemp(file: string, content: string | Buffer) {
  const cached = tempCache.get(file);
  if (cached !== content) {
    await fs.outputFile(file, content);
    tempCache.set(file, content);
    // TODO: remove this hack and write a siteData webpack plugin
    await new Promise(resolve => {
      console.log("Writing the metadata...");
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
}

export function isIndexFile(file: string) {
  return /^(index|readme)\.md$/i.test(file);
}
