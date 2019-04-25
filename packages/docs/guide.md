---
title: 如何使用
---

# 如何使用

## 安装

### Node.js

运行以下命令确认你的 Node.js 版本

```bash
node -v
```

如果你没有安装 Node.js 在[此处下载](https://nodejs.org/en/download/)

### @helldoc/cli

使用 `npm` 或者 `yarn` 安装`@helldoc/cli`脚手架:

```bash
npm install @helldoc/cli -g
# or
yarn global add @helldoc/cli
```

确认是否安装完成之后，让我们继续把。

```
helldoc -h
```

## 第一篇文章

### README.md

在你的工作目录下新建一个 `README.md`

```markdown
# Hello World

Power by HellDoc.
```

在当前目录通过`dev`指令启动本地服务:

```bash
helldoc dev
```

访问提示的命令行输出的默认端口地址 [localhost:8000](localhost:8000)，你就可以看到你的文档服务了。

> TIPS: 在 HellDoc 中，README.md 是当成网站的主页直接通过`/`访问的

### `hell.config.js`

再添加一个 `Yay.md` 在当前目录下:

```markdown
# Yay

## Hello, Yay.
```

`HellDoc` 会通过文档的名字生成对应的路由, 这一篇文章可以通过 [localhost:8000/Yay](localhost:8000/Yay) 访问到!

让我们更进一步——为了得到更加友好的体验，`HellDoc`提供了一个调整网站细节的配置入口。

在当前目录下新建一个`hell.config.js`:

```javascript
module.exports = {
  // 网站标题
  title: "My First HellDoc Document.",
  // 网站head标签信息
  head: [["link", { rel: "icon", href: "./favicon.png" }]],
  // 皮肤设置
  themeConfig: {
    // 导航栏信息
    nav: [{ text: "Hell", link: "/" }, { text: "Yayyyyyy", link: "/Yay" }]
  }
};
```

😏 到这里，你就得到了一个交互不错的文档站点。

## 部署到 Github Pages

### 设置 base 信息

首先需要根据 repo 信息修改一下`hell.config.js`:

```javascript
module.exports = {
  base: "你的repo名字",
  dest: "打包后输出的静态文件目录"
};
```

这样，`HellDoc` 的前端路由地址就能够正常工作。

在当前目录通过`prod`指令生成静态文件:

```
helldoc prod
```

最后把你生成的结果提交上去就可以了。

## Example

### Author Blog

这里有一个[例子](https://github.com/fimars/saki)可以作为参考
