/// <reference path="../types.ts" />
import * as React from "react";

import { Location } from 'history';
import { parse as qsparse } from "querystring";
import { Link } from "react-router-dom";

// Libs
import { jumpTo } from "../lib/helper";

class CanJumpNavLink extends React.Component<Hell.Heading, {}> {
  public render() {
    const { text, id, level } = this.props
    const propsData = {
      dangerouslySetInnerHTML: { __html: text },
      onClick: () => jumpTo(id),
      to: '?id=' + encodeURIComponent(id)
    }

    return <Link {...propsData} />
  }
}

class NavLabel extends React.Component<Hell.Heading, {}> {
  public render() {
    const { level, text, id, parent } = this.props
    const propsData = { text, id, level }
    const className = `nav-label__item level-${level}`
    return (
      <div className={className}>
        <CanJumpNavLink {...propsData} />
      </div>
    );
  }
}

interface TocProps {
  headings: Hell.Heading[]
}
class Toc extends React.Component<TocProps, {}> {
  public render() {
    const { headings } = this.props;
    return headings.map((heading, idx) => <NavLabel key={idx} {...heading} />);
  }
}

export default Toc;
