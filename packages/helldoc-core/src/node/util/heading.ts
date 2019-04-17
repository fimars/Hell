import * as marked from "marked";
import { TocHeader } from "../../types";

interface Header extends marked.Tokens.Heading {
  id: string;
  parent: string | null;
}

export function extractHeaders(
  content: string,
  parser: any = marked.lexer
): TocHeader[] {
  const tokens: marked.TokensList = parser(content);
  const headingTokens = tokens.filter(
    token => token.type === "heading"
  ) as Header[];
  const slugger = new marked.Slugger();

  const headers: TocHeader[] = headingTokens.map(({ depth, text }) => ({
    id: slugger.slug(text),
    level: depth,
    text,
    parent: null
  }));
  headers.forEach((header, idx) => {
    header.parent = findHeaderParent(header.level, idx - 1, headers);
  });
  return headers;
}

function findHeaderParent(
  level: number,
  idx: number,
  tokens: TocHeader[]
): string | null {
  for (; idx >= 0; idx--) {
    const prevToken = tokens[idx];
    if (level > prevToken.level) {
      return prevToken.id;
    }
    if (prevToken.level === level) {
      return prevToken.parent || null;
    }
  }
  return null;
}
