// Package
import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

// Components
import Nav from './components/Nav'
import Colors from './components/Colors'

const Page = (name) => () => <div>{name}</div>
const About = Page('About')
const Topics = Page('Topics')

const Router = () => (
  <BrowserRouter>
    <div className="columns">
      <div className="column-3">
        <Nav></Nav>
      </div>
      <div className="column-8">
        <Route path="/colors" component={Colors}></Route>
        <Route path="/layout" component={About}></Route>
        <Route path="/topics" component={Topics}></Route>
      </div>
    </div>
  </BrowserRouter>
)

export default Router
