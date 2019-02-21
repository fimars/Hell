import * as React from "react";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";

export interface IHeading {
  level: number;
  text: string;
  id: string;
  parent?: string;
}

class Toc extends React.Component<{ headings: IHeading[] }, {}> {
  public render() {
    const { headings } = this.props;
    return headings.map((heading, idx) => {
      return (
        <Heading key={idx} level={heading.level}>
          <Link {...this.getLinkProps(heading)} />
        </Heading>
      );
    });
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
