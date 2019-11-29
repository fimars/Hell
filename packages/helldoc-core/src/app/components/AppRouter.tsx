import GlobalLayout from "./GlobalLayout";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import React from "react";
import { siteData, pages as Contents } from "../runtime";

export default function AppRouter() {
  const { pages } = siteData;
  return (
    <GlobalLayout>
      <Switch>
        {pages.map(page => {
          return (
            <Route
              exact
              key={page.path}
              path={page.path}
              component={Contents[page.component]}
            />
          );
        })}
        <Route component={NotFound} />
      </Switch>
    </GlobalLayout>
  );
}
