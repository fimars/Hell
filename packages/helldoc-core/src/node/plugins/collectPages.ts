import { Nana } from "../nana";
import globby = require("globby");
import hash = require("hash-sum");
import { join } from "path";
import { readFileSync, outputFile } from "fs-extra";
import { PageFile } from "../nana/Pages";

const ID = "builtin:collect-pages-data";

export const name = ID;
export const apply = (api: Nana) => {
  api.hooks.beforeRun.tapPromise(ID, async () => {
    const pagesDir = api.resolveCwd("pages");
    const filePatterns = ["**/*.md", "!**/{node_modules,dist,vendor}/**"];

    const files: PageFile[] = await globby(filePatterns, {
      cwd: pagesDir,
      dot: false
    }).then(files =>
      Promise.all(
        files.map(async path => {
          const relative = path;
          const absolute = join(pagesDir, relative);
          const content = readFileSync(absolute, "utf8");
          return { relative, absolute, content };
        })
      )
    );

    for (const file of files) {
      await api.pages.createPage(file);
    }

    api.hooks.emitPages.tapPromise("pages", async () => {
      const pages = Array.from(api.pages.values());
      console.log("Emitting pages");

      await Promise.all(
        pages.map(async page => {
          if (page.internal.saved) return;

          const newContentHash = hash(page);

          const outPath = api.resolveNana("pages", `${page.internal.id}.nana`);

          console.log(`Emitting page:\n  ${outPath}`);
          await outputFile(outPath, newContentHash, "utf8");
          page.internal.saved = true;
        })
      );
    });

    await api.hooks.emitPages.promise();
    await api.hooks.emitRoutes.promise();
  });
};
