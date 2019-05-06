### 定义

`布局页面`: `pages/`文件夹下直接对应到目录的页面

`布局模板`: 提供给`markdown`文件使用的`react`模板

`文章`: `posts/`文件夹下的内容

### 目标

支持 markdown 文件编写 Post

支持 react 的方式自定义`布局页面`

### 测试流程

1. 初始化一个 Nana 查看运行状态
2. 测试每个模块的运行情况
3. 测试 watch 的工作情况

### 模块

config

**site.config.yaml**

```yaml
```

node

- cli, cwd

- /nana 初始化 nana(opts)

  - load Opts, load Config, load ThemePath
  - 整理页面数据，整理路由，整理 webpack 配置
  - run the webpack server -> upWebpack<compiler>

- /webpack 打包文档文件和客户端的 webpack 工具
  - Loader
  - Plugin
- /utils 通用模块
  - configLoader
  - logger
- /prepare 打包运行时数据
- /markdown markdown 文件处理工具

### Recipes

Q: 有哪些 node 运行流程？以及相应的钩子

A:

hooks:

- init
- afterLoadConfig
- webpackChain
- afterWebpackChain
