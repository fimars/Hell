import * as React from "react";
import { connect } from "react-redux";

interface LayoutProps {
  Side: React.ReactNode;
  Content: React.ReactNode;
  sideBarDisplay: boolean;
}

class Layout extends React.PureComponent<LayoutProps> {
  public render() {
    const { Side, Content } = this.props;
    return (
      <div>
        <div className="columns">
          <div
            className={`side ${
              this.props.sideBarDisplay ? "sidebar-open" : ""
            }`}
          >
            <div className="nav">{Side}</div>
          </div>
          <div className="content main">{Content}</div>
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

export default connect(stroeFetch)(Layout);
