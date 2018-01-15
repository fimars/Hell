class Doc {
  init (options) {
    this.options = Object.assign({
      path: '.',
      index: 'README.md'
    }, options)

    this.currentPath = this.options.index
  }

  start () {
    // init react-router
    // mount Doc Application
  }
}

export default Doc
