let initConfig = {
  // default index
  index: "README",
  // default source path
  path: ""
};

export default {
  update(cfg) {
    initConfig = Object.assign(initConfig, cfg);
  },
  get it() {
    return initConfig;
  }
};
