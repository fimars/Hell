import { siteData, PageComponents } from "../.temp/siteData";
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

    const modulePath = this.getComponentName(pathname);
    const Article = existPage ? PageComponents[modulePath] : NotFound;
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Article />
      </React.Suspense>
    );
  }
  private getComponentName(path: string) {
    return path === "/"
      ? "Index"
      : "Page" +
          path
            .slice(1)
            .replace(/\/|\\/g, " ")
            .split(" ")
            .map(w => w[0].toUpperCase() + w.slice(1))
            .join("");
  }
}
