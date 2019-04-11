import * as React from "react";
import siteData from "@internal/site-data";
// @ts-ignore
import Layout from "@theme/layouts/Layout";

export default class Base extends React.PureComponent {
  render() {
    return this.props.children;
  }
  componentDidMount() {
    // Set Site
    document.title = siteData.title || "Welcome to Hell";
  }
}
