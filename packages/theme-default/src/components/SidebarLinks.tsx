import { HashLink as Link } from "react-router-hash-link";
import { nav } from "../themeConfig";
import * as React from "react";

export default function SidebarLinks() {
  return (
    <div className="sidebar-top">
      {nav.map(({ text, link }) => (
        <Link key={text} to={link} className="nav-link">
          <div>{text}</div>
        </Link>
      ))}
    </div>
  );
}
