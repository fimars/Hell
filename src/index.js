import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import {initState} from './lib/state'

function init (options) {
  initState(options)
  initApp()
}

function initApp () {
  ReactDOM.render(<App/>, document.getElementById('app'))
}

export default { init }
