import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { createStore } from "redux";

import { sidebarReducer } from "./store/reducer";
import genApplicationRouter from "./genApplicationRouter";
import siteData from "@internal/site-data";

let App = class extends React.PureComponent<{ location: string }> {
  public render() {
    const { location } = this.props;
    return (
      <Provider store={createStore(sidebarReducer)}>
        <StaticRouter basename={siteData.base} context={{}} location={location}>
          {genApplicationRouter()}
        </StaticRouter>
      </Provider>
    );
  }
};

export function render(location = "/") {
  return ReactDOMServer.renderToString(<App location={location} />);
}
