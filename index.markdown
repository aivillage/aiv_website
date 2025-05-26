---
layout: splash
title: About
---
<br>

# About Us

<div style="margin: 0.25rem 0; font-size: 0.85rem;">
  The <strong>AI Village</strong> is a community of hackers and data scientists working to educate the world on the use and abuse of artificial intelligence in security and privacy. We aim to bring more diverse viewpoints to AI security, grow a community of hackers, engineers, researchers, and policy makers, and encourage more people with a hacker mindset to assess machine learning systems. We have a strong presence at DEF CON, the world’s longest-running and largest hacking conference. If you're interested in volunteering, <a href="https://forms.gle/vCrz3zpR8xHCsTtJ8" target="_blank" rel="noopener noreferrer">submit an application here</a>.
</div>

---


<div class="events-and-blog">
  <!-- Upcoming Events -->
<div class="upcoming-events-wrapper">
  <h3>Upcoming Events</h3>
  {% assign now = 'now' | date: "%s" %}
  {% assign found = false %}
  {% for event in site.events %}
    {% assign event_time = event.date | date: "%s" %}
    {% if event_time >= now and found == false %}
      {% assign found = true %}
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
  {% if found == false %}
    <p>No upcoming events.</p>
  {% endif %}
</div>


  <!-- Latest Blogpost -->
  <div class="latest-blogpost-wrapper">
    <h3>Latest Blogpost</h3>
    {% assign latest_post = site.posts.first %}
    <article class="event-item">
      <div class="event-content">
        <h4 class="event__item">
          <a href="{{ latest_post.url }}">{{ latest_post.title }}</a>
        </h4>
        <div class="event-location">Posted by {{ latest_post.author }} on {{ latest_post.date | date: "%b %-d, %Y" }}</div>
        <div class="event-description">{{ latest_post.description | strip_html }}</div>
      </div>
    </article>
  </div>
</div>