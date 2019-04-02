import * as React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Base from "./components/Base";
import NotFound from "./components/NotFound";

import pages from "@internal/pages";
import siteData from "@internal/site-data";

interface MDPage {
  component: string;
  path: string;
}

function hasComponent(page: MDPage) {
  return !!pages[page.component];
}

function pageToRoute(page: MDPage) {
  return (
    <Route
      exact
      key={page.path}
      path={page.path}
      component={pages[page.component]}
    />
  );
}

const genRoutes = () => siteData.pages.filter(hasComponent).map(pageToRoute);
console.log(genRoutes());

export default () => {
  return (
    <Base>
      <NavBar />
      <Switch>
        {genRoutes()}
        <Route component={NotFound} />
      </Switch>
    </Base>
  );
};
