---
layout: post
category: vocore
title: VoCore首次启动失败
tagline: by Snail
tags: [vocore, embedded]
---
本来以为首次启动应该顺顺利利的，但是，问题总是在遇到我的时候变得很复杂，问题总是以意思不到的形式出现，接上电源后，竞然搜不到ssid为VoCore的WiFi。

<!--more-->

#VoCore的电源#

如图所示，VoCore输入电源3.3V~6.0V，经MT3410L转换成3.3V，再经MT3410L转成1.8V，给RT5350F供电。因此，只要输入5.0V的USB电源便可以正常运行了。

![VoCore电源](http://pic.yupoo.com/simpleyyt/DWDDZ6oi/medium.jpg)

本人决定用Mini USB线来改装。Mini USB有4条线，分别是红、白、绿、蓝（黑），其中红是正极，蓝（黑）是地，将这两根线接到图中红框所示的地方，便可以正常启动。

![](http://pic.yupoo.com/simpleyyt/DXff2TTy/medish.jpg)

![](http://pic.yupoo.com/simpleyyt/DWDDWsPw/medish.jpg)

#问题出现#

接上5V USB电源之后，LED亮了大约1秒，之后，大约隔18秒之后，led亮了大约15秒，之后，又等了好久，始终看不到VoCore的Wifi出现。询问作者Vonger，Vonger表示led正常，要求给出USB-TTL的Log进行分析，所以又制作了VoCore的USB-TTL。

#USB-TTL输出#

依照Vonger博客上的方法，使用USB-TTL模块，并将相应引脚接到红框部分。

![](http://pic.yupoo.com/simpleyyt/DXfetmAA/medish.jpg)

![](http://pic.yupoo.com/simpleyyt/DWDDVduJ/medish.jpg)

电脑端的串口调试客户端，我用的是putty，相关的串口参数如下：

 * 波特率57600
 * 数据位8位
 * 无校验位
 * 停止位1位

之后，便可以打印出log信息。