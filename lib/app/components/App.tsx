/// <reference path="../types.ts"/>

import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NotFound from './NotFound';
import Page from './Page';

export default class App extends React.PureComponent {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/404" component={NotFound} />
          <Route component={Page} />
        </Switch>
      </Router>
    );
  }
}
