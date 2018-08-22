"use strict";
exports.__esModule = true;
var path_1 = require("path");
var rootPath = path_1.resolve(__dirname, "../../");
exports.atRoot = function (path) {
    if (path === void 0) { path = ""; }
    return path_1.resolve(rootPath, path);
};
exports.atLib = function (path) {
    if (path === void 0) { path = ""; }
    return path_1.resolve(rootPath, "lib", path);
};
exports.atWebpack = function (path) {
    if (path === void 0) { path = ""; }
    return path_1.resolve(rootPath, "lib/webpack", path);
};
exports.atApp = function (path) {
    if (path === void 0) { path = ""; }
    return path_1.resolve(rootPath, "lib/app", path);
};
