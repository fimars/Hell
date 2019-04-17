import Toc from "./Toc";
import SidebarLinks from "./SidebarLinks";
import { useContext } from "react";
// @ts-ignore
import { PageDataContext } from "#hell/context";
import { AppContext } from "@theme/browser";
import * as React from "react";

export default function Sidebar() {
  const { headers, frontmatter } = useContext(PageDataContext);
  const { displaySidebar } = useContext(AppContext);
  const hideSidebar = frontmatter && frontmatter.sidebar === false;

  const sideClassName = [
    "side",
    displaySidebar ? "side-open" : "",
    hideSidebar ? "side-hide" : ""
  ].join(" ");

  return (
    <div className={sideClassName}>
      <SidebarLinks />
      {!hideSidebar && <Toc headings={headers} />}
    </div>
  );
}
