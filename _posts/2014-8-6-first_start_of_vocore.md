---
layout: post
category: vocore
title: VoCore启动成功
tagline: by Snail
tags: [vocore, embedded, wifi]
---
换了个VoCore板之后，VoCore就能正常启动了，顺便测试了一下ssh和ap+sta模式。

<!--more-->

#SSH连接#

VoCore连上电源后，等待大约30秒之后，便会有发出一个ssid为VoCore的无加密wifi。连上之后，在浏览器输入192.168.1.1，进入Openwrt的Luci界面。

![](http://simpleyyt.qiniudn.com/2014-08-06%2010:17:23%E7%9A%84%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

用户名为root，密码为vocore，登录进去之后，系统会提示修改密码并开启ssh，按照提示操作之后，打开终端，输入：

    ssh root@192.168.1.1
    
输入密码之后，便可以登录进去了。

#STA+AP模式#

根据作者博客介绍，VoCore的STA和AP能够同时工作。首先，开启STA模式，添加下面内容到｀/etc/config/network`。

    config interface wwan
        option proto 'dhcp'
	
然后，修改`/etc/config/wireless`文件：

    config wifi-device  radio0
    	option type     mac80211
    	option channel  11
    	option hwmode	11ng
    	option path	'10180000.wmac'
    	list ht_capab	GF
    	list ht_capab	SHORT-GI-20
    	list ht_capab	SHORT-GI-40
    	list ht_capab	RX-STBC1
    	option htmode	HT20
    
    config wifi-iface
        option device   radio0
    	option network  lan
    	option mode     ap
    	option ssid     VoCore
    	option encryption none
    
    config wifi-iface
    	option device   radio0
    	option network  wwan
    	option mode     sta
	    option ssid     VongerWifi
    	option encryption psk2
    	option key      PasswordForWifi

修改相应ssid与密码即可。

如果，你家的路由是用192.168.1.1作它的IP地址，那么为避免冲突，你必须修改VoCore的IP，修改文件里相应的IP，如192.168.61.1。

    config interface 'lan'
    	option ifname 'eth0.1'
    	option type 'bridge'
    	option proto 'static'
    	option ipaddr '192.168.61.1'
    	option netmask '255.255.255.0'
    	option ip6assign '60'
    	
重启连接成功之后，VoCore便可以访问外网了。