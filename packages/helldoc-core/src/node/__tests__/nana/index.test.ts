import { Nana } from "../../nana";
import { join } from "path";

describe("Nana", () => {
  const fixutreDir = join(__dirname, "../fixtures");
  const nana = new Nana(
    {
      cwd: fixutreDir
    },
    {
      theme: "./theme"
    }
  );

  it("prepare the nana.", () => {
    expect(nana.resolveCwd()).toBe(fixutreDir);
    expect(nana.resolveNana()).toBe(join(fixutreDir, ".nana"));
    expect(nana.theme).toBe(join(fixutreDir, "theme"));
  });
});
