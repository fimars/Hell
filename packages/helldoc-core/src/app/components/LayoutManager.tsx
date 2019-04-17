import * as React from "react";
import { PageDataContext } from "../context";
import { layouts, siteData } from "../runtime";
import { RouteComponentProps, withRouter } from "react-router";

interface LayoutManager extends RouteComponentProps {
  renderContent: any;
}

function LayoutManager(props: RouteComponentProps) {
  const pages = siteData.pages;
  const matchPage = pages.find(page => page.path === props.match.path) || {
    path: "",
    component: ""
  };

  function resolveLayoutName() {
    let layoutName = "Layout";
    if (matchPage.frontmatter && matchPage.frontmatter.layout) {
      layoutName = matchPage.frontmatter.layout;
    }
    return layoutName;
  }

  const Layout = layouts[resolveLayoutName()];
  return (
    <PageDataContext.Provider value={matchPage}>
      <Layout {...props} />
    </PageDataContext.Provider>
  );
}
export default withRouter(LayoutManager);
