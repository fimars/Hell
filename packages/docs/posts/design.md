### 定义

`布局页面`: `pages/`文件夹下直接对应到目录的页面

`布局模板`: 提供给`markdown`文件使用的`react`模板

`文章`: `posts/`文件夹下的内容

### 目标

支持 markdown 文件编写 Post

支持 react 的方式自定义`布局页面`

### 测试流程

1. 初始化一个 Context
2. 测试每个模块的运行情况
3. 测试变更 Context 内容时各个模块的运行状况

### 模块

node

- Context 流程

  - cwd
  - new HellServer with (\$cwd)
    - loadConfig -> afterLoadConfig<config>
      - call merge default config
    - transferToContext -> afterTransfer<context>
      - output files with context
    - run the webpack server -> upWebpack<compiler>

- 打包文档文件和客户端的 webpack 工具
  - Loader
  - Plugin
- 运行时模块
  - 本地服务
  - 打包文件
- 收集用户提供的约定的信息的合集
- 无上下文依赖的通用工具库
  - logger
  - lang tool

application
