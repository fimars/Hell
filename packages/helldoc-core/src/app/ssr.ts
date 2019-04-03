import * as fs from "fs-extra";
import siteData from "@internal/site-data";
import render from "./server";

import { resolve } from "path";
import { Tag } from "../types";

const isCSS = (str: string) => /.+.css$/.test(str);
const isJS = (str: string) => /.+.js$/.test(str);

const resolveOutput = (path: string) => resolve(__dirname, "..", path);

type Mainfest = { [key: string]: string };

(function ssr() {
  const manifest: Mainfest = fs.readJSONSync(resolveOutput("manifest.json"));
  const head: Tag[] =
    fs.readJSONSync(resolveOutput("head.manifest.json")) || [];
  const { scripts, styles } = importIt(manifest);

  siteData.pages.forEach(page => {
    extractHTMLFile(page.path, scripts, styles, normalizeHead(head));
  });
})();

function normalizeHead(head: Tag[]) {
  return head.map(function([tagName, attrs, innerHTML]) {
    const normalAttrs = Object.keys(attrs).reduce((raw, key) => {
      return `${raw} ${key}="${attrs[key]}"`;
    }, "");

    return innerHTML
      ? `<${tagName} ${normalAttrs}>${innerHTML}</${tagName}>`
      : `<${tagName} ${normalAttrs} />`;
  });
}

function importIt(manifest: Mainfest) {
  const scripts: string[] = [];
  const styles: string[] = [];
  const importStyle = (path: string) =>
    `<link rel="stylesheet" href="${path}" />`;
  const importJS = (path: string) =>
    `<script type="application/javascript" src="${path}"></script>`;

  Object.keys(manifest).forEach(name => {
    const path = manifest[name];
    if (isCSS(name)) {
      styles.push(importStyle(path));
    } else if (isJS(name)) {
      scripts.push(importJS(path));
    }
  });

  return { scripts, styles };
}

function extractHTMLFile(
  path: string,
  scripts: string[],
  styles: string[],
  head: string[]
) {
  const filename = (path.slice(1) || "index") + ".html";
  const filepath = resolveOutput(filename);
  const content = render(path);
  fs.writeFileSync(filepath, template(content, scripts, styles, head));
}

function template(
  content: string,
  scripts: string[],
  styles: string[],
  head: string[]
) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  ${head.join("\n")}
  <title>Hell</title>
  ${styles.join("\n")}
</head>

<body>
  <div id="app">${content}</div>
  ${scripts.join("\n")}
</body>
</html>
  `.trim();
}
