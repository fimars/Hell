import siteData from "@internal/site-data";
import * as fs from "fs-extra";
import { render } from "./server";
import { resolve } from "path";

const css = fs.readdirSync(resolve(__dirname, "../assets/css"));
const js = fs.readdirSync(resolve(__dirname, "../assets/js"));
function template(content: string) {
  console.log(content);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  ${css
    .map(
      file =>
        `<link rel="stylesheet" type="text/css" href="./assets/css/${file}"></link>`
    )
    .join("\n")}
  <title>Hell SSR</title>
</head>
<body>
  <div id="app">
    ${content}
  </div>
  ${js.map(file => `<script src="./assets/js/${file}"></script>`).join("\n")}
</body>
</html>`;
}
console.log(render("README.1"));
// extract
siteData.pages.forEach(page =>
  fs.writeFileSync(
    resolve(__dirname, "..", (page.path.slice(1) || "index") + ".html"),
    template(render(page.path))
  )
);
