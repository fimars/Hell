import { load } from "../../utils/configLoader";
import { resolve } from "path";

const options = { cwd: resolve(__dirname, "../fixtures/.helldoc/") };
const valueOfConfig = { attr: "yo" };

it("load js module type config file.", () => {
  expect(load(["yo.js"], options).data).toStrictEqual(valueOfConfig);
});

it("load json type config file", () => {
  expect(load(["yo.json"], options).data).toStrictEqual(valueOfConfig);
});

it("load yaml type config file", () => {
  expect(load(["yo.yaml"], options).data).toStrictEqual(valueOfConfig);
});

it("load config without cwd option", () => {
  expect(load(["yo.js"])).toStrictEqual({});
});

it("load doesn't  exist config file.", () => {
  expect(load([], options)).toStrictEqual({});
});
