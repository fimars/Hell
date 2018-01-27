import hl from "../index.js";
import * as runtimeConfig from "./config";

hl.init({
  path: `http://127.0.0.1:${runtimeConfig.DOC_PORT}`
});

hl.init();
