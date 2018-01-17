import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

function init (options) {
  initApp(options)
}

function initApp (options) {
  ReactDOM.render(<App options={options}/>, document.getElementById('app'))
}

export default { init }
