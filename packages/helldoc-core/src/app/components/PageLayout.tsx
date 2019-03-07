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
          <div className="side">
            <div className="nav section">{Side}</div>
          </div>
          <div
            className="content"
            style={{ width: "calc(100% - 220px)", float: "left" }}
          >
            {Content}
          </div>
        </div>
      </div>
    );
  }
}
