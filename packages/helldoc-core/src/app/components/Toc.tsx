import * as React from "react";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import { resolveNavs } from "../util";

export interface IHeading {
  level: number;
  text: string;
  id: string;
  parent?: string;
}

class Toc extends React.Component<
  {
    headings: IHeading[];
    sideBarDisplay: boolean;
  },
  {}
> {
  public render() {
    const { headings } = this.props;
    const navs = resolveNavs();
    return (
      <div className={`sidebar fullwidth`}>
        <div className="sidebar-top fullwidth">
          {navs.map(({ text, link }, idx) => (
            <Link key={idx} to={link} className="navstyle">
              <div>{text}</div>
            </Link>
          ))}
        </div>
        <div className="sibar-bottom fullwidth">
          {headings.map((heading, idx) => {
            return (
              <Heading key={idx} level={heading.level}>
                <Link {...this.getLinkProps(heading)} />
              </Heading>
            );
          })}
        </div>
      </div>
    );
  }
  private getLinkProps({ text }: IHeading) {
    const clearText = text.replace(/\(.*\)/, "");
    return {
      dangerouslySetInnerHTML: { __html: clearText },
      replace: false,
      to: "#" + encodeURIComponent(clearText)
    };
  }
}

export default Toc;
