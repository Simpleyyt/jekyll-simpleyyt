---
layout: page
title: Hello World!
tagline: Supporting tagline
---
{% include JB/setup %}

<h2>最近日志<a class="pull-right" href="/posts.html">更多...</a></h2>
<hr>
{% for post in site.posts limit:3 %}
<h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
<p>{{ post.content | strip_html | truncatewords: 5 }}</p>
<span class="label label-primary">日期:</span> <span class="label label-warning">{{ post.date | date: "%Y年%m月%d日" }}</span>
<span class="label label-primary">标签:</span>{% for tag in post.tags%} <span class="label label-warning">{{ tag }}</span>{% endfor %}
<span class="label label-primary">评论:</span> <span class="label label-warning"><a href="{{ post.url }}#uyan_frame" id="uyan_count_unit"> (0)</a></span>
<hr>
{% endfor %}
