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

export default function NavBar() {
  const navs = resolveNavs();
  return (
    <div style={NavBarStyle}>
      {navs.map(({ text, link }, idx) => (
        <Link key={idx} to={link} style={NavStyle}>
          <div>{text}</div>
        </Link>
      ))}
    </div>
  );
}

function resolveNavs() {
  if (siteData && siteData.themeConfig) {
    return siteData.themeConfig.nav || [];
  } else {
    return siteData.pages
      .filter(page => page.title)
      .map(page => ({ text: page.title, link: page.path }));
  }
}
