import * as toml from "toml";
import * as matter from "gray-matter";

export function parseFrontmatter(content: string) {
  return matter(content.trim(), {
    engines: {
      toml: toml.parse.bind(toml)
    },
    excerpt: true,
    excerpt_separator: "<!-- more -->"
  });
}
