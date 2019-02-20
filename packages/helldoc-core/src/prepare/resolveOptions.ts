import globby = require("globby");

import { existsSync, readFileSync } from "fs-extra";
import { resolve } from "path";
import { parseFrontmatter } from "../util";
import { isIndexFile } from "./util";

interface PageData {
  path: string;
  title?: string;
  frontmatter?: {
    [key: string]: string;
  };
}
interface SiteConfig {
  title: string;
  description: string;
  dest: string;
  base: string;
}
export interface SiteData {
  title: string;
  description: string;
  base: string;
  pages: PageData[];
}
export interface HellOptions {
  siteConfig: SiteConfig;
  sourceDir: string;
  outDir: string;
  publicPath: string;
  pageFiles: string[];
  siteData?: SiteData;
}

export default async function resolveOptions(sourceDir: string) {
  const configPath = resolve(sourceDir, "hell.config.js");
  const siteConfig: SiteConfig = existsSync(configPath)
    ? require(configPath)
    : {};

  const options: HellOptions = {
    siteConfig,
    sourceDir,
    outDir: siteConfig.dest
      ? resolve(siteConfig.dest)
      : resolve(sourceDir, "dist"),
    publicPath: siteConfig.base || "/public",
    pageFiles: await globby(["**/*.md"], { cwd: sourceDir })
  };

  const pagesData = options.pageFiles.map(file => {
    const urlPath = isIndexFile(file) ? "/" : `/${file.replace(/\.md$/, "")}`;
    const content = readFileSync(resolve(sourceDir, file), "utf-8");
    const data: PageData = {
      path: urlPath
    };

    // extract yaml frontmatter
    const frontmatter = parseFrontmatter(content);
    // infer title
    const titleMath = frontmatter.content.trim().match(/^#+\s+(.*)/);
    if (titleMath) {
      data.title = titleMath[1];
    }
    delete frontmatter.content;
    if (Object.keys(frontmatter.data).length) {
      data.frontmatter = frontmatter.data;
    }
    return data;
  });

  options.siteData = {
    title: siteConfig.title,
    description: siteConfig.description,
    base: siteConfig.base || "/",
    pages: pagesData
  };

  return options;
}
