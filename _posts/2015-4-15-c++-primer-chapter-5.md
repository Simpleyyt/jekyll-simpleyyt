---
layout: post
category: c++
title: 《C++ Primer》笔记：第5章
tagline: by Snail
tags: c++ primer
---
《C++ Primer》第5章笔记，语句。

<!--more-->

# Switch语句

## 内部变量定义

    case ture:
        string file_name; //错误：隐式初始化
        int jval = 0;  //错误：显示初始化
        int jval;   //正确

# 范围for语句

    for (declaration : expression)
	    statement

`expression`必须是一个序列，拥有能返回迭代器的`begin`和`end`成员。如果需要对序列中的元素执行写操作，循环变量必须是引用类型。
