```
title: 本hexo博客是如何部署的
date: 2018-05-07 14:12:59
tags: 教程
```

# The `One` Doc

我闲暇时间想了解一些市面上的文档库的产物，但是现在留下一个半成品也不是个说法，所以打算把这个工具完善一下。

## 开始之前

今天简单得折腾了一下博客，我这个人是不太爱做重复劳动的，简单记录下如何配置通过 [git-hook](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)来实现`hexo`博客的服务端即时更新。

本文默认读者已经拥有:

- 一个hexo博客的代码仓库
- 一个任意配置的服务器

*PS: 本例子的服务器系统是`ubuntu`系统，读者请需要根据实际使用的系统最顺手的包管理器。*


## 在服务器上需要做的事情

包括以下几个步骤，了解的部分可跳过

1. 提供一个可访问静态文件的web服务, 我这里选用的是nginx
2. 让服务器能够通过`git`获取到最新的博客源码
3. 根据最新的博客源码，更新服务器上供访问的静态文件目录


### nginx安装

```bash
sudo apt-get install nginx # 安装nginx
```
安装完成之后，你就可以直接通过你服务器的地址直接访问到`/var/www/html`下这个nginx的默认站点了。也可以根据自己的情况选择使用其他Web服务。

### 新建git空仓库

如果服务器没办法直接访问到`git`仓库的话，以`github`为例子的[官方教程](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)可以先看一下。

新建一个git空仓库
```bash
apt-get install git-core # 安装git

mkdir ~/blog.git 
cd ~/blog.git && git init --bare
```

设置git仓库钩子, 在`blog.git`目录下新建`hooks/post-receive`文件
```bash
#!/bin/bash

sudo rm -rf /var/www/html
sudo git clone ~/blog.git /var/www/html
```

记得给这个文件加上执行权限

```bash
chmod +x ~/blog.git/hooks/post-receive
```

这个钩子的目的是为了能够在更新内容到服务器的时候，把内容更新到供访问的静态文件目录上。
到这个地方，服务器上需要做的事情已经差不多了，接下来的部分就十分简单。

## 配置一下git-deploy

在你的hexo博客的`_config.yml`里面加上下面这段

```yml
 deploy:
   type: git
   repo: 你的用户名@你的服务器地址:blog.git
```

然后，安装`hexo-deployer-git`包

```bash
npm install hexo-deployer-git --save
```

到这里就完成了，可以尝试一下看看

```bash
hexo clean & hexo generate --deploy
```

以上




