import * as React from "react";
// TODO: will be the inner link
import { HashLink as Link } from "react-router-hash-link";
// import Search from "./Search";
// import Mask from "./SideMask";

// @ts-ignore
const siteData = require("@internal/runtime").siteData;

console.log(siteData);

const nav: Array<{
  text: string;
  link: string;
}> = siteData.themeConfig.nav;

function NavBar() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <i className="fas fa-bars mobile-bar" />
        {nav.map(({ text, link }, idx) => (
          <Link key={idx} to={link} className="nav-link">
            <div>{text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// interface NavBarProps {
//   sidebarControl: (value: boolean) => void;
//   sideBarDisplay: boolean;
// }

// class NavBar extends React.Component<NavBarProps> {
//   constructor(props: NavBarProps) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="navbar">
//         <Navs onIconClick={this.toggleSidebar} />
//         <Mask
//           sideBarDisplay={this.props.sideBarDisplay}
//           sidebarControl={this.props.sidebarControl}
//         />
//         <Search />
//       </div>
//     );
//   }
//   componentDidMount() {
//     window.addEventListener("resize", this.resizeListener);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("resize", this.resizeListener);
//   }
//   toggleSidebar = () => {
//     this.props.sidebarControl(!this.props.sideBarDisplay);
//   };
//   resizeListener = () => {
//     if (window.innerWidth > 719) {
//       this.props.sidebarControl(false);
//     }
//   };
// }
export default NavBar;
