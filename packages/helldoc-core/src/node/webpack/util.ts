import resolveFrom = require("resolve-from");
import { resolve, dirname } from "path";
import { existsSync } from "fs-extra";

export function resolvePackage(
  name: string,
  { cwd = process.cwd(), prefix = "" }
) {
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
