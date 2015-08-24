---
layout: post
category: daily
title: 批量删除Kindle云端的个人文档
tagline: by Snail
tags: [kindle]
---
在使用Kindle的推送时，有一个不好的地方就是，推送的电子书会被放到云端，而且要删除的话不能批量删，长年累月就积累了一大批。本人找到一种方法可以批量删除当前*个人文档*页面的电子书。

<!--more-->

首先，登录*amazon*，并点击个人文档，将以下代码复制进地址栏中：

	javascript:(function(){ var v = new RegExp("PersonalDocuments"); if (!v.test(document.URL)) { return false; } {a=document.getElementsByClassName('rowBodyCollapsed');for(var i = 0; i<a.length; i++){Fion.deleteItem('deleteItem_'+a[i].getAttribute('asin'));};return; }})();

按回车后，便会删除当前页面的电子书。当然，你也可以在搜索框搜索电子书，再输入以上代码删除搜索结果页面的电子书。

这里有一个要注意的地方，如果你使用的浏览器是*chrome*的话，以上代码复制进地址栏时，*javascript*这个关键字会被注释掉，可以复制进地址栏之后，再在前面添加*javascript*关键字。当然，你也可以按*F12*进入打开*开发者工具*，再点击*Console*,再输入以上代码。