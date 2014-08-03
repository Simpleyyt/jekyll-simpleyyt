---
layout: post
category: android
title: 强化你的Terminal IDE——在android平板/手机上编写C/C++
tagline: by Snail
tags: [android, c++, c]
---
Terminal IDE是一个可扩展的终端应用，其包含了全功能的Java/HTML/Android开发套件。Terminal IDE集成了VIM, ssh, git等多个功能，其中强大之处，大家自己发觉，如果你用惯了Linux下的shell命令，那么用Terminal IDE你将会得心应手，喜欢上它的。

<!--more-->

虽然Terminal IDE很强大，可以编写Java，android，但它没有gcc/g++。没关系，Terminal IDE强大之处就在于它是可拓展的，具体可以看它的Help。此处，我说明一下，如何把gcc/g++加入Terminal IDE，其实就是将linux-arm-gcc加入Terminal IDE 。 

首先，将[linux-arm-gcc](http://www.kuaipan.cn/file/id_41572487401570322.htm)解压到Terminal IDE中的`~/system`目录下(不是系统的`/system/`，其真正目录为:`data/data/com.spartacusrex.spartacuside/files/system`)。

修改该'gcc'目录为可读写，在Terminal IDE下执行

	chmod -R 777 ./gcc

修改`~`(即`data/data/com.spartacusrex.spartacuside/files/`)目录下的`.bashrc`文件。添加需要的环境变量，在`~/.bashrc`文件添加如下环境变量：

	export CPLUS_INCLUDE_PATH=$IDESYSTEM/gcc/arm-linux-androideabi/c++/include:$CPLUS_INCLUDE_PATH
	export C_INCLUDE_PATH=$IDESYSTEM/gcc/arm-linux-androideabi/include:$C_INCLUDE_PATH
	export PATH=$IDESYSTEM/gcc/bin:$PATH

将`gcc/bin`下的相应文件改一下名，改为`gcc`和`g++`。

再重启Terminal IDE后(需按TerminalIDE的Shutdown按钮)，便可以使用gcc和g++进行c++/c的编译，如下：

	vim a.cpp   //写入代吗
	g++ a.cpp   //编译
	./a.out     //运行

此时，再用otg接个键盘或者用蓝牙键盘的话，那么整个apad就相当于你的电脑，得心应手。

如果你熟悉Linux和vim，以上方法是不错的选择，如果不熟悉的话，可以用C4droid。这里在贴出几个工具：（下载地址可以自己搜，我只贴出GooglePlay上的地址。）

　　[AIDE](https://play.google.com/store/apps/details?id=com.aide.ui&hl=en)：可以在android平板/手机上编写android应用，编译后可直接安装。

　　[C4droid](https://play.google.com/store/apps/details?id=com.n0n3m4.droidc&hl=en)：可以在android平板/手机上编写并编译c/c++，不过不够强大。但比较容易安装。

　　ADDI：可以在android平板/手机上执行少量的matlab指令。

以上适合apad+键盘，如果没有键盘的话，我觉得还是别折腾了，没有这个必要吧。写一写小程序还是可以的，大的项目就不行了，编译会很慢的。