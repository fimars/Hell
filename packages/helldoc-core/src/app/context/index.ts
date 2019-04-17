import { createContext } from "react";
import { PageData } from "../../types";

export const PageDataContext = createContext<PageData>({
  component: "",
  path: ""
});
