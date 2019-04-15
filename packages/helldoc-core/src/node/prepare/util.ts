import fs = require("fs-extra");
import * as path from "path";

const tempCache = new Map<string, string | Buffer>();
const tempFiles = new Set<string>();

export function createTemp(customTempPath?: string) {
  const tempPath = customTempPath
    ? path.resolve(customTempPath)
    : path.resolve(__dirname, "../../.temp");

  if (!fs.existsSync(tempPath)) {
    fs.ensureDirSync(tempPath);
  } else {
    fs.emptyDirSync(tempPath);
  }

  async function writeTemp(file: string, content: string | Buffer) {
    if (file !== "runtime") tempFiles.add(file);
    const destPath = path.join(tempPath, file + ".js");
    await fs.ensureDir(path.parse(destPath).dir);

    const cached = tempCache.get(file);
    if (cached !== content) {
      await fs.writeFile(destPath, content);
      tempCache.set(file, content);
    }
    return destPath;
  }

  async function genTempRuntime() {
    const runtime = Array.from(tempFiles)
      .map(file => `export {default as ${file}} from '@internal/${file}';`)
      .join("\n");
    await writeTemp("runtime", runtime);
  }

  return { writeTemp, tempPath, genTempRuntime };
}

export function isIndexFile(file: string) {
  return /^(index|readme)\.md$/i.test(file);
}

export function toComponentName(file: string) {
  const isIndex = isIndexFile(file);
  const normalize = (file: string) =>
    "a-" +
    file
      .replace(/\.md$/, "")
      .replace(/\/|\\/g, " ")
      .split(" ")
      .join("");
  const normalizedName: string = isIndex ? "index" : normalize(file);
  return normalizedName;
}

type ModuleItem = [string, string];
export function toModuleMap(files: Array<ModuleItem>) {
  function requireAsItem([name, absolutePath]: ModuleItem) {
    const code = `["${name}"]: require(${JSON.stringify(
      absolutePath
    )}).default`;
    return code;
  }
  const moduleMap = files.map(requireAsItem).join(",\n  ");
  return `export default {\n  ${moduleMap}\n};`;
}
