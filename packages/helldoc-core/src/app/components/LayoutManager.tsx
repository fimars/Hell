import { PageDataContext } from "../context";
import { layouts, siteData } from "../runtime";
import { RouteComponentProps, withRouter } from "react-router";
import { useEffect } from "react";
import React from "react";

interface LayoutManager extends RouteComponentProps {
  renderContent: any;
}

function LayoutManager(props: RouteComponentProps) {
  const pages = siteData.pages;
  const matchPage = pages.find(page => page.path === props.match.path) || {
    path: "",
    component: ""
  };

  useEffect(() => {
    if (matchPage.title) {
      console.log(matchPage.title);
      document.title = matchPage.title;
    }
  });

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
