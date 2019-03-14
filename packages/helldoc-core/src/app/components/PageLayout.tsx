import * as React from "react";
import { connect } from "react-redux";

class PageLayout extends React.PureComponent<{
  Side: React.ReactNode;
  Content: React.ReactNode;
  sideBarDisplay: boolean;
}> {
  public render() {
    const { Side, Content } = this.props;
    return (
      <div>
        <div className="columns">
          <div
            className={`side ${this.props.sideBarDisplay && "sidebar-open"}`}
          >
            <div className="nav section">{Side}</div>
          </div>
          <div className="content">{Content}</div>
        </div>
      </div>
    );
  }
}

const stroeFetch = (store: { sideBarDisplay: boolean }) => {
  return {
    sideBarDisplay: store.sideBarDisplay
  };
};

export default connect(stroeFetch)(PageLayout);
