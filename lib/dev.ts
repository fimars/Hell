import chalk from 'chalk';
import chokidar = require('chokidar');
import opn = require('opn');
import path = require("path");
import serve = require("webpack-serve");

import prepare from './prepare';
import {atRoot} from "./util/resolvePaths";
import createBaseConfig from "./webpack/createBaseConfig";

async function dev(sourceDir, cliOptions = {}) {
  console.log('\nExtracting site metadata...');
  const options = await prepare(sourceDir)

  // setup watchers to update options and dynamically generated files
  const update = (...args) => {
    prepare(sourceDir).catch(err => {
      console.error(chalk.red(err.stack), false);
    })
  }

  //  watch add/remove of files
  const pagesWatcher = chokidar.watch([
    '**/*.md'
  ], {
    cwd: sourceDir,
    ignoreInitial: true
  });
  pagesWatcher.on('add', update);
  pagesWatcher.on('change', update);
  pagesWatcher.on('unlink', update);
  pagesWatcher.on('addDir', update);
  pagesWatcher.on('unlinkDir', update);

  // resolve webpack config
  const config = createBaseConfig();

  const host = '0.0.0.0';
  const port = 8080;
  const nonExistentDir = path.resolve(__dirname, "non-existent");
  await serve(
    {},
    {
      config: config.toConfig(),
      content: [nonExistentDir],
      host,
      logLevel: "error",
      port,
    }
  );

  opn(`http://${host}:${port}`);
}

export default dev

// TEST
dev(atRoot('docs'))
