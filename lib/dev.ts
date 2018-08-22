import chokidar = require('chokidar');
import path = require("path");
import serve = require("webpack-serve");

import createBaseConfig from "./webpack/createBaseConfig";
import {atRoot} from "./webpack/resolvePaths";


function dev(sourceDir, cliOptions = {}) {

  const config = createBaseConfig();
  // const host = "0.0.0.0";

  const nonExistentDir = path.resolve(__dirname, "non-existent");

  // TODO: 监听Content目录并触发hot-reload

  const watcher = chokidar.watch(`${atRoot("docs")}/*.md`, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  })


  serve(
    {},
    {
      config: config.toConfig(),
      content: [atRoot("docs") || nonExistentDir],
      // host,
      logLevel: "error",
      port: 8080
    }
  );
}

export default dev

// TEST
dev(atRoot('docs'))
