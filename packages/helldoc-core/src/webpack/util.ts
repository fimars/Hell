import { resolve } from "path";

export function resolveAppPath(path: string) {
  return resolve(__dirname, "../../app/", path);
}
