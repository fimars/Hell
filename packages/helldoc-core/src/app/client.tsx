import "@theme/browser";
import App from "./app";
import { render, hydrate } from "react-dom";
// @ts-ignore
import { loadableReady } from "@loadable/component";
import * as React from "react";

const isDev = process.env.NODE_ENV === "development";
const el = document.getElementById("app");

if (isDev) {
  render(<App />, el);
} else {
  loadableReady(() => {
    hydrate(<App />, el);
  });
}
