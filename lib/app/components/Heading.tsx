import * as React from 'react';

export default class Heading extends React.PureComponent<{ level: number }, {}> {
    public render() {
      const { level, children } = this.props;
      return (
        <div className={`nav-label__item level-${level}`}>
            {children}
        </div>
      );
    }
  }