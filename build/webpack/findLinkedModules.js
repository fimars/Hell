"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function findLinkedModules(nodeModulesPath) {
    var modules = [];
    fs.readdirSync(nodeModulesPath).forEach(function (dirname) {
        var modulePath = path.resolve(nodeModulesPath, dirname);
        var stat = fs.lstatSync(modulePath);
        if (dirname.startsWith('.')) {
            // not a module or scope, ignore
        }
        else if (dirname.startsWith('@')) {
            // scoped modules
            modules.push.apply(modules, findLinkedModules(modulePath));
        }
        else if (stat.isSymbolicLink()) {
            var realPath = fs.realpathSync(modulePath);
            var realModulePath = path.resolve(realPath, 'node_modules');
            modules.push(realModulePath);
        }
    });
    return modules;
}
exports["default"] = findLinkedModules;
