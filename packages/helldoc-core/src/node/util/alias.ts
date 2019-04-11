import { resolve } from "path";

export function resolveApp(path: string) {
  return resolve(__dirname, "../../app", path);
}
