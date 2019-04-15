import Heading from "./Heading";
import { HashLink as Link } from "react-router-hash-link";
import * as React from "react";

interface HeadingData {
  level: number;
  text: string;
  id: string;
  parent?: string;
}

type HeadingLinkProps = { heading: HeadingData };
function HeadingLink(props: HeadingLinkProps) {
  const { heading } = props;

  function getLinkProps({ text, id }: HeadingData) {
    const mdLink = /\[(.*)\]\(.*\)/;
    const clearText = text.replace(mdLink, "$1");
    return {
      dangerouslySetInnerHTML: { __html: clearText },
      replace: false,
      to: "#" + id
    };
  }

  return (
    <Heading level={heading.level}>
      <Link {...getLinkProps(heading)} />
    </Heading>
  );
}

type TocProps = { headings: HeadingData[] };
export default function Toc(props: TocProps) {
  const { headings } = props;
  return (
    <div className="sibar-bottom">
      {headings.map(heading => (
        <HeadingLink heading={heading} key={heading.id} />
      ))}
    </div>
  );
}
