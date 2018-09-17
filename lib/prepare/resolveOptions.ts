import fs = require("fs-extra");
import globby = require("globby");
import marked = require("marked");
import path = require("path");

export default async function resolveOptions(sourceDir) {
  const patterns = ["**/*.md", "!.vuepress", "!node_modules"];
  const pageFiles = await globby(patterns, { cwd: sourceDir });

  const pagesData = await Promise.all(
    pageFiles.map(async file => {
      const key = "v-" + Math.random();
      const title = file;
      const resolvePath = path.resolve(sourceDir, file);
      const headers = [];

      // setup marked header's render
      const renderer = new marked.Renderer();
      renderer.heading = extractHeaders(headers);
      marked.setOptions({ renderer });

      const content = await fs.readFile(resolvePath, "utf8");
      const excerpt = marked(content, void 0);
      return {
        content,
        excerpt,
        headers,
        key,
        title
      };
    })
  );

  const siteData = {
    pages: pagesData,
    title: "siteTitle"
  };

  const options = {
    siteData
  };

  return options;
}

function extractHeaders(headers) {
  return (text, level) => {
    const id = text;
    const heading = { text, level, id, parent: null };

    for (let idx = headers.length; idx > 0; idx--) {
      const prev = headers[idx - 1];
      if (heading.level > prev.level) {
        heading.parent = prev.id;
        break;
      } else if (heading.level === prev.level && prev.parent) {
        heading.parent = prev.parent;
        break;
      }
    }
    headers.push(heading);
    return `<h${level} id="${id}">${text}</h${level}>`;
  };
}
