import * as React from "react";

interface MaskProps {
  sideBarDisplay: boolean;
  sidebarControl: (val: boolean) => void;
}
class Mask extends React.PureComponent<MaskProps> {
  render() {
    return (
      this.props.sideBarDisplay && (
        <div className="side-mask" onClick={this.closeSideBar} />
      )
    );
  }
  closeSideBar = () => {
    this.props.sidebarControl(false);
  };
}

export default Mask;
