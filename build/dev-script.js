const { resolve } = require('path')

// Packages
const sh = require('shelljs')
const serve = require('serve')

const runtimeConfig = require('./config')

// rm -rf dist .cache
sh.rm('-rf', 'dist')
sh.rm('-rf', '.cache')

// `serve` public folder
serve(resolve(__dirname, '../public'), {
  port: runtimeConfig.DOC_PORT,
  cors: true
})

// `parcel` index.html
sh.exec('parcel index.html')
