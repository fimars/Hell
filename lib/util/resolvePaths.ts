import { resolve } from "path";

const rootPath = resolve(__dirname, "../../");

export const atRoot = (path = "") => resolve(rootPath, path);
export const atLib = (path = "") => resolve(rootPath, "lib", path);

export const atWebpack = (path = "") => resolve(rootPath, "lib/webpack", path);
export const atApp = (path = "") => resolve(rootPath, "lib/app", path);
