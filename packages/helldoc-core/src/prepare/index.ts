import resolveOptions from "./resolveOptions";
import genRegistrationFile from "./genRegistrationFile";

export interface CLIOptions {
  output?: string;
}

export default async function prepare(
  sourceDir: string,
  cliOptions: CLIOptions = {}
) {
  // resolve options
  const ctx = await resolveOptions(sourceDir, cliOptions);

  // @internal/site-data
  await ctx.writeTemp(
    "internal/site-data.js",
    `export default ${JSON.stringify(ctx.siteData, null, 2)}`
  );

  // @internal/pages
  await ctx.writeTemp("internal/pages.js", await genRegistrationFile(ctx));

  return ctx;
}
