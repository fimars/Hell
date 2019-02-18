import { getOptions } from "loader-utils";
import { parseFrontmatter, extractHeaders } from "../util";
import { atApp } from "../util/resolvePaths";

export default function MarkdownLoader(source: string) {
  const { markdown } = getOptions(this);
  const frontmatter = parseFrontmatter(source);

  const headers = extractHeaders(frontmatter.content, [], markdown.lexer);
  const html = markdown(frontmatter.content);
  // TODO: use configurable dir path
  const res = [
    `import * as React from 'react';`,
    `import PageLayout from '${atApp("components/PageLayout")}';`,
    `import Toc from '${atApp("components/Toc")}';`,
    `const headers = ${JSON.stringify(headers)};`,
    `const Article = () => <div className='markdown-body section' dangerouslySetInnerHTML={{ __html: \`${html}\` }}></div>;`,
    `export default () => (<PageLayout Side={ <Toc headings={headers} /> } Content={ <Article /> } />)`
  ].join("\n");

  return res;
}
