// @ts-ignore
import Routes from "#nana/routes";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import * as React from "react";

let App = function() {
  const base = "";
  return (
    <BrowserRouter basename={base}>
      <Routes />
    </BrowserRouter>
  );
};

if (process.env.NODE_ENV === "development") {
  App = hot(App);
}

export default App;
