---
layout: post
category: daily
title: 为Jekyll增加不完美的分页和文章摘要
tagline: by Kingauthur
tags: [jekyll]
---
怎么说呢，用Jekyll搭建Blog不管被说的多么好用，但终究应该只属于技术宅+爱折腾的群体吧，经常一个Wordpress上的小功能，却要在Jekyll折腾不少时间，比如之前的站内搜索，以及今天的分页以及文章摘要，足足折腾了我一下午，而且最后的解决方案还是不完美，有点小挫败感。

<!--more-->

回到主题，下面先说下Jekyll分页，这个功能有内置的，但是非常见鬼的，只支持对index.html的分页，你没看错，文件名必须是这个，如果你是用JB的话，把index.md重命名成index.html，然后再继续往下看：

修改_config.yml文件，增加

    # 每一页显示的文章数
    paginate: 5

添加了上面后，你就可以在index.html页面中，引用paginator这个对象了，记住，只有index.html页面可以用。

<table>
<tr><td>变量名</td>	                <td>描述</td></tr>
<tr><td>paginator.per_page</td>     <td>每页的文章数</td></tr>
<tr><td>paginator.posts</td>        <td>这个分页下所有的文章列表</td></tr>
<tr><td>paginator.total_posts</td>  <td>总文章数</td></tr>
<tr><td>paginator.total_pages</td>  <td>总页数</td></tr>
<tr><td>paginator.page</td>         <td>当前页</td></tr>
<tr><td>paginator.previous_page</td><td>前一页</td></tr>
<tr><td>paginator.next_page</td>    <td>后一页</td></tr>
</table>

具体如何使用，参考[How pagination works](https://github.com/mojombo/jekyll/wiki/Pagination).

前面也提到了，这个只支持首页模式，也就是说，你的Blog里有多个文章类目，然后这个是不支持的，所以我称做为不完美的分页。不过我的Blog文章还少，而且我向来是个比较懒的人，等分类下的文章也多了，再来想怎么解决吧。

下面说说怎么搞文章摘要，如果没有摘要的，列表展示是很头大的。目前有这么几种方法：

 1. 用内置的truncate或者truncatewords方法，这个好处是内置的，不需要装插件，不需要装插件意味着你可以在托管Github上用，因为Github上很多插件都不支持。但缺点也很明显，对html的标签支持不是很好，如果你是纯文本的Blog，倒也还好。

 2. 装truncatehtml插件。这个插件首先需要nokogiri，所以你需要在本地安装，安装命令如下：

        gem install nokogiri

    然后再安装上述的插件，这个插件的好处就是对解析后的html代码进行控制，但坏处就是，你如果是托管在Github上，那就悲剧了，不能用。

上面两种方法，都有一个问题，就是对所有文章的摘要提取都是一样的，但是有时候，对于不同的问题，我想显示不同长度的摘要，所以下面隆重祭出第三种方法（其实，也是我在网上找的，版权不归我哈）： 
首先，在你文章里，想要输出摘要的截至地方，打上标签，比如：

     ---
     title: some post
     layout: post
     ---

     我有一头小毛驴呀，从来也不骑。

     <!--break-->

     有一天我心血来潮骑它取赶集。  

然后用下面的方式截取：

      \{\{ post.content  | | split:'<!--break-->' | first \}\}
  
这样的方式，就是，你需要在写文章的时候，打一个注释，但是，这个成本，我想，还好吧。

---

*本文转自：<http://kingauthur.info/2013/01/20/the-paginator-and-excerpt-in-jekyll/>*