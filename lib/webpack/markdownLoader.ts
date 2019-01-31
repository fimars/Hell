import { getOptions } from "loader-utils";
import { parseFrontmatter } from "../util";

export default function MarkdownLoader(src) {
  const { markdown } = getOptions(this);

  const frontmatter = parseFrontmatter(src);
  const content = frontmatter.content;

  const html = markdown(content);
  const res =
    `import * as React from 'react';\n` +
    `export default () => <div className='content' dangerouslySetInnerHTML={{ __html: \`${html}\` }}></div>;`;
  return res;
}
