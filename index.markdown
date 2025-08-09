---
layout: default
title: Home
---

<div style="text-align: center; margin: 3rem 0;">
  <h1 class="glitch cursor" data-text="AI VILLAGE">AI VILLAGE</h1>
  <p style="font-size: 1.2rem; color: #888; font-family: 'JetBrains Mono', monospace;">
    A community of hackers and data scientists working to educate the world on the use and abuse of artificial intelligence in security and privacy.
  </p>
</div>

The GRT 3 will run online in about a month with partners. Please sign up [here](https://auth.aivillage.org/login) to recieve an email with more information. 

---

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <style>
    @media (max-width: 768px) {
      div[style*="grid-template-columns: 1fr 1fr"] {
        grid-template-columns: 1fr !important;
      }
    }
  </style>
  
  <div class="card">
    <h3 style="color: #00ff00; margin-top: 0;">🔥 Upcoming Events</h3>
    {% assign now = 'now' | date: "%s" %}
    {% assign found = false %}
    {% for event in site.events %}
      {% assign event_time = event.date | date: "%s" %}
      {% if event_time >= now and found == false %}
        {% assign found = true %}
        <div class="event-item" style="background: #1a1a1a; border-left: 4px solid #ff0000;">
          <div class="event-date">
            <div class="event-month">{{ event.date | date: "%b" }}</div>
            <div class="event-day">{{ event.date | date: "%d" }}</div>
          </div>
          <div class="event-content">
            <h4 style="margin: 0;">
              <a href="{{ event.url | relative_url }}">{{ event.title }}</a>
            </h4>
            {% if event.location %}
              <div class="event-location">📍 {{ event.location }}</div>
            {% endif %}
            {% if event.description %}
              <div class="event-description">{{ event.description }}</div>
            {% endif %}
          </div>
        </div>
      {% endif %}
    {% endfor %}
    {% if found == false %}
      <p style="color: #888;">No upcoming events. Check back soon!</p>
    {% endif %}
    <p style="margin-top: 1rem;">
      <a href="{{ '/events/' | relative_url }}" style="color: #00ffff;">→ View all events</a>
    </p>
  </div>

  <div class="card">
    <h3 style="color: #00ff00; margin-top: 0;">📝 Latest Blog Post</h3>
    {% assign latest_post = site.posts.first %}
    {% if latest_post %}
      <h4 style="margin: 0.5rem 0;">
        <a href="{{ latest_post.url }}">{{ latest_post.title }}</a>
      </h4>
      <div style="color: #888; font-size: 0.9rem; font-family: 'JetBrains Mono', monospace; margin: 0.5rem 0;">
        By {{ latest_post.author }} • {{ latest_post.date | date: "%b %-d, %Y" }}
      </div>
      {% if latest_post.description %}
        <div style="margin: 1rem 0;">{{ latest_post.description }}</div>
      {% elsif latest_post.excerpt %}
        <div style="margin: 1rem 0;">{{ latest_post.excerpt | strip_html | truncatewords: 20 }}</div>
      {% endif %}
    {% else %}
      <p style="color: #888;">No blog posts yet.</p>
    {% endif %}
    <p style="margin-top: 1rem;">
      <a href="{{ '/blog/' | relative_url }}" style="color: #00ffff;">→ Read all posts</a>
    </p>
  </div>

</div>

{% if site.random != empty %} 

---

## 🎯 Mission

We aim to bring more diverse viewpoints to AI security, grow a community of hackers, engineers, researchers, and policy makers, and encourage more people with a hacker mindset to assess machine learning systems. We have a strong presence at DEF CON, the world's longest-running and largest hacking conference.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  
  <div class="card" style="text-align: center;">
    <h4 style="color: #ffff00;">🛡️ Security Research</h4>
    <p>Exploring vulnerabilities and defenses in AI systems through hands-on research and experimentation.</p>
  </div>
  
  <div class="card" style="text-align: center;">
    <h4 style="color: #ffff00;">🎓 Education</h4>
    <p>Teaching the security community about AI risks and the AI community about security practices.</p>
  </div>
  
  <div class="card" style="text-align: center;">
    <h4 style="color: #ffff00;">🤝 Community</h4>
    <p>Building bridges between hackers, data scientists, researchers, and policy makers.</p>
  </div>

</div>

---

## 🎯 Sponsors

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  {% for sponsor in site.sponsors %}
  <div class="card" style="align-items: center;">
      <div style="width: 240px; height: 240px; border-radius: 10%; background: #fff; display: flex; align-items: center; justify-content:   center; border: 2px solid #00ff00; padding: 20px;">
        <img 
            src="{{ '/assets/images/logos/' | append: sponsor.logo | relative_url }}" 
            alt="{{ sponsor.name }} logo">
      </div>
  </div>
  {% endfor %}

</div>

{% endif %}

---

## 🚀 Get Involved

<div style="background: #1a1a1a; padding: 1.5rem; border-radius: 5px; border-left: 4px solid #00ff00;">
  <p><strong>Want to join our community?</strong></p>
  <ul>
    <li>💬 <a href="https://discord.com/invite/GX5fhfT">Join our Discord</a> - Chat with fellow researchers and stay updated</li>
    <li>🎪 <a href="{{ '/events/' | relative_url }}">Attend our events</a> - DEF CON, workshops, and more</li>
    <li>✍️ <a href="https://github.com/aivillage/aiv_website">Contribute</a> - Share your research and insights</li>
    <li>🙋 <a href="https://forms.gle/vCrz3zpR8xHCsTtJ8">Volunteer</a> - Help organize events and activities</li>
  </ul>
</div>
