import "../styles";
import { createContext } from "react";

export const AppContext = createContext({
  displaySidebar: false,
  setDisplaySidebar: (bol: boolean) => {
    console.log(bol);
  }
});
