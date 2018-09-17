import fs = require("fs-extra");
import globby = require("globby");
import marked = require("marked");
import path = require("path");

import {
  extractHeaders, parseFrontmatter
} from '../util/index';

export default async function resolveOptions(sourceDir) {
  const patterns = ["**/*.md", "!.vuepress", "!node_modules"];
  const pageFiles = await globby(patterns, { cwd: sourceDir });

  const pagesData = await Promise.all(
    pageFiles.map(async file => {
      const filepath = path.resolve(sourceDir, file)
      const data: any = {
        key: "v-" + Math.random().toString(16).slice(2),
        path: filepath
      }

      const content = await fs.readFile(filepath, "utf-8");
      const frontmatter = parseFrontmatter(content);
      console.log(frontmatter);
      
      const headers = extractHeaders(
        frontmatter.content,
        [],
        marked.lexer
      )
      if (headers.length) {
        data.headers = headers;
      }
      if (Object.keys(frontmatter.data).length) {
        data.frontmatter = frontmatter.data;
      }
      // TODO: 之后放到前端进行处理，支持更多的自定义功能。
      if (frontmatter.content) {
        data.content = marked(frontmatter.content);
      }
      if (frontmatter.excrept) {
        data.excerpt = marked(frontmatter.excrept);
      }
      return data;
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
