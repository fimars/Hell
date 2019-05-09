// import Search from "./Search";
// import Mask from "./SideMask";
import NavBarLinks from "./NavBarLinks";
import Mask from "./Mask";
import Search from "./Search";
import { useContext } from "react";
import { AppContext } from "#theme/browser";
import * as React from "react";

export default function NavBar() {
  const { displaySidebar } = useContext(AppContext);
  return (
    <div className="navbar">
      {displaySidebar && <Mask />}
      <NavBarLinks />
      <Search />
    </div>
  );
}
