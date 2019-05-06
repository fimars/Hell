import { Nana } from ".";
import { extname } from "path";
import hash = require("hash-sum");

export type PageFile = {
  relative: string;
  absolute: string;
  content: string;
};
export type Page = {
  attributes: {
    [key: string]: any;
  };
  internal: {
    id: string;
    absolute: string;
    relative: string;
    saved: boolean;
    [key: string]: any;
  };
  contentType: string;
  content: string;
};

export default class Pages {
  api: Nana;
  pages: Map<string, Page>;

  constructor(api: Nana) {
    this.api = api;
    this.pages = new Map();
  }

  createPage(file: PageFile) {
    const { api } = this;

    const page: Page = {
      attributes: {},
      internal: {
        id: hash(file.relative),
        absolute: file.absolute,
        relative: file.relative,
        saved: false
      },
      contentType: api.transformers.getContentTypeByExtension(
        extname(file.relative).slice(1)
      ),
      content: file.content
    };

    let transformer = api.transformers.get(page.contentType || "default");

    if (!transformer) {
      console.log("Miss transformer.");
    } else {
      if (transformer.parse) {
        transformer.parse(page);
      }
      if (transformer.transform) {
        transformer.transform(page);
      }
    }

    this.pages.set(page.internal.id, page);
  }

  get(id: string) {
    return this.pages.get(id);
  }

  values() {
    return this.pages.values();
  }
}
