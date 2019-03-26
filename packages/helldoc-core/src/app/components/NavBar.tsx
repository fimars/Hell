import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../reduxActions/actions";
import { resolveNavs } from "../util";

import Search from "./Search";
import Mask from "./sideMask";

class NavBar extends React.Component<{
  sidebarControl: (value: boolean) => void;
  sideBarDisplay: boolean;
}> {
  barMeunClick() {
    this.props.sidebarControl(true);
  }

  componentWillMount() {
    window.addEventListener("resize", (e: any) => {
      if (e.target.innerWidth > 719) {
        this.props.sidebarControl(false);
      }
    });
  }

  render() {
    const navs = resolveNavs();
    return (
      <div className="navbar">
        <div className="nav-left">
          <i
            className="fas fa-bars mobile-bar"
            onClick={() => {
              this.props.sidebarControl(!this.props.sideBarDisplay);
            }}
          />

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
}

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
