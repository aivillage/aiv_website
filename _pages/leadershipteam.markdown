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
        <strong>Bio:</strong>{{ volunteer.content | markdownify }}
        </td>
    </tr>
{% endfor %}
</table>

<!-- 
## Officers
<table class="table">
    <tr>
        <td class="text-center"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/315bed8c-cbf3-11ec-8cd5-0242ac140002_0033.png" style="border-radius:50%;">
        <br>
        <h3 style="margin:10px">John Doe</h3>
        </td>
        <td>
        <strong>Affiliation:</strong>  X University
        <br>
        <strong>Expertise:</strong>  Programming
        <br>
        <strong>Education:</strong>  Computer Science
        <br>
        <strong>Contact:</strong>  j.doe@gmail.com
        <br>

        <strong>Bio:</strong> lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum et nunc quis finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla gravida ultrices justo nec hendrerit.
        
        </td>
    </tr>
    <tr>
        <td class="text-center"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/315bed8c-cbf3-11ec-8cd5-0242ac140002_0033.png" style="border-radius:50%;">
        <br>
        <h3 style="margin:10px">John Doe</h3>
        </td>
        <td>
        <strong>Affiliation:</strong>  X University
        <br>
        <strong>Expertise:</strong>  Programming
        <br>
        <strong>Education:</strong>  Computer Science
        <br>
        <strong>Contact:</strong>  j.doe@gmail.com
        <br>

        <strong>Bio:</strong> lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum et nunc quis finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla gravida ultrices justo nec hendrerit.
        
        </td>
    </tr>
    <tr>
        <td class="text-center"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/315bed8c-cbf3-11ec-8cd5-0242ac140002_0033.png" style="border-radius:50%;">
        <br>
        <h3 style="margin:10px">John Doe</h3>
        </td>
        <td>
        <strong>Affiliation:</strong>  X University
        <br>
        <strong>Expertise:</strong>  Programming
        <br>
        <strong>Education:</strong>  Computer Science
        <br>
        <strong>Contact:</strong>  j.doe@gmail.com
        <br>

        <strong>Bio:</strong> lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum et nunc quis finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla gravida ultrices justo nec hendrerit.
        
        </td>
    </tr>
  </table>
-->