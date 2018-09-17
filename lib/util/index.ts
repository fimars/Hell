import matter = require('gray-matter');
import toml = require('toml');

export function extractHeaders(content, include = [], lexer) {
  const tokens = lexer(content);
  const headerTokens = tokens.filter(({ type }) => type === 'heading')
  const headers = headerTokens.map(({depth, text}, headerIndex) => {
    return {
      id: text,
      level: depth,
      parent: findHeaderParent(depth, headerIndex, headerTokens),
      text
    };
  });
  return headers;
}

function findHeaderParent(depth, idx, headers) {
  for (; idx > 0 ; idx--) {
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

export function parseFrontmatter (content) {
  return matter(content, {
    engines: {
      toml: toml.parse.bind(toml)
    },
    excerpt: true,
    excerpt_separator: '<!-- more -->'
  })
}