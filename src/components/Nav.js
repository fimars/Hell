import React from 'react'

export default class Nav extends React.PureComponent {
  render () {
    const Link = ({level, text, children}) => {
      const label = (
        <div key={text + 'label'} className={level === 1 ? 'label' : ''}>
          <a href={'#' + text}>{text}</a>
        </div>
      )
      const post = children.length ? <div key={text + 'post'} className="label-post">{children.map(Link)}</div> : ''

      return [label, post]
    }
    console.log(this.props.toc)
    return this.props.toc.map(Link)
  }
}
