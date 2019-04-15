import { HashLink as Link } from "react-router-hash-link";
import { nav } from "../themeConfig";
import { useContext } from "react";
import { AppContext } from "@theme/browser";
import * as React from "react";

export default function NavBarLinks() {
  const { setDisplaySidebar, displaySidebar } = useContext(AppContext);

  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };

  return (
    <div className="nav-left">
      <i className="fas fa-bars mobile-bar" onClick={toggleSidebar} />
      {nav.map(({ text, link }, idx) => (
        <Link key={idx} to={link} className="nav-link">
          <div>{text}</div>
        </Link>
      ))}
    </div>
  );
}
