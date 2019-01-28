import * as React from 'react';
import * as Hell from '../types';

import { Link } from 'react-router-dom';
import Heading from '../components/Heading';

class Toc extends React.Component<{ headings: Hell.Heading[] }, {}> {
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
      dangerouslySetInnerHTML: { __html: text },
      onClick: () => {
        this.context.updateActiveId(id);
      },
      replace: selected,
      to: '?id=' + encodeURIComponent(id)
    };
  }
}

export default Toc;
