import * as fs from "fs-extra";
import { resolve } from "path";
import { AppContext, Tag } from "./types";

type StringMap = { [key: string]: string };
type AppRender = (path: string) => string;

const isCSS = (str: string) => /.+.css$/.test(str);
const isJS = (str: string) => /.+.js$/.test(str);

export default class SSR {
  ctx: AppContext;
  manifest: StringMap;
  render: AppRender;
  template: string;
  manifestPath: string;
  scriptDir: string;
  scriptPath: string;

  constructor(ctx: AppContext, template: string) {
    this.ctx = ctx;

    this.manifestPath = this.resolveOutDir("manifest.json");
    this.scriptDir = this.resolveOutDir("scripts");
    this.scriptPath = this.resolveOutDir("scripts/server.js");

    this.manifest = fs.readJSONSync(this.manifestPath);
    this.render = require(this.scriptPath).render;
    this.template = fs.readFileSync(template).toString();
  }
  public async run() {
    if (!this.ctx.siteData) return;
    const pages = this.ctx.siteData.pages;
    const head = this.ctx.siteConfig.head || [];
    const { scripts, styles } = this.importIt(this.manifest);

    for (const page of pages) {
      const templateData: StringMap = {
        scripts: scripts.join("\n"),
        styles: styles.join("\n"),
        head: this.normalizeHead(head).join("\n")
      };
      await this.extractHTMLFile(page.path, templateData);
    }

    await this.clearOutDir();
  }
  private async clearOutDir() {
    await fs.remove(this.manifestPath);
    await fs.remove(this.scriptDir);
  }

  private resolveOutDir(path: string) {
    return resolve(this.ctx.outDir, path);
  }

  private importIt(manifest: StringMap) {
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
    const content = this.render(path);
    await fs.writeFile(
      filepath,
      this.renderWithTemplate({ content, ...templateData })
    );
  }

  private renderWithTemplate(templateData: StringMap) {
    let html = this.template;
    Object.keys(templateData).forEach(key => {
      html = html.replace(`<!--${key}-->`, templateData[key]);
    });
    return html;
  }
}
