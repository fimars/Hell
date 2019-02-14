import fs = require("fs-extra");
import globby = require("globby");
import marked = require("marked");
import path = require("path");
import merge = require("lodash.merge");

import { extractHeaders, parseFrontmatter } from "../util/index";

interface PageData {
  file: string;
  key: string;
  path: string;
  headers?: any;
  frontmatter?: any;
  excerpt?: any;
}

export default async function resolveOptions(sourceDir) {
  const patterns = ["**/*.md", "!node_modules"];
  const pageFiles = await globby(patterns, { cwd: sourceDir });

  const pagesData = await Promise.all(
    pageFiles.map(async file => {
      const filepath = path.resolve(sourceDir, file);
      const data: PageData = {
        file, // TODO: remove this attr after server side render the router file.
        key:
          "v-" +
          Math.random()
            .toString(16)
            .slice(2),
        path: filepath
      };

      const content = await fs.readFile(filepath, "utf-8");
      const frontmatter = parseFrontmatter(content);

      const headers = extractHeaders(frontmatter.content, [], marked.lexer);
      if (headers.length) {
        data.headers = headers;
      }
      if (Object.keys(frontmatter.data).length) {
        data.frontmatter = frontmatter.data;
      }
      // TODO: 之后放到前端进行处理，支持更多的自定义功能。
      if (frontmatter.content) {
        data.excerpt = marked(frontmatter.content);
      }
      return data;
    })
  );

  const siteData = {
    pages: pagesData,
    title: "Welcome To HELL"
  };

  const options = mergeCustomOption({
    markdown: marked,
    siteData,
    sourceDir
  });

  return options;
}

function mergeCustomOption(options) {
  const { sourceDir } = options;
  const configPath = path.resolve(sourceDir, "hell.config.js");
  if (fs.existsSync(configPath)) {
    const customOptions = require(configPath);
    return merge(options, customOptions);
  } else {
    return options;
  }
}
