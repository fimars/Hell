import { HellOptions } from "./resolveOptions";

export default async function genRoutesFile({
  siteData: { pages }
}: HellOptions) {
  function genRoute({ path }) {}

  return `export const routes = [${pages.map(genRoute).join(",")}\n]`;
}
