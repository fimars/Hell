import { Nana } from "../nana";
import { parseFrontmatter } from "../utils/matter";
import md from "../markdown";

const ID = "builtin:transformer-markdown";

export const name = ID;

export const apply = (api: Nana) => {
  api.transformers.add("markdown", {
    extensions: ["md"],
    parse(page) {
      const { data, content } = parseFrontmatter(page.content);
      page.attributes = { ...page.attributes, ...data };
      page.content = content;
    },
    transform(page) {
      const markdown = md();
      page.content = markdown(page.content);
    },
    getPageComponent(page) {
      console.log(
        `Transfer markdown ${page.internal.relative} at:`,
        new Date()
      );
      return [
        `import LayoutManager from '#hell/components/LayoutManager'`,
        `export default () => {
            return (
              <LayoutManager renderContent={
                () => <div className='markdown-body section' dangerouslySetInnerHTML={{ __html: \`${
                  page.content
                }\` }}></div>
              } />
            );
          }
        `
      ].join("\n");
    }
  });
};
