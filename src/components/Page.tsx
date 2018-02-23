import PropTypes = require('prop-types');
import qs = require('querystring');

import * as marked from 'marked';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import config from '../config';
import { fetchFile, isTest, jumpTo } from '../lib/helper';

import PageLayout from '../components/PageLayout';
import Toc from '../container/Toc';

export type PageProps = RouteComponentProps<any>;
export interface PageState {
  docContent: string;
  docHeadings: any[];
  activeId: string;
}
export default class Page extends React.Component<PageProps, PageState> {
  public static childContextTypes = {
    activeId: PropTypes.string,
    updateActiveId: PropTypes.func
  };
  private toc: Hell.Heading[] = [];

  constructor(props: PageProps) {
    super(props);
    this.state = {
      activeId: '',
      docContent: '',
      docHeadings: []
    };

    const renderer = new marked.Renderer();
    renderer.heading = this.headingRender.bind(this);
    marked.setOptions({ renderer });
  }
  get path() {
    const { location: { pathname } } = this.props;
    return this.formatPath(pathname);
  }
  public getChildContext() {
    return {
      activeId: this.state.activeId,
      updateActiveId: this.updateActiveId.bind(this)
    };
  }
  public componentDidUpdate({ location: { pathname } }) {
    if (this.formatPath(pathname + '') !== this.path) {
      this.fetchData();
    }
  }
  public updateActiveId(activeId: string) {
    jumpTo(activeId);
    this.setState({ activeId });
  }
  public componentDidMount() {
    const { location: { search } } = this.props;
    const id = qs.parse(search.slice(1)).id as string;

    this.fetchData().then(() => {
      this.updateActiveId(id);
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
      history.replace('/404');
    }
  }
  public render(): JSX.Element {
    const { location } = this.props;
    return (
      <PageLayout
        Side={<Toc headings={this.state.docHeadings} />}
        Content={<div className="markdown-body section" dangerouslySetInnerHTML={{ __html: this.state.docContent }} />}
      />
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
    if (pathname === '/') {
      pathname += index;
    }
    return path + pathname + '.md';
  }
}
