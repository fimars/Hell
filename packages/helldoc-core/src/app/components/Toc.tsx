import * as React from "react";
import Heading from "../components/Heading";
import { HashLink as Link } from "react-router-hash-link";
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

  private getLinkProps({ text, id }: HeadingData) {
    const mdLink = /\[(.*)\]\(.*\)/;
    const clearText = text.replace(mdLink, "$1");
    return {
      dangerouslySetInnerHTML: { __html: clearText },
      replace: false,
      to: "#" + id
    };
  }
}

function SidebarTop() {
  return (
    <div className="sidebar-top">
      {navs.map(({ text, link }) => (
        <Link key={text} to={link} className="nav-link">
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
