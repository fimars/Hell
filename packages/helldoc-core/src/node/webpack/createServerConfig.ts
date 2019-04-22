import Config = require("webpack-chain");
import webpackNodeExternals = require("webpack-node-externals");
import createBaseConfig from "./createBaseConfig";

import { AppContext } from "../../types";
import { resolveApp } from "../util/alias";
import { join } from "path";

export default function(ctx: AppContext): Config {
  const config = createBaseConfig(ctx);

  config.entry("server").add(resolveApp("server"));

  config.output
    .path(join(ctx.outDir, "scripts"))
    .filename("server.js")
    .library("ssr")
    .libraryTarget("umd");

  config.target("node");
  config.node.set("__dirname", false);

  config.externals(webpackNodeExternals());

  return config;
}
