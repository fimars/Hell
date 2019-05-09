// import { PageDataContext } from "../context";
// import { RouteComponentProps, withRouter } from "react-router";
// import { useEffect } from "react";
import * as React from "react";

interface LayoutManager {
  renderContent: any;
}

function LayoutManager(props: any) {
  // const pages = [];
  // const matchPage = pages.find(page => page.path === props.match.path) || {
  //   path: "",
  //   component: ""
  // };

  // useEffect(() => {
  //   if (matchPage.title) {
  //     console.log(matchPage.title);
  //     document.title = matchPage.title;
  //   }
  // });

  // function resolveLayoutName() {
  //   let layoutName = "Layout";
  //   if (matchPage.frontmatter && matchPage.frontmatter.layout) {
  //     layoutName = matchPage.frontmatter.layout;
  //   }
  //   return layoutName;
  // }

  // const Layout = layouts[resolveLayoutName()];
  // return (
  //   <PageDataContext.Provider value={matchPage}>
  //     <Layout {...props} />
  //   </PageDataContext.Provider>
  // );
  return <div>{props.renderContent()}</div>;
}
export default LayoutManager;
