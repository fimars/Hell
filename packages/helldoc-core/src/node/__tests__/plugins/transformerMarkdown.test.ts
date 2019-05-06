import { apply } from "../../plugins/transformerMarkdown";
import { join } from "path";
import { Nana } from "../../nana";
import { Page } from "../../nana/Pages";
import { readFileSync } from "fs";

describe("transformerMarkdown", () => {
  const nana = new Nana({
    cwd: join(__dirname, "../fixtures"),
    __withoutBuiltinPlugins__: true
  });
  apply(nana);

  it("had markdown transformer", () => {
    expect(nana.transformers.get("markdown")).toBeTruthy();
  });

  it("can transformer ma.rkdown pages", () => {
    const mdTransformer = nana.transformers.get("markdown");

    if (!mdTransformer) throw new Error("miss md transformer");

    const page: Page = {
      attributes: {},
      internal: {
        id: "",
        absolute: "",
        relative: "",
        saved: false
      },
      contentType: "",
      content: readFileSync(join(__dirname, "../fixtures/A.md"), "utf8")
    };
    mdTransformer.parse(page);
    expect(page.attributes.title).toEqual("Fixture A");
    mdTransformer.transform(page);
    expect(page.content.trim()).toEqual('<h1 id="a">A</h1>');
  });
});
