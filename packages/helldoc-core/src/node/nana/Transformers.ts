import { Page } from "./Pages";

// Modify by Saber's Transformers.
// ref: https://github.com/saberland/saber/blob/master/packages/saber/lib/Transformers.js

export type Transformer = {
  extensions: string[];
  parse: (file: Page) => void;
  transform: (file: Page) => void;
  getPageComponent: (file: Page) => string;
};

export default class Transformers {
  transformers: Map<string, Transformer>;

  constructor() {
    this.transformers = new Map();
  }

  add(contentType: string, transformer: Transformer) {
    this.transformers.set(contentType, transformer);
  }

  get(contentType: string) {
    return this.transformers.get(contentType);
  }

  getContentTypeByExtension(extension: string) {
    for (const [contentType, transformer] of this.transformers.entries()) {
      if (
        transformer.extensions &&
        transformer.extensions.includes(extension)
      ) {
        return contentType;
      }
    }
    return "";
  }
}
