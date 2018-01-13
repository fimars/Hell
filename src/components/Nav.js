import React from 'react'
import { NavLink } from 'react-router-dom'

const FirstLetterUpcase = (String) => String[0].toUpperCase() + String.slice(1)

const Label = (title) => (
  <div className="label">{title}</div>
)

const LabelPost = (...elements) => (
  <div className="label-post">{elements}</div>
)

const ALink = (name) => (
  <div key={name}>
    <NavLink
      to={'/' + name}
      activeClassName="selected"
    >{ FirstLetterUpcase(name) }</NavLink>
  </div>
)

const Nav = () => (
  <section className="section nav">
    { Label('GETSTART') }
    { LabelPost(ALink('colors'), ALink('layout'), ALink('Card')) }
  </section>
)

export default Nav
