import Toc from "./Toc";
import SidebarLinks from "./SidebarLinks";
import { useContext } from "react";
// @ts-ignore
import { PageDataContext } from "#hell/context";
import { AppContext } from "@theme/browser";
import * as React from "react";

export default function Sidebar() {
  const { headers } = useContext(PageDataContext);
  const { displaySidebar } = useContext(AppContext);
  return (
    <div className={`side ${displaySidebar ? "side-open" : ""}`}>
      <SidebarLinks />
      <Toc headings={headers} />
    </div>
  );
}
