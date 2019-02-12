import { siteData } from "@/.temp/siteData";
import * as React from "react";
import { Link } from "react-router-dom";

const NavBarStyle = {
  width: "100%",
  backgroundColor: "#000",
  display: "flex"
};
const NavStyle = {
  padding: "20px",
  color: "#fff"
};

export default () => (
  <div style={NavBarStyle}>
    {siteData.pages.map((page, idx) => (
      <Link key={idx} to={page.file} style={NavStyle}>
        <div>{page.file}</div>
      </Link>
    ))}
  </div>
);
