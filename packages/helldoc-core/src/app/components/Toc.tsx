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

function SidebarTop() {
  return (
    <div className="sidebar-top">
      {navs.map(({ text, link }) => (
        <Link key={text} to={link} className="navstyle">
          <div>{text}</div>
        </Link>
      ))}
    </div>
  );
}
interface SidebarBottomProps {
  headings: HeadingData[];
}
function SidebarBottom({ headings }: SidebarBottomProps) {
  return (
    <div className="sibar-bottom">
      {headings.map(heading => (
        <HeadingLink heading={heading} key={heading.id} />
      ))}
    </div>
  );
}

interface TocProps {
  headings: HeadingData[];
  sideBarDisplay: boolean;
}
class Toc extends React.Component<TocProps> {
  public render() {
    const { headings } = this.props;
    return (
      <div className="sidebar">
        <SidebarTop />
        <SidebarBottom headings={headings} />
      </div>
    );
  }
}

export default Toc;
