import siteData from "@internal/site-data";
import * as React from "react";
import { Link } from "react-router-dom";

const NavBarStyle: React.CSSProperties = {
  padding: "0 20px",
  display: "flex",
  boxSizing: "border-box",
  width: "100%",
  boxShadow: "0 0 4px 0 rgba(0, 0, 0, .14)",
  borderTop: "4px solid #606060",
  borderBottom: "1px solid #eee",
  fontWeight: 600,
  fontSize: "14px"
};
const NavStyle: React.CSSProperties = {
  lineHeight: "54px",
  paddingLeft: "18px",
  paddingRight: "18px",
  color: "#000"
};

export default () => (
  <div style={NavBarStyle}>
    {siteData.themeConfig.nav.map(({ text, link }, idx) => (
      <Link key={idx} to={link} style={NavStyle}>
        <div>{text}</div>
      </Link>
    ))}
  </div>
);
