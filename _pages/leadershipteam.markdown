---
title: Leadership Team
layout: single
permalink: /leadership_team/
---
<table class="table">
{% for volunteer in site.volunteers %}
    <tr>
        <td class="text-center">
            <img src="{{ site.url }}{{ site.baseurl }}/volunteers/profiles/{{volunteer.profile}}" style="border-radius:50%;">
        <br>
        <h3 style="margin:10px">{{ volunteer.first_name }} {{ volunteer.last_name }}</h3>
        </td>
        <td>
        <strong>Position:</strong> {{ volunteer.position }}
        <br>
        {% if volunteer.affiliation %}
            <strong>Affiliation:</strong> {{ volunteer.affiliation }}
            <br>
        {% endif %}
        {% if volunteer.expertise %}
            <strong>Expertise:</strong> {{ volunteer.expertise }}
            <br>
        {% endif %}
        {% if volunteer.bio %}
            <strong>Bio:</strong>{{ volunteer.content | markdownify }}
        {% endif %}
        </td>
    </tr>
{% endfor %}
</table>