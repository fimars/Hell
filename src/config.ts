export interface IHellConfig {
    index?: string;
    path?: string;
}


let initConfig: IHellConfig = {
    // default index
    index: "README",
    // default source path
    path: ""
};

export default {
    update(config: IHellConfig) {
        initConfig = {...initConfig, ...config};
    },
    get it() {
        return initConfig;
    }
};
