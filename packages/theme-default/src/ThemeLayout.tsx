import NavBar from "@theme/components/NavBar";
import { AppContext } from "@theme/browser";
import { useState } from "react";
import * as React from "react";

export default function GlobalLayout(props) {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  return (
    <AppContext.Provider
      value={{
        displaySidebar,
        setDisplaySidebar
      }}
    >
      <>
        <NavBar />
        {props.children}
      </>
    </AppContext.Provider>
  );
}
