// BuildIn
import qs from 'querystring'

// Packages
import React from 'react'
import marked from 'marked'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

// Libs
import {fetchFile, scrollToElement} from '../lib/helper'
import {getState} from '../lib/state'

// Components
import Nav from './Nav'

// Deal Markdown Parser Options
const renderer = new marked.Renderer()

marked.setOptions({
  renderer: renderer
})

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      current: getState('current'),
      path: getState('path'),
      docContent: '',
      toc: []
    }
  }

  async componentDidMount () {
    const url = this.state.path + '/' + this.state.current

    // Handle toc
    // TODO: More clear way to total the level
    const toc = []
    let preNode = null
    renderer.heading = function (text, level) {
      if (level <= 2) {
        const node = {
          level,
          text,
          children: [],
          parent: preNode || toc
        }

        if (!preNode) {
          toc.push(node)
          preNode = node
        } else {
          if (level > preNode.level) {
            preNode.children.push(node)
          } else {
            toc.push(node)
            preNode = node
          }
        }
      }
      return level > 1 ? `<h${level} id="${text}">${text}</h${level}>` : ''
    }

    const raw = await fetchFile(url)
    const contentHtml = marked(raw)

    // Handle heading jump
    const { location } = this.props
    if (location.search) {
      const query = qs.parse(location.search.slice(1))
      setTimeout(() => scrollToElement(query.id), 0)
    }

    this.setState({
      toc: toc,
      docContent: contentHtml
    })
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <div className="columns">
          <div className="column-3">
            <div className="nav section">
              <Nav location={this.props.location} toc={this.state.toc}/>
            </div>
          </div>
          <div className="column-8">
            <div className="markdown-body section" dangerouslySetInnerHTML={{__html: this.state.docContent}}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default class R extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route path="/" component={App}></Route>
        </div>
      </Router>
    )
  }
}
