import * as React from 'react';
import PropsType = require('prop-types');

import { Link } from 'react-router-dom';
import Heading from '../components/Heading';

class Toc extends React.Component<{ headings: Hell.Heading[] }, {}> {
  public static contextTypes = {
    activeId: PropsType.string,
    updateActiveId: PropsType.func
  };
  public render() {
    const { headings } = this.props;
    return headings.map((heading, idx) => {
      return (
        <Heading key={idx} level={heading.level}>
          <Link {...this.getLinkProps(heading)} />
        </Heading>
      );
    });
  }
  private getLinkProps({ id, text }: Hell.Heading) {
    const selected = id === this.context.activeId;
    return {
      className: selected ? 'selected' : '',
      replace: selected,
      dangerouslySetInnerHTML: { __html: text },
      onClick: () => {
        this.context.updateActiveId(id);
      },
      to: '?id=' + encodeURIComponent(id)
    };
  }
}

export default Toc;
