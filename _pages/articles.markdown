---
layout: archive
title: Blog
permalink: /blog/
---


{% if paginator %}
  {% assign posts = paginator.posts %}
{% else %}
  {% assign posts = site.posts %}
{% endif %}

{% assign entries_layout = page.entries_layout | default: 'list' %}
<div class="entries-{{ entries_layout }}">
  {% for post in posts %}
    <article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">
      <h2 class="archive__item-title" itemprop="headline">
        <a href="{{ post.url | relative_url }}" rel="permalink">{{ post.title }}</a>
      </h2>

      {% if post.author or post.date %}
        <p class="archive__item-meta" style="margin: 0; padding: 0; font-size: 0.85rem; color: #666;">
          {% if post.author %}
            <span class="post-author">{{ post.author }}</span>
          {% endif %}
          {% if post.author and post.date %} &middot; {% endif %}
          {% if post.date %}
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
          {% endif %}
        </p>
      {% endif %}

      {% if post.excerpt %}
        <p class="archive__item-excerpt" itemprop="description">
          {{ post.excerpt | strip_html | truncatewords: 30  }}
        </p>
      {% endif %}
    </article>
  {% endfor %}
</div>

{% include paginator.html %}
