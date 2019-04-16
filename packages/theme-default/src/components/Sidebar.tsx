import Toc from "./Toc";
import SidebarLinks from "./SidebarLinks";
import { useContext } from "react";
// @ts-ignore
import { PageDataContext } from "#hell/context";
import { AppContext } from "@theme/browser";
import * as React from "react";

export default function Sidebar() {
  const {
    headers,
    frontmatter: { sidebar }
  } = useContext(PageDataContext);
  const { displaySidebar } = useContext(AppContext);
  const setSidebarHide = sidebar === false;

  const sideClassName = [
    "side",
    displaySidebar ? "side-open" : "",
    setSidebarHide ? "side-hide" : ""
  ].join(" ");

  return (
    <div className={sideClassName}>
      <SidebarLinks />
      {!setSidebarHide && <Toc headings={headers} />}
    </div>
  );
}
