import * as React from "react";

export default class Heading extends React.Component<{ level: number }, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      sidebarShown: false
    };
  }
  public render() {
    const { level, children } = this.props;
    return (
      <div
        className={`nav-label-item level-${level} ${children && "has-child"}`}
      >
        {children}
      </div>
    );
  }
}
