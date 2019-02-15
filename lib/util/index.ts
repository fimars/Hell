import matter = require("gray-matter");
import toml = require("toml");
import { TokensList, Tokens } from "marked";

interface HellHeader extends Tokens.Heading {
  id?: string;
  parent?: HellHeader;
}

export function extractHeaders(content: string, include: string[], lexer: any) {
  const tokens = lexer(content) as TokensList;
  const headerTokens = tokens.filter(
    ({ type }) => type === "heading"
  ) as HellHeader[];
  const headers = headerTokens.map(({ depth, text }, headerIndex) => {
    return {
      id: text,
      level: depth,
      parent: findHeaderParent(depth, headerIndex, headerTokens),
      text
    };
  });
  return headers;
}

function findHeaderParent(depth: number, idx: number, headers: HellHeader[]) {
  for (; idx > 0; idx--) {
    const { depth: prevDepth, id: prevId, parent: prevParent } = headers[idx];
    if (depth > prevDepth) {
      return prevId;
    }
    if (prevParent && prevDepth === depth) {
      return prevParent;
    }
  }
  return null;
}

export function parseFrontmatter(content: string) {
  return matter(content, {
    engines: {
      toml: toml.parse.bind(toml)
    },
    excerpt: true,
    excerpt_separator: "<!-- more -->"
  });
}
