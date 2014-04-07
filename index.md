---
layout: page
title: 最近日志
tagline: by Snail
---
{% include JB/setup %}

{% for post in site.posts limit:3 %}
<h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
<p>{{ post.content | strip_html | truncatewords: 5 }}</p>
<hr>
{% endfor %}
