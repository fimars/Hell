---
title: 指南
---

# 指南

本指南会覆盖到目前 HellDoc 可以使用的所有特性

## 开始之前

### Node.js

HellDoc 目前支持的 Node.js 版本为 v8.0+
运行以下命令确认你的 Node.js 版本

```bash
node -v
```

### 安装

使用 `npm` 或者 `yarn` 安装:

```bash
npm install @helldoc/cli -g
# or
yarn global add @helldoc/cli
```

## 自定义参数

HellDoc 目前通过你文档目录下的 `hell.config.js` 文件进行配置, 下面是一个该文件支持的参数概览:

```typescript
module.exports = {
  title: ''
  head: [
    ['link', { rel: 'icon', href: './favicon.png' }]
  ],
  themeConfig: {
    nav: [
      { text: "/", link: "/" },
      { text: "guide", link: "/guide" },
    ]
  }
}
```

### title

网站的自定义标题, 不传的时候会设置默认值为`Welcome~`

### base

生成的网站目录的根目录地址

### head

自定义的网站 head 标签

### themeConfig

自定义皮肤的参数列表, 默认皮肤可用参数见[default-theme-config](./default-theme-config)
