import * as React from "react";
import * as Hell from "../types";

import { Link } from "react-router-dom";
import Heading from "../components/Heading";

class Toc extends React.Component<{ headings: Hell.Heading[] }, {}> {
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
  private getLinkProps({ text }: Hell.Heading) {
    const clearText = text.replace(/\(.*\)/, "");
    return {
      dangerouslySetInnerHTML: { __html: clearText },
      replace: false,
      to: "#" + encodeURIComponent(clearText)
    };
  }
}

export default Toc;
