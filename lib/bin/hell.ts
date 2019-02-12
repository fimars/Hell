#!/usr/bin/env node

import program = require("commander");
import dev from "../dev";
import prod from "../prod";

program.version("0.0.1");
program
  .command("dev <dir>")
  .description("run the docs dev server with dir path")
  .action(function(dir, _options) {
    dev(dir);
  });
program
  .command("prod <dir>")
  .description("output the static web files with dir path")
  .action(function(dir, _options) {
    prod(dir);
  });

program.parse(process.argv);
