import fs = require("fs");
import path = require("path");

export default function findLinkedModules(nodeModulesPath: string): string[] {
  const modules = [];

  fs.readdirSync(nodeModulesPath).forEach(dirname => {
    const modulePath = path.resolve(nodeModulesPath, dirname);
    const stat = fs.lstatSync(modulePath);

    if (dirname.startsWith(".")) {
      // not a module or scope, ignore
    } else if (dirname.startsWith("@")) {
      // scoped modules
      modules.push(...findLinkedModules(modulePath));
    } else if (stat.isSymbolicLink()) {
      const realPath = fs.realpathSync(modulePath);
      const realModulePath = path.resolve(realPath, "node_modules");

      modules.push(realModulePath);
    }
  });

  return modules;
}
