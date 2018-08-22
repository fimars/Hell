"use strict";
exports.__esModule = true;
var chokidar = require("chokidar");
var path = require("path");
var serve = require("webpack-serve");
var createBaseConfig_1 = require("./webpack/createBaseConfig");
var resolvePaths_1 = require("./webpack/resolvePaths");
function dev(sourceDir, cliOptions) {
    if (cliOptions === void 0) { cliOptions = {}; }
    var config = createBaseConfig_1["default"]();
    // const host = "0.0.0.0";
    var nonExistentDir = path.resolve(__dirname, "non-existent");
    // TODO: 监听Content目录并触发hot-reload
    var watcher = chokidar.watch(resolvePaths_1.atRoot("docs") + "/*.md", {
        ignored: /(^|[\/\\])\../,
        persistent: true
    });
    serve({}, {
        config: config.toConfig(),
        content: [resolvePaths_1.atRoot("docs") || nonExistentDir],
        // host,
        logLevel: "error",
        port: 8080
    });
}
exports["default"] = dev;
// TEST
dev(resolvePaths_1.atRoot('docs'));
