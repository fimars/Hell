import { Compiler } from "webpack";
import { Tag } from "../types";

interface HeadPluginOptions {
  tags: Tag[];
}

export = class HeadPlugin {
  tags: Tag[] = [];
  constructor({ tags }: HeadPluginOptions) {
    this.tags = tags;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("helldoc-site-head", compilation => {
      (compilation.hooks as any).htmlWebpackPluginAlterAssetTags.tapAsync(
        "helldoc-site-data",
        (data: any, cb: any) => {
          try {
            this.tags.forEach(tag => {
              data.head.push(normalizeHeadTag(tag));
            });
          } catch (e) {
            return cb(e);
          }
          cb(null, data);
        }
      );
    });
  }
};

function normalizeHeadTag([tagName, attributes = {}, innerHTML = ""]: Tag) {
  return {
    tagName,
    attributes,
    innerHTML,
    closeTag: !(tagName === "meta" || tagName === "link")
  };
}
