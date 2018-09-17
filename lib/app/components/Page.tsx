import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import config from '../config';
import { fetchFile } from '../lib/helper';

import PageLayout from '../components/PageLayout';
import JumpMan from '../container/JumpMan';
import Toc from '../container/Toc';

export type PageProps = RouteComponentProps<any>;
export interface PageState {
  docContent: string;
  docHeadings: any[];
}
export default class Page extends React.Component<PageProps, PageState> {
  private toc: Hell.Heading[] = [];

  constructor(props: PageProps) {
    super(props);
    this.state = {
      docContent: '',
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
      const docContent: string = pages[0].excerpt;
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
            dangerouslySetInnerHTML={{ __html: this.state.docContent }}
          />
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
