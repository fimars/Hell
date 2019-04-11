import { isAbsolute } from "path";
import { resolveApp } from "../../util/alias";

it("should be a absolute path", () => {
  expect(isAbsolute(resolveApp(""))).toBeTruthy();
  expect(isAbsolute(resolveApp("file"))).toBeTruthy();
  expect(isAbsolute(resolveApp("dir/file"))).toBeTruthy();
});
