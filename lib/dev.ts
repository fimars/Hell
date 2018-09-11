import chokidar = require('chokidar');
import opn = require('opn');
import path = require("path");
import serve = require("webpack-serve");

import createBaseConfig from "./webpack/createBaseConfig";
import {atRoot} from "./webpack/resolvePaths";

function sendRefreshMessage(reciver) {
};

async function dev(sourceDir, cliOptions = {}) {

  const config = createBaseConfig();
  // const host = "0.0.0.0";

  const nonExistentDir = path.resolve(__dirname, "non-existent");

  // TODO: 监听Content目录并触发hot-reload
  const watcher = chokidar.watch(`${atRoot("docs")}/*.md`, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  })

  const host = '0.0.0.0';
  const port = 8080;

  await serve(
    {},
    {
      config: config.toConfig(),
      content: [atRoot("docs") || nonExistentDir],
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
