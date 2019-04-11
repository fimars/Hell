import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import ApplicationRouter from "./data/routers";
import siteData from "@internal/site-data";

import "@theme/browser";

let App = class extends React.PureComponent {
  public render() {
    return (
      <BrowserRouter basename={siteData.base}>
        <ApplicationRouter />
      </BrowserRouter>
    );
  }
};

if (process.env.NODE_ENV === "development") {
  App = hot(App);
}

export default App;
