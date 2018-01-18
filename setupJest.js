// polyfill wathwg-fetch
import 'whatwg-fetch'

import config from './src/config'
// Setup Static File Index
config.update({
  path: 'http://127.0.0.1:1233'
})
