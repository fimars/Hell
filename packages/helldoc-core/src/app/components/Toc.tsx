import * as React from "react";
import Heading from "../components/Heading";
import siteData from "@internal/site-data";
import { Link } from "react-router-dom";

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
    const navs = this.resolveNavs();
    return (
      <div
        className={`sidebar fullwidth ${this.props.sideBarDisplay &&
          `sidebar-open`}`}
      >
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
  resolveNavs() {
    if (siteData && siteData.themeConfig) {
      return siteData.themeConfig.nav || [];
    } else {
      return siteData.pages
        .filter(page => page.title)
        .map(page => ({ text: page.title, link: page.path }));
    }
  }
}

export default Toc;
