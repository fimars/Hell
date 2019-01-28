import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import NotFound from './NotFound';
import Page from './Page';

let App = class extends React.PureComponent {
  public render() {
    return (
      <Router>
        <>
          <NavBar />
          <Switch>
            <Route component={Page} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
