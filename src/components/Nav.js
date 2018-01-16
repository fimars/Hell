// BuiltIn
import qs from 'querystring'

// Packages
import React from 'react'
import { NavLink } from 'react-router-dom'

// Libs
import {scrollToElement} from '../lib/helper'

class SideNavLink extends React.Component {
  getActive () {
    return this.props.activeName === this.props.name
  }
  scrollToHeading () {
    scrollToElement(this.props.name)
  }
  render () {
    const { name } = this.props
    return (
      <NavLink
        onClick={() => this.scrollToHeading()}
        to={'?id=' + name}
        activeClassName="selected"
        isActive={() => this.getActive()}
      >{name}</NavLink>
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
