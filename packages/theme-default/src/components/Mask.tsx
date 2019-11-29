import { useContext } from "react";
import { AppContext } from "@theme/browser";
import React from "react";

export default function Mask() {
  const { setDisplaySidebar } = useContext(AppContext);
  const closeSideBar = () => {
    setDisplaySidebar(false);
  };
  return <div className="side-mask" onClick={closeSideBar} />;
}
