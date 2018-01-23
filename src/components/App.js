// Packages
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// Components
import NotFound from "./NotFound";
import Page from "./Page";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/404" component={NotFound} />
      <Route component={Page} />
    </Switch>
  </Router>
);

export default App;
