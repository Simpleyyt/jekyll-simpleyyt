---
layout: post
category: Embedded
title: Marvel 88w8686 Linux驱动分析
tagline: by Snail
tags: [wifi, linux, driver]
---
由于编写Marvel 88w8686 wlan模块SPI接口的*stm32*驱动的需要，对[Marvel 88w8686 Linux](http://pan.baidu.com/s/1dDiSZFb) SPI接口的驱动进行了分析和参考。

<!--more-->

#Marvel驱动的使用#

88w8686的Linux驱动是通过模块方式载入内核的，在使用时加载进去就行了，88w8686的Linux驱动还包含了sdio的驱动，加载时，还必须加载sdio驱动。在运行`make`命令进行编译后，会生成`sdio.o`和`sd8386.o`文件，在终端下输入下列命令进行加载：

	insmod sdio.o
	insmod sd8385.o

#Marvel驱动源码分析#

了解完如何使用Marvel 88w8686 Linux驱动后，便可以进行驱动源码的分析。源码[点击此处](http://pan.baidu.com/s/1dDiSZFb)下载。

##源码目录结构##

源码的目录结构如下：

	.
	├─app
	│  └─wlanconfig
	├─config
	├─if
	│  └─if_gspi
	├─io
	│  └─gspi
	│      └─pxa270
	├─os
	│  └─linux
	└─wlan

其中*app文件夹*是驱动自带的wlanconfig工具，用于配置wifi的参数，本文不进行分析。*config文件夹*包含的是一些配置文件，不进行分析。if文件夹包含的是关于GSPI操作的接口，包括固件。*io文件夹*包含的是GSPI驱动。*os文件夹*包含的是与系统相关的操作与头文件。*wlan文件夹*是wifi驱动的主要目录，在本文进行重点分析。

##驱动的启动流程##

由上文可知，wlan驱动是通过`insmod`进加载的。在文件`wlan/wlan_main.c`末尾处可以看到：

	module_init(wlan_init_module);
	module_exit(wlan_cleanup_module);

	MODULE_DESCRIPTION("M-WLAN Driver");
	MODULE_AUTHOR("Marvell International Ltd.");

这几个宏说明了wlan驱动模块的入口，知道其初始化函数是`wlan_init_module`。

再来看看`wlan_init_module`函数，在其函数中，调用了以下函数对网卡插入和移除时调用的函数进行了注册，即当电脑检测到网卡时有调用`wlan_add_card`。

	sbi_register(wlan_add_card, wlan_remove_card, NULL)

在`wlan_add_card`中，进行初始化后，以下函数启动了内核主线程`wlan_service_main_thread`。

	wlan_create_thread(wlan_service_main_thread, &priv->MainThread, "wlan_main_service")

###内核主线程###

内核主线程`wlan_service_main_thread`承担了wlan驱动的主要工作，它主要是处理wlan固件的事件，wlan固件接受到的数据和内核传来的数据。

在`wlan_service_main_thread`函数中有一个`for`死循环，所有数据处理都在循环里面。

在主循环里面，首先调用：

	OS_SET_THREAD_STATE(TASK_INTERRUPTIBLE);
	...
	schedule();

让主线程进入可中断的等待模式，等到事件到来。当主线程被唤醒时，即有数据要处理，便调用：

	sbi_get_int_status(priv, &ireg)；
	...
	Adapter->HisRegCpy |= ireg;

先读取网卡固件发来的数据及标志位，将标志位存入`Adapter->HisRegCpy`。

紧接着便对标志位进行判断：

	/* Command response? */
	if (Adapter->HisRegCpy & HIS_CmdUpLdRdy) {
		PRINTM(INFO, "main-thread: Cmd response ready.\n");

		OS_INT_DISABLE;
		Adapter->HisRegCpy &= ~HIS_CmdUpLdRdy;
		OS_INT_RESTORE;

		wlan_process_rx_command(priv);
	}

	/* Any received data? */
	if (Adapter->HisRegCpy & HIS_RxUpLdRdy) {
		PRINTM(INFO, "main-thread: Rx Packet ready.\n");
		
		OS_INT_DISABLE;
		Adapter->HisRegCpy &= ~HIS_RxUpLdRdy;
		OS_INT_RESTORE;

		wlan_send_rxskbQ(priv);
	}

	/* Any Card Event */
	if (Adapter->HisRegCpy & HIS_CardEvent) {
		PRINTM(INFO, "main-thread: Card Event Activity.\n");

		OS_INT_DISABLE;
		Adapter->HisRegCpy &= ~HIS_CardEvent;
		OS_INT_RESTORE;

		if (sbi_read_event_cause(priv)) {
			PRINTM(MSG, "main-thread: sbi_read_event_cause failed.\n");
			continue;
		}
		wlan_process_event(priv);
	}

并且调用相应的处理函数，对数据进行处理。

当然进程中还对wlan的PS（Power Save）模式和WMM（WiFi-MultiMedia）进行判断处理，本文不进行分析。

接着，便对内核发来的命令进行处理（比如说连接命令，扫描命令）：

	/* Execute the next command */
	if (!priv->wlan_dev.dnld_sent && !Adapter->CurCmd) {
		ExecuteNextCommand(priv);
	}

当然，之后便进入等待事件状态，重复以上过程。

###wlan固件数据/事件###

当wlan固件有数据/事件时，GSPI驱动会产生中断，它的中断处理函数为`sbi_interrupt`，在`sbi_interrupt`中调用了`wlan_interrupt`,在`wlan_interrupt`中，调用

	wake_up_interruptible(&priv->MainThread.waitQ);

唤醒了主线程，对数据进行处理。上面介绍过，主线程调用`sbi_get_int_status(priv, &ireg)`读取数据和标志位。

###应用层调用驱动接口###

该wlan驱动接口是wext（Wireless Extensions无线扩展接口）。wext的接口实现上，应用层采用ioctl方式访问驱动，设置无线参数或者获取无线参数，配置无线驱动进行联网操作。无线驱动事件到应用层的传递采用的netlink socket技术，一种netlink route消息技术。这也是很多其他类型的驱动标准的实现方法。具体调用方法可以参考`wlanconfig`，比如说

	ioctl(sockfd, SIOCGIWSCAN, &iwr));

调用wlan驱动扫描命令。如下函数

	s = socket(PF_INET, SOCK_DGRAM, 0);

新建了一个netlink连接。

所有的ioctl的回调函数在，wlan_wext.c的`wlan_handler`数组中，这里对`SIOCGIWSCAN`即wlan扫描进行分析。可以看到wlan扫描的回调函数是`wlan_get_scan`和`wlan_set_scan`。

先来看看`wlan_set_scan`，在`wlan_set_scan`函数中又调用了`wlan_scan_networks`,在`wlan_scan_networks`中调用了`wlan_scan_channel_list`将命令添加到命令队列中，并等待命令执行响应，然后调用`wlan_scan_process_results`更新`priv`中的扫描表。

在函数`wlan_scan_channel_list`中调用`PrepareAndSendCommand`将命令添加到命令列表。等发送到固件的数据和固件发送过来的数据都存在`CmdNode->BufVirtualAddr`指针指向的数据中，接着调用

	QueueCmd(Adapter, CmdNode, TRUE);
	wake_up_interruptible(&priv->MainThread.waitQ);

将命令加入命令队列，接着唤醒主线程处理命令，然后执行如下函数

	wait_event_interruptible(CmdNode->cmdwait_q, CmdNode->CmdWaitQWoken);

等待结果，当`CmdNode->CmdWaitQWoken`为`TRUE`时唤醒。

在主线程中，由上面知道，调用`ExecuteNextCommand`执行内核发来的命令。在`ExecuteNextCommand`函数中调用`DownloadCommandToStation`下载命令，`DownloadCommandToStation`中，先调用`sbi_host_to_card`下载命令，然后调用`ModTimer`进行超时时重新发送。

接下来，便是等待响应，当固件对发来的命令响应时，会触发中断，如上文说的调用`wlan_process_rx_command`处理固件对命令的响应。在`wlan_process_rx_command`中处理完成之后，会调用`CleanupAndInsertCmd`回收命令，此时的`CmdNode->CmdWaitQWoken`为`TRUE`，下次`schedule`时便，唤醒上面等待命令响应的线程，让其继续执行。

整个驱动运行的流程便是这样子。