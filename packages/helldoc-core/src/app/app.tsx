import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { siteData } from "./runtime";
import * as React from "react";

let App = function() {
  const { base } = siteData;
  return (
    <BrowserRouter basename={base}>
      <AppRouter />
    </BrowserRouter>
  );
};

if (process.env.NODE_ENV === "development") {
  App = hot(App);
}

export default App;
