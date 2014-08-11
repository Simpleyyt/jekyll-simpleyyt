---
layout: post
category: openwrt
title: OpenWrt编译过程中出现的错误
tagline: by Snail
tags: [openwrt, embedded]
---
编译OpenWrt不是件容易的事情，编译过程中要下载包，并且会出现很多奇怪的错误，经过几个小时的编译，终于成功了。

<!--more-->

错误的捕获可以通过以下命令：

    make V=99
    
#下载错误#

在编译的过程中，会从网上下载很多源码及包，由于服务器在国外，所以很不稳定，出现下载错误时，你可以多试几次，或者直接下载包放在相应目录。我的解决方法是用代理翻墙到国外下载。

#patch补丁文件错误#

在编译过程中，可能会出现以下的错误：

    malformed patch at line xxx
    
这是由于应用patch 时都会检查受影响的行数是否与记录在两个 @@ 之间的数值一致，如果不一致的话，就要打开patch文件手动修改那个数值以符合受影响的行数。具体可以参考[这里](http://blog.chinaunix.net/uid-11134731-id-33192.html)。

#Kconfig错误#

在编译时，可能某个Konfig文件出现以下的错误：

    'endif' in different file than 'if'
    location of the 'if'
    
这是Kconfig文件出现问题（[参考](https://lkml.org/lkml/2010/9/27/533)），只要打开相应的Kconfig文件，在他的最后一行加个加车就行了，我也不知道为什么。