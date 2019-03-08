import * as React from "react";

export default class PageLayout extends React.PureComponent<{
  Side: React.ReactNode;
  Content: React.ReactNode;
}> {
  public render() {
    const { Side, Content } = this.props;
    return (
      <div>
        <div className="columns">
          <div className="side" style={{ minWidth: "220px" }}>
            <div className="nav section">{Side}</div>
          </div>
          <div className="content">{Content}</div>
        </div>
      </div>
    );
  }
}
