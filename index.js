import doc from './src/doc'
import * as config from './build/config'

// theme
import './theme/index.scss'

doc.init({
  path: `127.0.0.1:${config.DOC_PORT}`
})
