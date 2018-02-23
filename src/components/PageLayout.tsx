import * as React from 'react';

export default class PageLayout extends React.PureComponent<{
  Side: React.ReactNode;
  Content: React.ReactNode;
}> {
  public render() {
    const { Side, Content } = this.props;
    return (
      <div>
        <div className="columns">
          <div className="column-2">
            <div className="nav section">{Side}</div>
          </div>
          <div className="column-8">{Content}</div>
        </div>
      </div>
    );
  }
}
