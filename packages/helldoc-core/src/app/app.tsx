import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { createStore } from "redux";

import AppRouter from "./genApplicationRouter";
import { sidebarReducer } from "./store/reducer";

import siteData from "@internal/site-data";

import "@assets/theme";
let App = class extends React.PureComponent {
  public render() {
    return (
      <Provider store={createStore(sidebarReducer)}>
        <BrowserRouter basename={siteData.base}>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    );
  }
};

if (process.env.NODE_ENV === "development") {
  App = hot(App);
}

export default App;
