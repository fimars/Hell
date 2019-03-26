import * as React from "react";

class Mask extends React.PureComponent<{
  sideBarDisplay: boolean;
  sidebarControl: (arg0: boolean) => void;
}> {
  render() {
    return (
      this.props.sideBarDisplay && (
        <div
          className="side-mask"
          onClick={() => this.props.sidebarControl(false)}
        />
      )
    );
  }
}

export default Mask;
