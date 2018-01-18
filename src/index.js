import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import config from './config'

function init (cfg) {
  initEnv(cfg)
  initApp()
}

function initEnv (cfg) {
  config.update(cfg)
}

function initApp (options) {
  ReactDOM.render(<App />, document.getElementById('app'))
}

export default { init }
