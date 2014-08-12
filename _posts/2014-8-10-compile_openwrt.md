---
layout: post
category: openwrt
title: OpenWrt的编译
tagline: by Snail
tags: [openwrt, embedded]
---
最近在淘宝上买了基于AR9331的Easy-Link模块，尝试着编译了一下OpenWrt，编译环境为ubuntu 12.04。

<!--more-->

#安装组件#

打开终端，安装编译所需的组件：

    sudo apt-get install gcc g++ binutils patch bzip2 flex bison make autoconf gettext texinfo unzip sharutils subversion libncurses5-dev ncurses-term zlib1g-dev git-core gawk asciidoc libz-dev
    
#下载及更新Openwrt源码#

打开终端，输入下以命令下载源码,当然还可以下载其它的版本，注意不要包含中文路径。

    svn co svn://svn.openwrt.org/openwrt/branches/attitude_adjustment
    
进入源码目录，更新源码：

    svn update
    
更新源：

    ./scripts/feeds update -a
    
安装下载好的包：

    ./scripts/feeds install -a
    
#编译配置#

打开终端，输入：

    make menuconfig
   
打开OpenWrt配置界面进行配置。当然，Easy-Link有自己的补丁包。

如果你想配置内核，可以在终端中输入：

    make kernel_menuconfig
    
#编译#

在终端中输入：

    make -j 2
    
其中的2表示用2个线程进行编译，适用于多核CPU。在编译过程中会下载相应的文件，编译完成后，会在bin目录生成固件文件。

如果想清除生成的文件，可在终端中输入：

    make clean
    
如果想初始化编译环境，可在终端中输入：

    make dirclean
    
如果想查看编译详细内容，或者捕获错误，可在终端中输入：

    make V=99