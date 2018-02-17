import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import globalConfig, { IHellConfig } from "./config";
import { $ } from "./lib/dom";

function init(config?: IHellConfig): void {
    if (config) {
        globalConfig.update(config);
    }
    ReactDOM.render(<App />, $("app"));
}

export default { init };
