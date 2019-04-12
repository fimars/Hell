import { useEffect, ReactElement } from "react";
import { PageDataContext } from "../context";
import { withRouter, RouteComponentProps } from "react-router";
import { siteData } from "../runtime";
import * as React from "react";

interface GlobalLayoutProps extends RouteComponentProps {
  children: ReactElement;
}

function GlobalLayout(props: GlobalLayoutProps) {
  const { title, pages } = siteData;
  useEffect(() => {
    document.title = title || "Welcome to Hell";
  });

  const currentPage = pages.find(page => page.path === props.match.path) || {
    path: "",
    component: ""
  };

  return (
    <PageDataContext.Provider value={currentPage}>
      {props.children}
    </PageDataContext.Provider>
  );
}
export default withRouter(GlobalLayout);
