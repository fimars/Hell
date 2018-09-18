import { getOptions } from 'loader-utils';
import { parseFrontmatter } from "../util";

export default function(src) {
  const { markdown } = getOptions(this);

  const frontmatter = parseFrontmatter(src);
  const content = frontmatter.content;

  const html = markdown(content);
  const res = 
    `import * as React from 'react';\n` +
    `export default () => <div className='content' />;`;
  console.log(res);
  return res;
}
