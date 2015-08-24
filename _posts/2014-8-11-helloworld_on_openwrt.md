---
layout: post
category: openwrt
title: 交叉编译OpenWrt上的Helloworld
tagline: by Snail
tags: [openwrt, embedded]
---
终于编译完成了OpenWrt，并且成功交叉编译了Helloworld，并在Easy-Link的板子上运行。

<!--more-->

#编译OpenWrt SDK#

编译OpenWrt的过程，可参考[OpenWrt的编译]({% post_url 2014-8-10-compile_openwrt %})。编译配置我勾选了`Advanced configuration option`、`Build the OpenWrt SDK`和`Build the OpenWrt based Toolchain`。

编译完成之后，交叉编译工具链在类似`staging_dir/toolchain-architecture_gcc-compilerver_uClibc-libcver/bin/`目录。

#配置环境变量#

主要配置以下环境变量：

    PATH=$PATH:(toolchain/bin目录)
    export PATH
    
    STAGING_DIR=(toolchain目录)
    export STAGING_DIR
    
#交叉编译Helloopenwrt#

`helloopenwrt.c`的源码如下：

    #include <stdlib.h>
    
    int main() {
        printf("Hello OpenWrt\n");
    }
    
然后进行交叉编译：

    architecture-openwrt-linux-uclibc-gcc helloopenwrt.c -o helloopenwrt.o
    
然后将生成的`hellowopenwrt.o`文件用scp上传到Easy-Link上，并用ssh登录到Easy-Link上，并运行，便可以看到终端输出：

    Hello OpenWrt