---
layout: post
category: c++
tagline: by Snail
title: 《C++ Primer》笔记：第3章
tags: c++ primer
---
《C++ Primer》第3章笔记，字符串、向量和数组。

<!--more-->

# Vector

## vector值初始化

如果Vector对象中的类型不支持默认初始化，就必须提供初始值，如（`string`支持默认初始化）：

    vector<string> vec(10, "s");

## 列表初始化

如果使用花括号，先尝试列表初始化，再尝试默认初始化，如：

    vector<string> v5{"hi"}; //列表初始化
    vector<string> v6{10}; //默认初始化
    
## vector操作

    v1 = {a,b,c... } 用列表中元素的拷贝替换v1中的元素
    
## 使用范围for语名改变字符中的字符

    string s("Hello World!!!");
    for (auto &c : s)
        c = toupper(c);
    cout << s << endl;
    
## 迭代器

C++11新标准引入了`cbegin()`返回`const_iterator`。

迭代器距离类型为`difference_type`。

# 数组

## 初始化

不允许用auto关键字。

    int ia[] = {0,1,2}
    auto ia2(ia); //ia2是一个整型指针，指向ia的第一个元素。
    decltype(ia) ia3; //10个整数构成的数组。

## 复杂的数组声明

    int *ptrs[10]; //ptrs是含有10个整型指针的数组
    int (*Parray)[10] = &arr; //Parray指向一个含有10个整数的数组
    int (&arrRef)[10] = arr;  //arrRef引用一个含有10个整数的数组
    int *(&arry)[10] = ptrs; //arry是数组的引用，该数组含有10个指针
    
## 下标和指针

内置的下标运算符所用的索引值不是无符号类型。

## 标准库函数begin和end

C++11新标准加入了begin和end函数。

## 标准库类型

`size_t`为数组大小类型，`ptrdiff_t`为指针距离类型。

## 使用数组初始化vector

    int int_arr[] = {0, 1, 2};
    vector<int> ivec(begin(int_arr), end(int_arr));
    
# 多维数组

## 使用范围for

    size_t cnt = 0;
    for (auto &row : ia)
        for (auto &col : row) {
            col = cnt;
            ++cnt;
        }

除了最内层的循环外，其它的循环的控制变量必须是引用类型的。

## 指针和多维数组

    int ia[3][4];
    int (*p)[4] ia;
    p = &ia[2];
    for (auto p = ia; p != ia + 3; ++p) {
        for (auto q = *p; q != *p + 4; ++q)
            cout << *q << ' ';
        cout << endl;
    }
