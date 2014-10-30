---
layout: post
category: linux
title: Linux-ZigBee项目：在Linux上运行6lowpan（一）
tagline: by Snail
tags: [linux, embedded]
---
前段时间在看ZigBee的物理层和MAC层协议栈，也就是IEEE802.15.4协议。之后，发现sourceforge上有一个[linux-zigbee](http://sourceforge.net/projects/linux-zigbee/)的项目，[中文翻译介绍](http://blog.chinaunix.net/uid-29653824-id-4351049.html)。虽然这个项目叫Linux-ZigBee，但是因为许可问题除了IEEE802.15.4协议，其它的都没有实现，转而转向6lowpan，所以本文介绍一下用Ubuntu串口连接CC2530运行6lowpan。

<!--more-->

#交叉编译内核#

由于主线内核只包含了`ieee802154`、`fakehard`和`6lowpan`，所以没办法使用ZigBee串口设备。所以要下载linux-zigbee内核：

	git clone git://git.code.sf.net/p/linux-zigbee/kernel -b 6lowpan linux-zigbee-kernel

当然也可以去项目主页下载。下载完成之后，进行源码目录，然后：

	make menuconfig

选择`mac802154`、`ieee802154`和`serial`等模块。然后保存退出，进行编译：

	make -j 2

如果出现错误可以网上搜解决方法，编译完成之后，编译模块：

	make modules

接着安装模块：

	make modules_install

安装内核：

	make install

至此，内核已经编译并且安装成功了。重启PC之后，加载相关模块：

	sudo modprobe ieee802154
	sudo modprobe mac802154
	sudo modprobe af_802154
	sudo modprobe serial

每当需使用时，都必须加载上述模块。

#安装lowpan-tools#

`lowpan-tools`是管理Linux LowPAN协议栈的工具，由于Ubuntu的lowpan-tools版本太老了，所以需要从项目主页下载安装：

	git clone git://git.code.sf.net/p/linux-zigbee/linux-zigbee linux-zigbee-linux-zigbee

下载完成之后，进入源码目录安装：

	./autogen.sh
	sudo make install

安装完成之后，便可以使用`izattach`工具添加ZigBee串口设备。