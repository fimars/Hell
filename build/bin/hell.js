#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var program = require("commander");
var dev_1 = require("../dev");
var prod_1 = require("../prod");
program.version("0.0.1");
program
    .command("dev <dir>")
    .description("run the docs dev server with dir path")
    .action(function (dir, _options) {
    dev_1["default"](dir);
});
program
    .command("prod <dir>")
    .description("output the static web files with dir path")
    .action(function (dir, _options) {
    prod_1["default"](dir);
});
program.parse(process.argv);
