import { CLIOptions } from "../../types";
import resolveOptions from "./resolveOptions";
import genRegistrationFile from "./genRegistrationFile";
import genLayoutsFile from "./genLayoutsFile";

export default async function prepare(
  sourceDir: string,
  cliOptions: CLIOptions = {}
) {
  const ctx = await resolveOptions(sourceDir, cliOptions);

  await ctx.writeTemp(
    "siteData",
    `export default ${JSON.stringify(ctx.siteData, null, 2)}`
  );
  await ctx.writeTemp("pages", await genRegistrationFile(ctx));
  await ctx.writeTemp("layouts", await genLayoutsFile(ctx));

  await ctx.genTempRuntime();

  return ctx;
}
