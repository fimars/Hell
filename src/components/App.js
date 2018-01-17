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
import {fetchFile, jumpTo} from '../lib/helper'
// import {getState} from '../lib/state'

// Components
import Nav from './Nav'
import NotFound from './NotFound'

const renderer = new marked.Renderer()

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      docContent: '',
      docHeadings: []
    }
  }

  getCurrentPath ({ options, location }) {
    const { path, current = 'README.md' } = options
    const { pathname } = location
    return path + (pathname === '/' ? pathname + current : pathname)
  }

  scrollIntoLastVisit () {
    const { search } = this.props.location
    if (search) {
      const { id } = qs.parse(search.slice(1))
      if (id) jumpTo(id)
    }
  }

  async fetchData (url) {
    // render content
    try {
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
      marked.setOptions({ renderer })

      const raw = await fetchFile(url)
      const formatted = marked(raw)

      this.setState({
        docHeadings: toc,
        docContent: formatted
      }, this.scrollIntoLastVisit)
    } catch (e) {
      this.props.history.push('404')
    }
  }

  async componentDidUpdate (prevProps) {
    const prevPath = this.getCurrentPath(prevProps)
    const nowPath = this.getCurrentPath(this.props)
    if (nowPath !== prevPath) this.fetchData(nowPath)
  }
  async componentDidMount () {
    this.fetchData(this.getCurrentPath(this.props))
  }

  render () {
    return (
      <div>
        <div className="columns">
          <div className="column-3">
            <div className="nav section">
              <Nav location={this.props.location} toc={this.state.docHeadings}/>
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

export default class Doc extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path="/404" component={NotFound}></Route>
          <Route path="/" render={
            props => (<App options={this.props.options} {...props }/>)
          }></Route>
        </div>
      </Router>
    )
  }
}
