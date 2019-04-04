import * as React from "react";
import siteData from "@internal/site-data";

export default class Base extends React.PureComponent {
  render() {
    return <div className="base">{this.props.children}</div>;
  }
  componentDidMount() {
    // Set Site
    document.title = siteData.title || "Welcome to Hell";
  }
}
