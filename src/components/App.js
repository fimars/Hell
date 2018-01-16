import React from 'react'
import marked from 'marked'

import {fetchFile} from '../lib/helper'
import {getState} from '../lib/state'
import Nav from './Nav'

// marked
const renderer = new marked.Renderer()

marked.setOptions({
  renderer: renderer
})

export default class App extends React.Component {
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

    this.setState({
      toc: toc,
      docContent: contentHtml
    })
  }

  render () {
    return (
      <div className="columns">
        <div className="column-3">
          <div className="nav section">
            <Nav toc={this.state.toc}/>
          </div>
        </div>
        <div className="column-8">
          <div className="markdown-body section" dangerouslySetInnerHTML={{__html: this.state.docContent}}></div>
        </div>
      </div>
    )
  }
}
