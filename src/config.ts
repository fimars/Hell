export interface HellConfig {
    index?: string;
    path?: string;
}


let initConfig: HellConfig = {
    // default index
    index: "README",
    // default source path
    path: ""
};

export default {
    update(config: HellConfig) {
        initConfig = Object.assign(initConfig, config);
    },
    get it() {
        return initConfig;
    }
};
