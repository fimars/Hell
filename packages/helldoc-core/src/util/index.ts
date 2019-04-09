import * as matter from "gray-matter";
import { TokensList, Tokens, Slugger } from "marked";
import { TocHead } from "../types";
import toml = require("toml");

interface HellHeader extends Tokens.Heading {
  id?: string;
  parent?: string;
}
export function extractHeaders(content: string, lexer: any): TocHead[] {
  const tokens = lexer(content) as TokensList;
  const headerTokens = tokens.filter(
    ({ type }) => type === "heading"
  ) as HellHeader[];
  const slugger = new Slugger();
  const headers = headerTokens.map(({ depth, text }, headerIndex) => {
    const parent = findHeaderParent(depth, headerIndex, headerTokens);
    return {
      id: slugger.slug(text),
      level: depth,
      parent,
      text
    };
  });
  return headers;
}
function findHeaderParent(
  depth: number,
  idx: number,
  headers: HellHeader[]
): string | null {
  for (; idx > 0; idx--) {
    const { depth: prevDepth, id: prevId, parent: prevParent } = headers[idx];
    if (depth > prevDepth) {
      return prevId as string;
    }
    if (prevParent && prevDepth === depth) {
      return prevParent;
    }
  }
  return null;
}

export function parseFrontmatter(content: string) {
  return matter(content.trim(), {
    engines: {
      toml: toml.parse.bind(toml)
    },
    excerpt: true,
    excerpt_separator: "<!-- more -->"
  });
}
