/// <reference path="../types.ts"/>

// BuiltIn
import qs = require("querystring");

// Packages
import * as marked from "marked";
import * as React from "react";
import { RouteComponentProps } from "react-router";

// Libs
import config from "../config";
import { fetchFile, isTest, jumpTo } from "../lib/helper";
import Toc from "./Toc";

export type PageProps = RouteComponentProps<any>;
export interface PageState {
  docContent: string;
  docHeadings: any[];
}
export default class Page extends React.Component<PageProps, PageState> {
  private toc: Hell.Heading[] = [];

  constructor(props: PageProps) {
    super(props);

    this.state = { docContent: "", docHeadings: [] };

    const renderer = new marked.Renderer();
    renderer.heading = this.headingRender.bind(this);
    marked.setOptions({ renderer });
  }
  get path() {
    const { location: { pathname } } = this.props;
    return this.formatPath(pathname);
  }
  public componentDidUpdate({ location: { pathname } }) {
    if (this.formatPath(pathname + "") !== this.path) {
      this.fetchData();
    }
  }
  public componentDidMount() {
    const { location: { search } } = this.props;
    const { id } = qs.parse(search.slice(1));

    this.fetchData().then(() => {
      jumpTo(id as string);
    });
  }
  public async fetchData() {
    const { history } = this.props;
    this.toc = [];
    try {
      const fileRaw = await fetchFile(this.path);
      const fileFomatted: string = marked(fileRaw, void 0);

      this.setState({ docContent: fileFomatted, docHeadings: this.toc });
    } catch (e) {
      history.replace("/404");
    }
  }
  public render(): JSX.Element {
    const { location } = this.props;
    return (
      <div>
        <div className="columns">
          <div className="column-2">
            <div className="nav section">
              <Toc headings={this.state.docHeadings} />
            </div>
          </div>
          <div className="column-8">
            <div
              className="markdown-body section"
              dangerouslySetInnerHTML={{ __html: this.state.docContent }}
            />
          </div>
        </div>
      </div>
    );
  }

  private headingRender(text, level) {
    const id = `heading-${text}-${level}`;
    const heading: Hell.Heading = { text, level, id };

    for (let idx = this.toc.length; idx > 0; idx--) {
      const prev = this.toc[idx - 1];
      if (heading.level > prev.level) {
        heading.parent = prev.id;
        break;
      } else if (heading.level === prev.level && prev.parent) {
        heading.parent = prev.parent;
        break;
      }
    }
    this.toc.push(heading);
    return `<h${level} id="${id}">${text}</h${level}>`;
  }

  private formatPath(pathname: string): string {
    const { index, path } = config.it;
    // index
    if (pathname === "/") {
      pathname += index;
    }
    return path + pathname + ".md";
  }
}
