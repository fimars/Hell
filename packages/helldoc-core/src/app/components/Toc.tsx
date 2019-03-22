import * as React from "react";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import { navs } from "../data/navs";

interface HeadingData {
  level: number;
  text: string;
  id: string;
  parent?: string;
}

interface TocProps {
  headings: HeadingData[];
  sideBarDisplay: boolean;
}

function SideNavs() {
  return navs.map(({ text, link }) => (
    <Link key={text} to={link} className="navstyle">
      <div>{text}</div>
    </Link>
  ));
}

interface HeadingLinkProps {
  heading: HeadingData;
}
class HeadingLink extends React.PureComponent<HeadingLinkProps> {
  render() {
    const { heading } = this.props;
    return (
      <Heading level={heading.level}>
        <Link {...this.getLinkProps(heading)} />
      </Heading>
    );
  }

  private getLinkProps({ text }: HeadingData) {
    const clearText = text.replace(/\(.*\)/, "");
    return {
      dangerouslySetInnerHTML: { __html: clearText },
      replace: false,
      to: "#" + encodeURIComponent(clearText)
    };
  }
}

class Toc extends React.Component<TocProps> {
  public render() {
    const { headings } = this.props;
    return (
      <div
        className={`sidebar fullwidth ${this.props.sideBarDisplay &&
          `sidebar-open`}`}
      >
        <div className="sidebar-top fullwidth">{SideNavs()}</div>
        <div className="sibar-bottom fullwidth">
          {headings.map(heading => (
            <Heading key={heading.id} level={heading.level}>
              <HeadingLink heading={heading} key={heading.id} />
            </Heading>
          ))}
        </div>
      </div>
    );
  }
}

export default Toc;
