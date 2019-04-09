import * as React from "react";
import { HashLink as Link } from "react-router-hash-link";

class CLink extends React.PureComponent<{
  onClick?: () => void;
  to: string;
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
}> {
  toHandle = () => {
    return this.props.to.split(" ").join("-");
  };
  render() {
    return (
      <Link
        to={this.props.to}
        onClick={this.props.onClick}
        className={this.props.className}
      >
        {this.props.children ||
          (this.props.dangerouslySetInnerHTML &&
            this.props.dangerouslySetInnerHTML.__html)}
      </Link>
    );
  }
}

export default CLink;
