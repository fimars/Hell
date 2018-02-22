import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import globalConfig, { IHellConfig } from "./config";
import { $ } from "./lib/dom";

declare global {
    interface Window { Hell: any }
}

if (!window.Hell) {
    window.Hell = { init };
}

function init(config?: IHellConfig): void {
    if (config) {
        globalConfig.update(config);
    }
    ReactDOM.render(<App />, $("app"));
}

export default { init };