import pages from "@internal/pages";
import siteData from "@internal/site-data";
import * as React from "react";
import { RouteComponentProps } from "react-router";

// import Toc from "../components/Toc";
import NotFound from "./NotFound";

export interface PageProps extends RouteComponentProps<any> {
  sideBarDisplay: boolean;
}
export interface PageState {
  docContent: string;
}

export default class Page extends React.Component<PageProps, PageState> {
  public componentDidUpdate() {}
  public render(): JSX.Element {
    // Set Site
    document.title = siteData.title || "Welcome to Hell";

    // Render Content
    const {
      location: { pathname }
    } = this.props;
    const existPage = siteData.pages.find(({ path }) => {
      return path === pathname;
    });

    const Content = existPage ? pages[existPage.component] : NotFound;
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Content />
      </React.Suspense>
    );
  }
}
