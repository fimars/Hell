import qs from "querystring";
// Packages
import React from "react";
import { NavLink } from "react-router-dom";

// Libs
import { jumpTo } from "../lib/helper";

const CanJumpNavLink = ({ name, location }) => (
  <NavLink
    activeClassName="selected"
    isActive={() =>
      location.search && qs.parse(location.search.slice(1)).id === name
    }
    to={"?id=" + encodeURIComponent(name)}
    onClick={() => jumpTo(name)}
  >
    {name}
  </NavLink>
);

const NavLabel = ({ level, text, children, location }) => {
  return [
    <div key="label" className={level === 1 ? "label" : ""}>
      <CanJumpNavLink name={text} location={location} />
    </div>,
    children.length ? (
      <div key="post" className="label-post">
        {makeNavLabels(children, location)}
      </div>
    ) : null
  ];
};
const makeNavLabels = (nodes, location) =>
  nodes.map((node, index) => (
    <NavLabel key={index} location={location} {...node} />
  ));

const Nav = ({ headings, location }) => makeNavLabels(headings, location);

export default Nav;
