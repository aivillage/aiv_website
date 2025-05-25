---
layout: splash
title: About
---
<br>

# About Us

<div style="margin: 0.25rem 0; font-size: 0.85rem;">
  The <strong>AI Village</strong> is a community of hackers and data scientists working to educate the world on the use and abuse of artificial intelligence in security and privacy. We aim to bring more diverse viewpoints to AI security, grow a community of hackers, engineers, researchers, and policy makers, and encourage more people with a hacker mindset to assess machine learning systems. We have a strong presence at DEF CON, the world’s longest-running and largest hacking conference.
</div>

---


## Upcoming Events

<div class="upcoming-events">
  {% assign now = 'now' | date: "%s" %}
  {% for event in site.events %}
    {% assign event_time = event.date | date: "%s" %}
    {% if event_time >= now %}
      <article class="event-item">
        <div class="event-date">
          <div class="event-month">{{ event.date | date: "%b" }}</div>
          <div class="event-day">{{ event.date | date: "%d" }}</div>
        </div>
        <div class="event-content">
          <h4 class="event__item">
            <a href="{{ event.url | relative_url }}">{{ event.title }}</a>
          </h4>
          {% if event.location %}
            <div class="event-location">{{ event.location }}</div>
          {% endif %}
          {% if event.description %}
            <div class="event-description">{{ event.description }}</div>
          {% endif %}
        </div>
      </article>
    {% endif %}
  {% endfor %}
</div>


---


## Latest Blogpost

{% assign latest_post = site.posts.first %}
<article class="event-item" style="align-items: stretch;">
  <div class="event-content" style="flex: 1;">
    <h4 class="event__item">
      <a href="{{ latest_post.url }}">{{ latest_post.title }}</a>
    </h4>
    <div class="event-location">Posted by {{ latest_post.author }} on {{ latest_post.date | date: "%b %-d, %Y" }}</div>
    <div class="event-description">{{ latest_post.description | strip_html }}</div>
  </div>
</article>
---

## Get Involved

We're always looking for volunteers!
[Submit a volunteer application here »](https://forms.gle/vCrz3zpR8xHCsTtJ8)

---

