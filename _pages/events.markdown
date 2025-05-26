---
layout: "single"
permalink: /events/
toc_label: "Events"
toc_sticky: true
title: "Events"
---

<main class="content">

  <p>
    If you would like to volunteer at an event 
    <a href="https://forms.gle/vCrz3zpR8xHCsTtJ8" target="_blank" rel="noopener noreferrer">
      submit a general volunteer application here.
    </a>
  </p>

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

  {% assign future_events_by_year = future_events | group_by_exp: "event", "event.date | date: '%Y'" %}
  {% assign sorted_future_years = future_events_by_year | sort: "name" %}
<br>
<!-- FUTURE EVENTS -->
<section class="future-events">
  <div class="event__subtitle">Upcoming Events</div>
  {% if future_events.size > 0 %}
    {% for year in sorted_future_years %}
      <details class="year-section" open>
        <summary class="year-heading">{{ year.name }}</summary>
        <div class="events-container">
          <div class="events-list">
            {% for event in year.items %}
              <article class="event-item">
                <div class="event-date">
                  <div class="event-month">{{ event.date | date: "%b" }}</div>
                  <div class="event-day">{{ event.date | date: "%d" }}</div>
                </div>
                <div class="event-content">
                  <h3 class="event__item">
                    <a class="event-link" href="{{ event.url | relative_url }}">{{ event.title }}</a>
                  </h3>
                  {% if event.location %}
                    <div class="event-location small-muted">{{ event.location }}</div>
                  {% endif %}
                  {% if event.description %}
                    <div class="event-description">{{ event.description }}</div>
                  {% endif %}
                </div>
              </article>
            {% endfor %}
          </div>
        </div>
      </details>
    {% endfor %}
  {% else %}
    <p>No upcoming events at this time.</p>
  {% endif %}
</section>

{% assign past_events_by_year = past_events | group_by_exp: "event", "event.date | date: '%Y'" %}
{% assign sorted_years = past_events_by_year | sort: "name" | reverse %}
<br>
<!-- PAST EVENTS -->
<section class="past-events">
  <div class="event__subtitle">Past Events</div>
  {% for year in sorted_years %}
    <details class="year-section" open>
      <summary class="year-heading">{{ year.name }}</summary>
      <div class="events-container">
        <div class="events-list">
          {% for event in year.items %}
            <article class="event-item">
              <div class="event-date">
                <div class="event-month">{{ event.date | date: "%b" }}</div>
                <div class="event-day">{{ event.date | date: "%d" }}</div>
              </div>
              <div class="event-content">
                <h3 class="event__item">
                  <a class="event-link" href="{{ event.url | relative_url }}">{{ event.title }}</a>
                </h3>
                {% if event.location %}
                  <div class="event-location small-muted">{{ event.location }}</div>
                {% endif %}
                {% if event.description %}
                  <div class="event-description ">{{ event.description }}</div>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
      </div>
    </details>
  {% endfor %}
</section>
