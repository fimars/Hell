import { existsSync, readJSONSync, readFileSync } from "fs-extra";
import { resolve, extname } from "path";
import { safeLoad as yaml } from "js-yaml";

export const NANA_CONFIG_FILES = [
  "nana.config.yaml",
  "nana.config.js",
  "nana.config.json"
];

export const SITE_CONFIG_FILES = [
  "site.config.yaml",
  "site.config.js",
  "site.config.json"
];

export function load(
  files: string[],
  options: { cwd: string } = { cwd: process.cwd() }
) {
  const filepath = resolveFiles(files, options.cwd);

  // ref: https://github.com/egoist/joycon/blob/master/src/index.js#L159-L181
  if (filepath) {
    const ext = extname(filepath).slice(1);
    if (ext === "js") {
      delete require.cache[filepath];
      return {
        path: filepath,
        data: require(filepath)
      };
    }

    if (ext === "json") {
      return {
        path: filepath,
        data: readJSONSync(filepath)
      };
    }

    if (ext === "yaml") {
      return {
        path: filepath,
        data: yaml(readFileSync(filepath).toString())
      };
    }
  }

  return {};
}

function resolveFiles(files: string[], cwd: string) {
  for (const file of files) {
    const filepath = resolve(cwd, file);
    if (existsSync(filepath)) return filepath;
  }
  return null;
}
