---
layout: default
title: Blog
permalink: /blog/
---

# Blog

<div style="text-align: center; margin: 2rem 0;">
  <p style="color: #888; font-size: 1.1rem;">
    Research insights, event recaps, and perspectives on AI security from our community.
  </p>
</div>

---

<div class="post-list">
  {% for post in site.posts %}
    <article class="post-item">
      <h2>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      
      <div class="post-meta">
        {% if post.author %}
          <span style="color: #00ff00;">{{ post.author }}</span>
        {% endif %}
        {% if post.author and post.date %} • {% endif %}
        {% if post.date %}
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
        {% endif %}
        {% if post.category %}
          • <span style="color: #ffff00;">#{{ post.category }}</span>
        {% endif %}
      </div>

      {% if post.description %}
        <div class="post-excerpt">{{ post.description }}</div>
      {% elsif post.excerpt %}
        <div class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</div>
      {% endif %}
      
      <div style="margin-top: 1rem;">
        <a href="{{ post.url | relative_url }}" style="color: #00ffff;">Read more →</a>
      </div>
    </article>
  {% endfor %}
</div>

{% if site.posts.size == 0 %}
<div class="card" style="text-align: center;">
  <h3 style="color: #888;">No blog posts yet</h3>
  <p style="color: #666;">Check back soon for updates from the AI Village community!</p>
</div>
{% endif %}

---

<div style="background: #1a1a1a; padding: 1.5rem; border-radius: 5px; border-left: 4px solid #00ff00; margin: 2rem 0;">
  <h4 style="color: #00ff00; margin-top: 0;">📝 Want to Contribute?</h4>
  <p>We welcome guest posts from the community! Topics we're interested in:</p>
  <ul>
    <li>AI security research and findings</li>
    <li>Tool releases and tutorials</li>
    <li>Event recaps and conference reports</li>
    <li>Opinion pieces on AI ethics and policy</li>
    <li>Technical deep dives and case studies</li>
  </ul>
  <p>
    <a href="https://github.com/aivillage/aiv_website" target="_blank" style="color: #00ffff;">Submit a pull request →</a> 
    or reach out on Discord to discuss your ideas.
  </p>
</div>