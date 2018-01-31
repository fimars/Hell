/// <reference path="../types.ts" />
import { Location } from 'history';
import { parse as qsparse } from "querystring";
import * as React from "react";
import { NavLink } from "react-router-dom";

// Libs
import { jumpTo } from "../lib/helper";

export interface ITocProps {
  headings: Hell.Heading[];
  location: Location
}

const CanJumpNavLink = ({ name, location, id }) => {
  const isActive = () =>
    location.search && qsparse(location.search.slice(1)).id === id;
  const jumpToId = () => jumpTo(id);

  return (
    <NavLink
      activeClassName="selected"
      isActive={isActive}
      to={"?id=" + encodeURIComponent(id)}
      onClick={jumpToId}
    >
      {name}
    </NavLink>
  );
};

interface Iparams {
  level: number;
  text: string;
  id: string;
  parent?: string;
  location: Location;
}
const NavLabel = ({ level, text, id, parent, location }: Iparams) => {
  return (
    <div key={id} className={level === 1 ? "label" : ""}>
      <CanJumpNavLink name={text} id={id} location={location} />
    </div>
  );
};

class Toc extends React.Component<ITocProps, {}> {
  public render() {
    const { location, headings } = this.props;
    return headings.map((heading, idx) => NavLabel({ location, ...heading }));
  }
}

export default Toc;
