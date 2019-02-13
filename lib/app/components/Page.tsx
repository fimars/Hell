import { siteData } from "@/.temp/siteData";
import * as React from "react";
import { RouteComponentProps } from "react-router";

import JumpMan from "../components/JumpMan";
import PageLayout from "../components/PageLayout";
import Toc from "../components/Toc";
import NotFound from "./NotFound";

const IndexName = siteData.pages.length ? siteData.pages[0].file : "";

export type PageProps = RouteComponentProps<any>;
export interface PageState {
  docContent: string;
}
export default class Page extends React.Component<PageProps, PageState> {
  constructor(props) {
    super(props);
    this.state = { docContent: "" };
  }
  public componentDidMount() {
    const { history } = this.props;
    const currentPage = this.findCurrentPage();
    if (!currentPage) {
      history.replace(IndexName);
    }
  }
  public render(): JSX.Element {
    const currentPage = this.findCurrentPage();
    return (
      <PageLayout
        Side={currentPage ? <Toc headings={currentPage.headers || []} /> : ""}
        Content={
          currentPage ? (
            <div
              className="markdown-body section"
              dangerouslySetInnerHTML={{
                __html: currentPage.excerpt || "Coming Soon..."
              }}
            />
          ) : (
            <NotFound />
          )
        }
      />
    );
  }
  private findCurrentPage() {
    const {
      location: { pathname }
    } = this.props;
    return siteData.pages.find(page => page.file === pathname.slice(1));
  }
}
