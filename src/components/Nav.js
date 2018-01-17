// TODO: Rename To 'TOC'
// TODO: handle url white sapce

// BuiltIn
import qs from 'querystring'

// Packages
import React from 'react'
import { Link } from 'react-router-dom'

// Libs
import {jumpTo} from '../lib/helper'

class SideNavLink extends React.Component {
  constructor () {
    super()
    this.scrollToHeading = this.scrollToHeading.bind(this)
  }
  isActive () {
    return this.props.activeName === this.props.name
  }
  scrollToHeading () {
    jumpTo(this.props.name)
  }
  render () {
    const { name } = this.props
    return (
      <Link
        to={'?id=' + name}
        replace={this.isActive()}
        onClick={this.scrollToHeading}
      >{name}</Link>
    )
  }
}

export default class Nav extends React.Component {
  constructor () {
    super()
    this.state = {
      activeName: ''
    }
  }

  setActiveName () {
    const { location } = this.props
    const query = qs.parse(location.search.slice(1))
    this.state.activeName = query.id
  }

  render () {
    this.setActiveName()

    const Label = ({level, text, children}) => {
      const view = [(
        <div
          key={text + 'label'}
          className={level === 1 ? 'label' : ''}
        >
          <SideNavLink
            name={text}
            activeName={this.state.activeName}
          />
        </div>
      )]

      if (children.length) {
        view.push(<div key={text + 'post'} className="label-post">{children.map(Label)}</div>)
      }

      return view
    }
    return this.props.toc.map(Label)
  }
}
