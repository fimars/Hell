import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

function init(): void {
  ReactDOM.render(<App />, document.getElementById("app"));
}

export default init;
