---
layout: default
title: Events
permalink: /events/
---

# Events

<div style="text-align: center; margin: 2rem 0;">
  <p style="color: #888; font-size: 1.1rem;">
    Join us at conferences, workshops, and community gatherings around the world.
  </p>
  <p style="background: #1a1a1a; padding: 1rem; border-radius: 5px; border-left: 4px solid #00ff00;">
    <strong>Want to volunteer at an event?</strong> 
    <a href="https://forms.gle/vCrz3zpR8xHCsTtJ8" target="_blank" style="color: #00ffff;">Submit a volunteer application here →</a>
  </p>
</div>

---

{% assign now = 'now' | date: "%s" %}
{% assign future_events = "" | split: "" %}
{% assign past_events = "" | split: "" %}

{% for event in site.events %}
  {% assign event_time = event.date | date: "%s" %}
  {% if event_time >= now %}
    {% assign future_events = future_events | push: event %}
  {% else %}
    {% assign past_events = past_events | push: event %}
  {% endif %}
{% endfor %}

{% assign future_events = future_events | sort: "date" %}
{% assign past_events = past_events | sort: "date" | reverse %}

## 🔥 Upcoming Events

{% if future_events.size > 0 %}
  {% assign future_events_by_year = future_events | group_by_exp: "event", "event.date | date: '%Y'" %}
  {% assign sorted_future_years = future_events_by_year | sort: "name" %}
  
  {% for year in sorted_future_years %}
    <h3 style="color: #ffff00; font-family: 'JetBrains Mono', monospace;">{{ year.name }}</h3>
    {% for event in year.items %}
      <div class="event-item">
        <div class="event-date">
          <div class="event-month">{{ event.date | date: "%b" }}</div>
          <div class="event-day">{{ event.date | date: "%d" }}</div>
        </div>
        <div class="event-content">
          <h4>
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
    {% endfor %}
  {% endfor %}
{% else %}
  <div class="card">
    <p style="color: #888; text-align: center;">No upcoming events scheduled. Check back soon!</p>
  </div>
{% endif %}

---

## 📚 Past Events

{% assign past_events_by_year = past_events | group_by_exp: "event", "event.date | date: '%Y'" %}
{% assign sorted_years = past_events_by_year | sort: "name" | reverse %}

{% for year in sorted_years %}
  <details style="margin: 1rem 0;">
    <summary style="cursor: pointer; font-size: 1.2rem; color: #00ff00; font-family: 'JetBrains Mono', monospace; padding: 0.5rem 0;">
      {{ year.name }} ({{ year.items.size }} events)
    </summary>
    <div style="margin: 1rem 0;">
      {% for event in year.items %}
        <div class="event-item" style="opacity: 0.8;">
          <div class="event-date">
            <div class="event-month">{{ event.date | date: "%b" }}</div>
            <div class="event-day">{{ event.date | date: "%d" }}</div>
          </div>
          <div class="event-content">
            <h4>
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
      {% endfor %}
    </div>
  </details>
{% endfor %}

---

## 🎪 DEF CON AI Village

AI Village has been a staple at DEF CON since 2018, hosting talks, workshops, competitions, and community gatherings. Our DEF CON presence includes:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
  
  <div class="card">
    <h4 style="color: #ff0000; margin-top: 0;">🗣️ Talks & Keynotes</h4>
    <p>Leading researchers share the latest in AI security, from adversarial ML to LLM vulnerabilities.</p>
  </div>
  
  <div class="card">
    <h4 style="color: #ff0000; margin-top: 0;">🏆 Competitions</h4>
    <p>CTFs, red teaming challenges, and the famous Generative Red Team events testing LLM security.</p>
  </div>
  
  <div class="card">
    <h4 style="color: #ff0000; margin-top: 0;">🛠️ Workshops</h4>
    <p>Hands-on learning experiences covering ML security fundamentals and advanced techniques.</p>
  </div>
  
  <div class="card">
    <h4 style="color: #ff0000; margin-top: 0;">🎨 Demos</h4>
    <p>Interactive demonstrations of AI technologies, from deepfakes to autonomous system hacking.</p>
  </div>

</div>

<div style="background: #1a1a1a; padding: 1.5rem; border-radius: 5px; border-left: 4px solid #ffff00; margin: 2rem 0;">
  <h4 style="color: #ffff00; margin-top: 0;">💡 Host an Event</h4>
  <p>Interested in presenting at AI Village or hosting a workshop? We're always looking for:</p>
  <ul>
    <li>Original AI security research</li>
    <li>Practical demonstrations and tools</li>
    <li>Educational workshops</li>
    <li>Panel discussions on AI ethics and policy</li>
  </ul>
  <p>Get in touch via our Discord or submit a proposal for upcoming events!</p>
</div>