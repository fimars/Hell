import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { navs } from "../data/navs";
import actions from "../store/actions";

import Search from "./Search";
import Mask from "./SideMask";

interface NavBarProps {
  sidebarControl: (value: boolean) => void;
  sideBarDisplay: boolean;
}

class NavBar extends React.Component<NavBarProps> {
  constructor(props: NavBarProps) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
  }
  render() {
    return (
      <div className="navbarstyle">
        <div className="nav-left">
          <i className="fas fa-bars mobile-bar" onClick={this.toggleSidebar} />

          {navs.map(({ text, link }, idx) => (
            <Link key={idx} to={link} className="navstyle">
              <div>{text}</div>
            </Link>
          ))}
        </div>

        <Mask
          sideBarDisplay={this.props.sideBarDisplay}
          sidebarControl={this.props.sidebarControl}
        />

        <Search />
      </div>
    );
  }
  componentWillMount() {
    window.addEventListener("resize", this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeListener);
  }
  private toggleSidebar() {
    this.props.sidebarControl(!this.props.sideBarDisplay);
  }
  private resizeListener() {
    if (window.innerWidth > 719) {
      this.props.sidebarControl(false);
    }
  }
}

// TODO: extract the types interface
const stroeFetch = (store: { sideBarDisplay: boolean; store: {} }) => {
  return {
    sideBarDisplay: store.sideBarDisplay
  };
};

const mapDispatchToProps = (dispatch: (state: any) => any) => {
  return {
    sidebarControl: (state: boolean) => {
      dispatch(actions.sidebarControl(state));
    }
  };
};

export default connect(
  stroeFetch,
  mapDispatchToProps
)(NavBar);
