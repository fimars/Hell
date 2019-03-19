import siteData from "@internal/site-data";
import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../reduxActions/actions";

import Search from "./Search";
import Mask from "./sideMask";

class NavBar extends React.Component<{
  sidebarControl: (value: boolean) => void;
  sideBarDisplay: boolean;
}> {
  resolveNavs() {
    if (siteData && siteData.themeConfig) {
      return siteData.themeConfig.nav || [];
    } else {
      return siteData.pages
        .filter(page => page.title)
        .map(page => ({ text: page.title, link: page.path }));
    }
  }

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
    const navs = this.resolveNavs();
    return (
      <div className="navbarstyle">
        <div className="nav-left">
          <i
            className="fas fa-bars mobile-bar"
            onClick={() => {
              console.log("control");
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
