import { Compiler } from "webpack";
import chalk from "chalk";

interface PluginOptions {
  [key: string]: string;
}

export = class DevLogPlugin {
  options: PluginOptions;
  constructor(options: PluginOptions) {
    this.options = options;
  }

  public apply(compiler: Compiler): void {
    let isFirst = true;
    compiler.hooks.done.tap("helldoc-log", stats => {
      clearScreen();

      const { displayHost, port, publicPath } = this.options;
      const time = (new Date().toTimeString().match(/^[\d:]+/) as string[])[0];
      const displayUrl = `http://${displayHost}:${port}${publicPath}`;

      if (stats.hash && stats.endTime && stats.startTime) {
        console.log(
          `${chalk.gray(`[${time}]`)} Build ${chalk.italic(
            stats.hash.slice(0, 6)
          )}` +
            ` finished in ${Number(stats.endTime) -
              Number(stats.startTime)} ms! ` +
            (isFirst ? "" : `${chalk.gray(`(${displayUrl})`)}`) +
            "  \n"
        );
      }

      if (isFirst) {
        isFirst = false;
        console.log(
          `${chalk.gray(">")} HellDoc dev server listening at ${chalk.cyan(
            displayUrl
          )}`
        );
      }
    });
    compiler.hooks.invalid.tap("helldoc-log", clearScreen);
  }
};

function clearScreen() {
  process.stdout.write("\x1Bc");
}
