import { Nana } from ".";
import { resolveApp, resolveStatic } from "../utils/alias";
import { outputFile } from "fs-extra";
import webpack = require("webpack");
import * as WebpackDevServer from "webpack-dev-server";
import { posix } from "path";

const ID = "renderer";

export default class Renderer {
  api: Nana;
  constructor(api: Nana) {
    this.api = api;

    this.api.hooks.chainWebpack.tap(ID, (config, _opts) => {
      config.entry("client").add(resolveApp("client"));
      config.plugin("html").use(require("html-webpack-plugin"), [
        {
          template: resolveStatic("index.template.html"),
          chunksSortMode: "none"
        }
      ]);

      if (this.api.dev) {
        config.plugin("time-fix").use(require("time-fix-plugin"));
        config
          .plugin("hmr")
          .use(require("webpack/lib/HotModuleReplacementPlugin"));
      } else {
        config.plugin("loadable").use(require("@loadable/webpack-plugin"), [
          {
            filename: "web-stats.json"
          }
        ]);
        config
          .plugin("optimize-css")
          .use(require("optimize-css-assets-webpack-plugin"), [
            {
              canPrint: false,
              cssProcessorOptions: {
                autoprefixer: { disable: true },
                mergeLonghand: false,
                safe: true
              }
            }
          ]);
      }

      config.module
        .rule("md")
        .oneOf("nana")
        .resourceQuery(query => {
          return /nanaPage/.test(query);
        })
        .use("nana-loader")
        .loader(require.resolve("../webpack/nanaLoader"))
        .options({ api });
    });

    this.api.hooks.emitRoutes.tapPromise(ID, () => this.writeRoutes());
  }

  async getRequestHandler() {
    const config = this.api.createWebpackChain({ type: "client" }).toConfig();
    const compiler = webpack(config);

    const base = "";
    const devServerOptions: WebpackDevServer.Configuration = {
      disableHostCheck: true,
      compress: true,
      hot: true,
      quiet: true,
      headers: {
        "access-control-allow-origin": "*"
      },
      watchOptions: {
        ignored: [/node_modules/]
      },
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [{ from: /./, to: posix.join(base, "index.html") }]
      },
      publicPath: base
      // before(app) {
      //   if (existsSync(contentBase)) {
      //     app.use(base, require("express").static(contentBase));
      //   }
      // }
    };

    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(3333);
  }

  async writeRoutes() {
    const pages = Array.from(this.api.pages.values());

    const routes = `
import GlobalLayout from '#hell/components/GlobalLayout';
import NotFound from '#hell/components/NotFound';
import { Route, Switch } from 'react-router-dom';
import * as React from 'react';

export default function Routes () {
  return (
    <GlobalLayout>
      <Switch>
        ${pages
          .map(page =>
            `<Route
              exact
              key={'${page.internal.id}'}
              path={'/${page.internal.relative}'}
              component={require(${JSON.stringify(
                page.internal.absolute + `?nanaPage=${page.internal.id}`
              )}).default}
            />`.trim()
          )
          .join("\n")}
        <Route component={NotFound} />
      </Switch>
    </GlobalLayout>
  )
}
    `;

    await outputFile(this.api.resolveNana("routes.js"), routes, "utf8");
  }
}
