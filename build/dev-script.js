const { resolve } = require('path')

// Packages
const sh = require('shelljs')
const serve = require('serve')

const config = require('./config')

// rm -rf dist .cache
sh.rm('-rf', 'dist')
sh.rm('-rf', '.cache')

// `serve` docs folder

serve(resolve(__dirname, '../docs'), {
  port: config.DOC_PORT
})

// `parcel` index.html
sh.exec('parcel index.html')
