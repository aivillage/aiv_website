---
title: Leadership Team
layout: single
permalink: /leadership_team/
---
<br>
<div class="volunteer-list">
  {% for volunteer in site.volunteers %}
    <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 1rem; margin-bottom: 0.7rem;">
      <div style="flex-shrink: 0; width: 25vw; max-width: 120px;">
        <img 
          src="{{ site.url }}{{ site.baseurl }}/volunteers/profiles/{{ volunteer.profile }}" 
          alt="{{ volunteer.first_name }} {{ volunteer.last_name }}" 
          style="border-radius: 50%; width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block;">
      </div>
      <div style="flex: 1; min-width: 200px;">
        <h3 style="margin: 0;">{{ volunteer.first_name }} {{ volunteer.last_name }}</h3>
        <p style="margin: 0.25rem 0; font-size: 0.7rem; color: #6F777D;"><strong>Position:</strong> {{ volunteer.position }}</p>
        {% if volunteer.affiliation %}
          <p style="margin: 0.25rem 0; font-size: 0.7rem; color: #6F777D;"><strong>Affiliation:</strong> {{ volunteer.affiliation }}</p>
        {% endif %}
        {% if volunteer.expertise %}
          <p style="margin: 0.25rem 0; font-size: 0.7rem; color: #6F777D;"><strong>Expertise:</strong> {{ volunteer.expertise }}</p>
        {% endif %}
      </div>
    </div>
    {% if volunteer.bio %}
      <div style="margin-bottom: 2rem; font-size: 0.7rem; color: #3D4144;">
        {{ volunteer.content | markdownify }}
      </div>
    {% endif %}
    <div style="border-top: 1px solid #ccc; margin-bottom: 2rem;"></div>
  {% endfor %}
</div>
