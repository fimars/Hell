import AppRouter from "./components/AppRouter";
import { siteData } from "./runtime";
import { StaticRouter } from "react-router-dom";
import React from "react";
import { renderToString } from "react-dom/server";
// @ts-ignore
import { ChunkExtractor } from "@loadable/server";
import { resolve } from "path";

function App(props: { location: string }) {
  const { base } = siteData;
  let basename = base;
  if (base.startsWith("/")) basename = base.slice(1);
  if (basename.endsWith("/")) basename = base.slice(0, -1);
  return (
    <StaticRouter basename={basename} location={props.location}>
      <AppRouter />
    </StaticRouter>
  );
}

export function render(location = "/") {
  const statsFile = resolve(__dirname, "../web-stats.json");
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["client"] });

  const jsx = extractor.collectChunks(<App location={location} />);
  const content = renderToString(jsx);
  const scripts = extractor.getScriptTags();
  const links = extractor.getLinkTags();
  const styles = extractor.getStyleTags();
  return { content, scripts, links, styles };
}
