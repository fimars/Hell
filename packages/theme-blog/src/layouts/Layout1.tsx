import * as React from "react";

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

export default Layout;
