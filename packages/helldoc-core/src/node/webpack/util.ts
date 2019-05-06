import resolveFrom = require("resolve-from");
import { resolve, dirname } from "path";
import { existsSync } from "fs-extra";

const LOCAL_PATH_RE = /^[./]|(^[a-zA-Z]:)/;

export function resolvePackage(
  name: string,
  { cwd = process.cwd(), prefix = "" }
) {
  if (LOCAL_PATH_RE.test(name)) {
    return resolve(cwd, name);
  }

  const packageDir = dirname(resolveFrom(cwd, `${prefix}${name}/package.json`));

  const buildDir = `${packageDir}/build`;
  const distDir = `${packageDir}/build`;
  if (existsSync(distDir)) return distDir;
  if (existsSync(buildDir)) return buildDir;

  return packageDir;
}

export function getModulePaths(cwd = process.cwd()) {
  return [resolve(cwd, "node_modules")].concat(module.paths);
}
