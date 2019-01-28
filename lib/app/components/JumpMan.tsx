import PropTypes = require('prop-types');
import qs = require('querystring');

import * as React from 'react';
import { jumpTo } from '../lib/helper';

export interface JumpManProps {
  search: string;
}
export default class JumpMan extends React.Component<
  JumpManProps,
  { activeId: string }
> {
  public static childContextTypes = {
    activeId: PropTypes.string,
    updateActiveId: PropTypes.func
  };
  constructor(props: JumpManProps) {
    super(props);

    this.state = { activeId: '' };
  }
  public getChildContext() {
    return {
      activeId: this.state.activeId,
      updateActiveId: this.updateActiveId.bind(this)
    };
  }
  public updateActiveId(activeId: string) {
    jumpTo(activeId);
    this.setState({ activeId });
  }
  public render() {
    return this.props.children;
  }
}
