export const siteData = {
  "pages": [
    {
      "key": "v-17398ee6aeb92",
      "path": "/Users/fimars/workshadow/Hell/docs/Ch1.md",
      "headers": [
        {
          "id": "TEST",
          "level": 1,
          "parent": null,
          "text": "TEST"
        },
        {
          "id": "TTes",
          "level": 2,
          "parent": null,
          "text": "TTes"
        },
        {
          "id": "TTTT2",
          "level": 3,
          "text": "TTTT2"
        },
        {
          "id": "ewe",
          "level": 3,
          "text": "ewe"
        }
      ],
      "frontmatter": {
        "title": "Ch1, A Chapter For Test.",
        "date": "2018-05-07 14:12:59",
        "tags": "教程"
      },
      "content": "<h1 id=\"test\">TEST</h1>\n<p>TEST\nTEST\nTEST</p>\n<h2 id=\"ttes\">TTes</h2>\n<p>1231212312</p>\n<h3 id=\"tttt2\">TTTT2</h3>\n<p>3123123123</p>\n<h3 id=\"ewe\">ewe</h3>\n<p>23123123123</p>\n"
    },
    {
      "key": "v-36ff107e9d74e",
      "path": "/Users/fimars/workshadow/Hell/docs/README.md",
      "headers": [
        {
          "id": "The `One` Doc",
          "level": 1,
          "parent": null,
          "text": "The `One` Doc"
        },
        {
          "id": "开始之前",
          "level": 2,
          "parent": null,
          "text": "开始之前"
        },
        {
          "id": "在服务器上需要做的事情",
          "level": 2,
          "parent": null,
          "text": "在服务器上需要做的事情"
        },
        {
          "id": "nginx安装",
          "level": 3,
          "text": "nginx安装"
        },
        {
          "id": "新建git空仓库",
          "level": 3,
          "text": "新建git空仓库"
        },
        {
          "id": "配置一下git-deploy",
          "level": 2,
          "parent": null,
          "text": "配置一下git-deploy"
        }
      ],
      "frontmatter": {
        "title": "本hexo博客是如何部署的",
        "date": "2018-05-07T14:12:59.000Z",
        "tags": "教程"
      },
      "content": "<h1 id=\"the-one-doc\">The <code>One</code> Doc</h1>\n<p>我闲暇时间想了解一些市面上的文档库的产物，但是现在留下一个半成品也不是个说法，所以打算把这个工具完善一下。</p>\n<h2 id=\"-\">开始之前</h2>\n<p>今天简单得折腾了一下博客，我这个人是不太爱做重复劳动的，简单记录下如何配置通过 <a href=\"https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90\">git-hook</a>来实现<code>hexo</code>博客的服务端即时更新。</p>\n<p>本文默认读者已经拥有:</p>\n<ul>\n<li>一个hexo博客的代码仓库</li>\n<li>一个任意配置的服务器</li>\n</ul>\n<p><em>PS: 本例子的服务器系统是<code>ubuntu</code>系统，读者请需要根据实际使用的系统最顺手的包管理器。</em></p>\n<h2 id=\"-\">在服务器上需要做的事情</h2>\n<p>包括以下几个步骤，了解的部分可跳过</p>\n<ol>\n<li>提供一个可访问静态文件的web服务, 我这里选用的是nginx</li>\n<li>让服务器能够通过<code>git</code>获取到最新的博客源码</li>\n<li>根据最新的博客源码，更新服务器上供访问的静态文件目录</li>\n</ol>\n<h3 id=\"nginx-\">nginx安装</h3>\n<pre><code class=\"language-bash\">sudo apt-get install nginx # 安装nginx</code></pre>\n<p>安装完成之后，你就可以直接通过你服务器的地址直接访问到<code>/var/www/html</code>下这个nginx的默认站点了。也可以根据自己的情况选择使用其他Web服务。</p>\n<h3 id=\"-git-\">新建git空仓库</h3>\n<p>如果服务器没办法直接访问到<code>git</code>仓库的话，以<code>github</code>为例子的<a href=\"https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/\">官方教程</a>可以先看一下。</p>\n<p>新建一个git空仓库</p>\n<pre><code class=\"language-bash\">apt-get install git-core # 安装git\n\nmkdir ~/blog.git \ncd ~/blog.git &amp;&amp; git init --bare</code></pre>\n<p>设置git仓库钩子, 在<code>blog.git</code>目录下新建<code>hooks/post-receive</code>文件</p>\n<pre><code class=\"language-bash\">#!/bin/bash\n\nsudo rm -rf /var/www/html\nsudo git clone ~/blog.git /var/www/html</code></pre>\n<p>记得给这个文件加上执行权限</p>\n<pre><code class=\"language-bash\">chmod +x ~/blog.git/hooks/post-receive</code></pre>\n<p>这个钩子的目的是为了能够在更新内容到服务器的时候，把内容更新到供访问的静态文件目录上。\n到这个地方，服务器上需要做的事情已经差不多了，接下来的部分就十分简单。</p>\n<h2 id=\"-git-deploy\">配置一下git-deploy</h2>\n<p>在你的hexo博客的<code>_config.yml</code>里面加上下面这段</p>\n<pre><code class=\"language-yml\"> deploy:\n   type: git\n   repo: 你的用户名@你的服务器地址:blog.git</code></pre>\n<p>然后，安装<code>hexo-deployer-git</code>包</p>\n<pre><code class=\"language-bash\">npm install hexo-deployer-git --save</code></pre>\n<p>到这里就完成了，可以尝试一下看看</p>\n<pre><code class=\"language-bash\">hexo clean &amp; hexo generate --deploy</code></pre>\n<p>以上</p>\n"
    }
  ],
  "title": "siteTitle"
}