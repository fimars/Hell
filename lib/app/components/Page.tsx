import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import config from '../config';
import { fetchFile } from '../lib/helper';

import JumpMan from '../components/JumpMan';
import PageLayout from '../components/PageLayout';
import Toc from '../components/Toc';

export type PageProps = RouteComponentProps<any>;
export interface PageState {
  docContent: (() => JSX.Element) | JSX.Element;
  docHeadings: any[];
}
export default class Page extends React.Component<PageProps, PageState> {
  private toc: Hell.Heading[] = [];

  constructor(props: PageProps) {
    super(props);
    this.state = {
      docContent: null,
      docHeadings: []
    };
  }
  get path() {
    const { location: { pathname } } = this.props;
    return this.formatPath(pathname);
  }
  public componentDidUpdate({ location: { pathname } }) {
    if (this.formatPath(pathname + '') !== this.path) {
      this.fetchData();
    }
  }
  public componentDidMount() {
    const { location: { search } } = this.props;
    this.fetchData().then(() => {
      // this.updateActiveId(id);
    });
  }
  public async fetchData() {
    const { history } = this.props;
    this.toc = [];
    try {
      const { siteData: { pages } } = await import('@/.temp/siteData');
      const { default: docContent } = await import(`@source/Ch1.md`);
      const docHeadings = pages[0].headers
      this.setState({ docContent, docHeadings });
    } catch (e) {
      history.replace('/404');
    }
  }
  public render(): JSX.Element {
    const { location } = this.props;
    return (
      <PageLayout
        Side={
          <JumpMan search={location.search}>
            <Toc headings={this.state.docHeadings} />
          </JumpMan>
        }
        Content={
          <div
            className="markdown-body section"
          >
            { this.state.docContent }
          </div>
        }
      />
    );
  }

  private formatPath(pathname: string): string {
    const { index, path } = config.it;
    // index
    if (pathname === '/') {
      pathname += index;
    }
    return path + pathname + '.md';
  }
}
