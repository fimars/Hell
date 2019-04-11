import * as React from "react";
import { render, hydrate } from "react-dom";
import App from "./app";

const isDev = process.env.NODE_ENV === "development";
const mount = isDev ? render : hydrate;

mount(<App />, document.getElementById("app"));
