import * as React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { connect } from "react-redux";
import { navs } from "../data/navs";
import actions from "../store/actions";

import Search from "./Search";
import Mask from "./SideMask";

interface NavsProps {
  onIconClick: () => void;
}
function Navs(props: NavsProps) {
  return (
    <div className="nav-left">
      <i className="fas fa-bars mobile-bar" onClick={props.onIconClick} />

      {navs.map(({ text, link }, idx) => (
        <Link key={idx} to={link} className="nav-link">
          <div>{text}</div>
        </Link>
      ))}
    </div>
  );
}

interface NavBarProps {
  sidebarControl: (value: boolean) => void;
  sideBarDisplay: boolean;
}

class NavBar extends React.Component<NavBarProps> {
  constructor(props: NavBarProps) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <Navs onIconClick={this.toggleSidebar} />
        <Mask
          sideBarDisplay={this.props.sideBarDisplay}
          sidebarControl={this.props.sidebarControl}
        />
        <Search />
      </div>
    );
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeListener);
  }
  toggleSidebar = () => {
    this.props.sidebarControl(!this.props.sideBarDisplay);
  };
  resizeListener = () => {
    if (window.innerWidth > 719) {
      this.props.sidebarControl(false);
    }
  };
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
