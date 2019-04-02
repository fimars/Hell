import siteData from "@internal/site-data";
import * as fs from "fs-extra";
import { render } from "./server";

// extract
siteData.pages.forEach(page =>
  fs.writeFileSync(page.component + ".html", render(page.path))
);
console.log(global.RUNTIME_DIST_PATH);
