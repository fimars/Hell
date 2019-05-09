import { resolve } from "path";

export function resolveApp(path: string) {
  return resolve(__dirname, "../../../build/app", path);
}

export function resolveStatic(path: string) {
  return resolve(__dirname, "../../../static", path);
}
