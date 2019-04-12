import AppRouter from "./components/AppRouter";
import { siteData } from "./runtime";
import { StaticRouter } from "react-router-dom";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

function App(props: { location: string }) {
  const { base } = siteData;
  const basename = base.slice(1) ? base : "";
  return (
    <StaticRouter basename={basename} location={props.location}>
      <AppRouter />
    </StaticRouter>
  );
}

export function render(location = "/") {
  return ReactDOMServer.renderToString(<App location={location} />);
}
