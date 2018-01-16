// polyfill
import 'babel-polyfill'

// doc
import doc from './src'
import * as config from './build/config'

// theme
import './theme/index.scss'

doc.init({
  path: `http://127.0.0.1:${config.DOC_PORT}`
})
