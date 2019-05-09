import webpack = require("webpack");
import qs = require("querystring");
import { Nana } from "../nana";

// Modify By:
// Ref: https://github.com/saberland/saber/blob/master/packages/saber/vue-renderer/lib/saber-page-loader.js

export default function(this: webpack.loader.LoaderContext, source: string) {
  const pageId =
    this.resourceQuery &&
    (qs.parse(this.resourceQuery.slice(1)).nanaPage as string);

  if (!pageId) return source;

  const api = this.query.api as Nana;
  const page = api.pages.get(pageId);

  if (!page) throw new Error("miss page : (");

  this.addDependency(api.resolveNana(`pages/${pageId}.nana`));

  const transformer = api.transformers.get(page.contentType);

  if (!transformer) throw new Error("miss transformer : (");

  return `
import * as React from 'react';
${transformer.getPageComponent(page)}
  `.trim();
}
