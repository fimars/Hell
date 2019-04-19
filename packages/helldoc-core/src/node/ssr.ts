import * as fs from "fs-extra";
import { resolve } from "path";
import { AppContext, Tag } from "../types";

type StringMap = { [key: string]: string };
type AppRender = (
  path: string
) => { scripts: string; links: string; styles: string; content: string };

export default class SSR {
  ctx: AppContext;
  render: AppRender;
  template: string;
  scriptDir: string;
  scriptPath: string;
  webStatsPath: string;

  constructor(ctx: AppContext, template: string) {
    this.ctx = ctx;

    this.scriptDir = this.resolveOutDir("scripts");
    this.webStatsPath = this.resolveOutDir("web-stats.json");
    this.scriptPath = this.resolveOutDir("scripts/server.js");

    this.template = fs.readFileSync(template).toString();
    this.render = require(this.scriptPath).render;
  }
  public async run() {
    if (!this.ctx.siteData) return;
    const pages = this.ctx.siteData.pages;
    const head = this.ctx.siteConfig.head || [];

    for (const page of pages) {
      const { scripts, styles, links, content } = await this.render(page.path);
      const templateData: StringMap = {
        scripts,
        links,
        styles,
        content,
        head: this.normalizeHead(head).join("\n")
      };
      await this.extractHTMLFile(page.path, templateData);
    }

    await this.clearOutDir();
  }
  private async clearOutDir() {
    await fs.remove(this.webStatsPath);
    await fs.remove(this.scriptDir);
  }
  private resolveOutDir(path: string) {
    return resolve(this.ctx.outDir, path);
  }
  private normalizeHead(head: Tag[]) {
    return head.map(function([tagName, attrs, innerHTML]) {
      const normalAttrs = Object.keys(attrs).reduce((raw, key) => {
        return `${raw} ${key}="${attrs[key]}"`;
      }, "");

      return innerHTML
        ? `<${tagName} ${normalAttrs}>${innerHTML}</${tagName}>`
        : `<${tagName} ${normalAttrs} />`;
    });
  }

  private async extractHTMLFile(path: string, templateData: StringMap) {
    const filename = (path.slice(1) || "index") + ".html";
    const filepath = this.resolveOutDir(filename);
    await fs.writeFile(filepath, this.renderWithTemplate({ ...templateData }));
  }
  private renderWithTemplate(templateData: StringMap) {
    let html = this.template;
    Object.keys(templateData).forEach(key => {
      html = html.replace(`<!--${key}-->`, templateData[key]);
    });
    return html;
  }
}
