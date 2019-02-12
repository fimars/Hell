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
  private getLinkProps({ id, text }: Hell.Heading) {
    return {
      dangerouslySetInnerHTML: { __html: text },
      replace: false,
      to: "#" + encodeURIComponent(id)
    };
  }
}

export default Toc;
