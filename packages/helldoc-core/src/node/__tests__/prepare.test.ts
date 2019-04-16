import prepare from "../prepare";
import { resolve } from "path";

it("should not throw error", async () => {
  const docsPath = resolve(__dirname, "fixtures");
  const ctx = await prepare(docsPath);
  expect(ctx.sourceDir).toBe(docsPath);
});
