"use strict";
exports.__esModule = true;
var resolvePaths_1 = require("../util/resolvePaths");
var createBaseConfig_1 = require("./createBaseConfig");
function default_1(ctx) {
    var config = createBaseConfig_1["default"](ctx);
    config.entry('app').add(resolvePaths_1.atApp('app.ts'));
    if (process.env.NODE_ENV === 'production') {
        config
            .plugin('optimize-css')
            .use(require('optimize-css-assets-webpack-plugin'), [
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
    else {
        config.plugin('hmr').use(require('webpack/lib/HotModuleReplacementPlugin'));
    }
    return config;
}
exports["default"] = default_1;
