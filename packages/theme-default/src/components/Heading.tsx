import React from "react";

interface HeadingProps {
  level: number;
}
export default class Heading extends React.Component<HeadingProps> {
  public render() {
    const { level, children } = this.props;
    return <div className={`nav-label-item level-${level}`}>{children}</div>;
  }
}
