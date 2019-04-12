import md from "../markdown";
import { parseFrontmatter } from "../util/matter";

export default function MarkdownLoader(source: string) {
  return markdownToReact(source);
}

export function markdownToReact(source: string) {
  const markdown = md();
  const frontmatter = parseFrontmatter(source);
  const markdownHTML = JSON.stringify(markdown(frontmatter.content));
  const importDeps = [
    `import * as React from 'react';`,
    `import LayoutManager from '@hell/components/LayoutManager'`
  ].join("\n");
  const htmlToReact = (html: string) =>
    `
    export default function () {
      return (
        <LayoutManager renderContent={
          () => <div className='markdown-body section' dangerouslySetInnerHTML={{ __html: ${html} }}></div>
        } />
      );
    }
  `.trim();
  const res = [importDeps, htmlToReact(markdownHTML)].join("\n");

  return res;
}
