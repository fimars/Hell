import { siteData, PageComponents } from "siteData";
import * as React from "react";
import { RouteComponentProps } from "react-router";

// import Toc from "../components/Toc";
import NotFound from "./NotFound";

export type PageProps = RouteComponentProps<any>;
export interface PageState {
  docContent: string;
}
export default class Page extends React.Component<PageProps, PageState> {
  public componentDidMount() {
    document.title = siteData.title || "Welcome to Hell";
  }
  public render(): JSX.Element {
    const {
      location: { pathname }
    } = this.props;
    const existPage = siteData.pages.find(({ path }) => {
      return path === pathname;
    });
    console.log(siteData, PageComponents);
    debugger;

    const Article = existPage ? PageComponents[existPage.component] : NotFound;
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Article />
      </React.Suspense>
    );
  }
}
