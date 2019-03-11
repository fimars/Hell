#!/usr/bin/env node

import * as program from "commander";
import { prod, dev } from "@helldoc/core";

program.version("0.2.11");

bindUniversalOptions(program.command("dev [dir]"))
  .description("run the docs dev server with dir path")
  .action(function(dir = process.cwd(), options) {
    dev(dir, options);
  });

bindUniversalOptions(program.command("prod [dir]"))
  .description("output the static web files with dir path")
  .action(function(dir = process.cwd(), options) {
    prod(dir, options);
  });

program.parse(process.argv);

if (!program.args.length) program.help();

function bindUniversalOptions(program: program.Command) {
  return program.option("-o, --output <dir>", "set output dir path.");
}
