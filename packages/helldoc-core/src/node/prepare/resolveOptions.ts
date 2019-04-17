import globby = require("globby");
import { SiteConfig, AppContext, PageData, CLIOptions } from "../../types";
import { existsSync, readFileSync } from "fs-extra";
import { resolve } from "path";
import { extractHeaders } from "../util/heading";
import { parseFrontmatter } from "../util/matter";
import { isIndexFile, createTemp } from "./util";
import { toComponentName } from "./util";
import { resolvePackage } from "../webpack/util";

const { writeTemp, genTempRuntime, tempPath } = createTemp();

export default async function resolveOptions(
  sourceDir: string,
  cliOptions: CLIOptions
) {
  const configPath = resolve(sourceDir, "hell.config.js");
  const siteConfig: SiteConfig = existsSync(configPath)
    ? require(configPath)
    : {};

  let themePath: string;
  if (siteConfig.theme) {
    themePath = resolvePackage(siteConfig.theme, {
      prefix: "helldoc-theme-"
    });
  } else {
    themePath = resolvePackage("helldoc-theme-default", {
      cwd: __dirname
    });
  }

  const ctx: AppContext = {
    siteConfig,
    sourceDir,
    outDir: cliOptions.output
      ? resolve(sourceDir, cliOptions.output)
      : siteConfig.dest
      ? resolve(sourceDir, siteConfig.dest)
      : resolve(sourceDir, "dist"),
    base: siteConfig.base || "/",
    pageFiles: await globby(["**/*.md"], {
      cwd: sourceDir,
      ignore: siteConfig.ignores || []
    }),
    themePath,
    writeTemp,
    genTempRuntime,
    tempPath
  };

  const pagesData = ctx.pageFiles.map(file => {
    const urlPath = isIndexFile(file) ? "/" : `/${file.replace(/\.md$/, "")}`;
    const absolutePath = resolve(sourceDir, file);
    const content = readFileSync(absolutePath, "utf-8");
    const data: PageData = {
      path: urlPath,
      component: toComponentName(file)
    };

    // extract yaml frontmatter
    const frontmatter = parseFrontmatter(content);

    // infer title
    const titleMath = frontmatter.content.trim().match(/^#+\s+(.*)/);
    if (titleMath) {
      data.title = titleMath[1];
    }
    if (content) {
      data.headers = extractHeaders(frontmatter.content);
    }
    delete frontmatter.content;
    if (Object.keys(frontmatter.data).length) {
      data.frontmatter = frontmatter.data;
    }
    return data;
  });

  ctx.siteData = {
    title: siteConfig.title || "Welcome~",
    description:
      siteConfig.description || "A Doc Web Application base HellDoc.",
    base: siteConfig.base || "/",
    pages: pagesData,
    themeConfig: siteConfig.themeConfig
  };

  return ctx;
}
