import { siteData } from '@/.temp/siteData';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';


import JumpMan from '../components/JumpMan';
import PageLayout from '../components/PageLayout';
import Toc from '../components/Toc';
import NotFound from './NotFound';

export type PageProps = RouteComponentProps<any>;
export interface PageState {
  docContent: string;
}
export default class Page extends React.Component<PageProps, PageState> {
  constructor(props) {
    super(props);
    this.state = { docContent: '' };
  }
  public render(): JSX.Element {
    const { location: { pathname }, history } = this.props;
    const currentPage = siteData.pages.find(page => page.file === pathname.slice(1));
    return (
      <PageLayout
        Side={
          <JumpMan search={this.props.location.search}>
            <Toc headings={[]} />
          </JumpMan>
        }
        Content={
          currentPage
          ? <div
            className="markdown-body section"
            dangerouslySetInnerHTML={{__html: currentPage.excerpt || 'Coming Soon...'}}
          />
          : <NotFound />
        }
      />
    );
  }
}
