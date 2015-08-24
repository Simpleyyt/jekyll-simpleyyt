---
layout: post
category: Linux
title: sk_buff结构分析
tagline: by Snail
tags: [linux, driver]
---
在wlan驱动中，数据读取写入是通过`sk_buff`这个结构体，而`sk_buff`结构主要作用是包含接收的缓冲数据，和它的包头信息。

<!--more-->

如下是`sk_buff`的主要结构成员：

	struct sk_buff {
	...
		unsigned char *head;
		unsigned char *data;
		unsigned char *tail;
		unsigned char *end;
	...
	};

当然，`sk_buff`还包含一些链表的东西，在此处并不做解析。在以上结构体中：

 * `head`：报文缓冲区的头；
 * `data`：数据的头指针；
 * `tail`：数据的尾指针；
 * `end` ：报文缓冲区的尾部。

 如图所示，

![](http://pic.yupoo.com/simpleyyt/DGDM9tAj/medish.jpg)

分别有三个空间：*head room*、*packet data*、*tail room*。其中*packet data*是数据所在区包括数据的包头，*head room*是数据头部增长的预留空间、*tail room*是尾部增加的空间。预留头部使用`skb_reserve(skb, header_len);`函数，尾部增加使用`skb_put()`，头部增长使用`skb_push()`。

以下图是调用分配空间函数，即初始化函数`alloc_skb(len, GFP_KERNEL)`的样子：

![](http://pic.yupoo.com/simpleyyt/DGDLzyp1/medish.jpg)

可以看到，`head`、`data`和`tail`都指向了缓冲区的起始，而end指向结束。这个SKB的数据长度为0，不包含任何数据。

接着调用了`skb_reserve(skb, header_len)`预留了头部数据，如图所示：

![](http://pic.yupoo.com/simpleyyt/DGDM9eQx/medish.jpg)

通过调用`skb_put()`向尾部增长数据，如图所示：

![](http://pic.yupoo.com/simpleyyt/DGDM9fX0/medish.jpg)

通过调用`skb_push()`向头部增长数据，如图所示，增加了一个UDP头：

![](http://pic.yupoo.com/simpleyyt/DGDM8T7V/medium.jpg)

---

*本文考参：<http://vger.kernel.org/~davem/skb_data.html>*