---
layout: default
title: Leadership Team
permalink: /leadership/
---

# Leadership Team

<div style="text-align: center; margin: 2rem 0;">
  <p style="color: #888; font-size: 1.1rem;">
    Meet the team behind AI Village - researchers, engineers, and security professionals dedicated to advancing AI security.
  </p>
</div>

---

<div class="team-grid" style="display: grid; gap: 2rem;">
  {% for volunteer in site.volunteers %}
    <div class="team-member" style="display: flex; gap: 1.5rem; background: #1a1a1a; padding: 1.5rem; border-radius: 5px; border-left: 4px solid #00ff00;">
      
      <div class="member-photo" style="flex-shrink: 0;">
        {% if volunteer.profile %}
          <img 
            src="{{ '/assets/images/profiles/' | append: volunteer.profile | relative_url }}" 
            alt="{{ volunteer.first_name }} {{ volunteer.last_name }}" 
            style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 2px solid #00ff00;">
        {% else %}
          <div style="width: 120px; height: 120px; border-radius: 50%; background: #333; display: flex; align-items: center; justify-content: center; border: 2px solid #00ff00;">
            <span style="color: #00ff00; font-size: 2rem; font-family: 'JetBrains Mono', monospace;">{{ volunteer.first_name | slice: 0 }}{{ volunteer.last_name | slice: 0 }}</span>
          </div>
        {% endif %}
      </div>
      
      <div class="member-info" style="flex: 1;">
        <h3 style="margin: 0 0 0.5rem 0; color: #00ff00;">
          {{ volunteer.first_name }} {{ volunteer.last_name }}
        </h3>
        
        {% if volunteer.position %}
          <div style="color: #ffff00; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; margin: 0.25rem 0;">
            <strong>{{ volunteer.position }}</strong>
          </div>
        {% endif %}
        
        {% if volunteer.affiliation %}
          <div style="color: #888; font-size: 0.9rem; margin: 0.25rem 0;">
            <strong>Affiliation:</strong> {{ volunteer.affiliation }}
          </div>
        {% endif %}
        
        {% if volunteer.expertise %}
          <div style="color: #888; font-size: 0.9rem; margin: 0.25rem 0;">
            <strong>Expertise:</strong> {{ volunteer.expertise }}
          </div>
        {% endif %}
        
        {% if volunteer.bio and volunteer.content %}
          <div style="margin-top: 1rem; color: #ccc; line-height: 1.6;">
            {{ volunteer.content | markdownify }}
          </div>
        {% endif %}
      </div>
    </div>
    
    {% unless forloop.last %}
      <hr style="border: none; border-top: 1px solid #333; margin: 1rem 0;">
    {% endunless %}
  {% endfor %}
</div>

{% if site.volunteers.size == 0 %}
<div class="card" style="text-align: center;">
  <h3 style="color: #888;">Team information coming soon</h3>
  <p style="color: #666;">We're updating our team profiles. Check back soon!</p>
</div>
{% endif %}

---

## 🤝 Join Our Team

<div style="background: #1a1a1a; padding: 1.5rem; border-radius: 5px; border-left: 4px solid #ff0000; margin: 2rem 0;">
  <h4 style="color: #ff0000; margin-top: 0;">🚀 Get Involved</h4>
  <p>AI Village is always looking for passionate individuals to join our mission. We welcome contributions from:</p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1rem 0;">
    <div>
      <h5 style="color: #00ff00;">🔬 Researchers</h5>
      <ul style="margin: 0.5rem 0;">
        <li>AI/ML security specialists</li>
        <li>Academic researchers</li>
        <li>Industry practitioners</li>
      </ul>
    </div>
    
    <div>
      <h5 style="color: #00ff00;">🛠️ Engineers</h5>
      <ul style="margin: 0.5rem 0;">
        <li>Software developers</li>
        <li>Security engineers</li>
        <li>DevOps specialists</li>
      </ul>
    </div>
    
    <div>
      <h5 style="color: #00ff00;">🎓 Educators</h5>
      <ul style="margin: 0.5rem 0;">
        <li>Workshop leaders</li>
        <li>Content creators</li>
        <li>Community managers</li>
      </ul>
    </div>
    
    <div>
      <h5 style="color: #00ff00;">📋 Organizers</h5>
      <ul style="margin: 0.5rem 0;">
        <li>Event coordinators</li>
        <li>Logistics support</li>
        <li>Marketing/outreach</li>
      </ul>
    </div>
  </div>
  
  <div style="margin-top: 1.5rem;">
    <a href="https://forms.gle/vCrz3zpR8xHCsTtJ8" target="_blank" style="color: #00ffff; font-weight: bold;">
      → Submit a volunteer application
    </a>
  </div>
</div>

## 🌟 Community Recognition

AI Village believes in recognizing the contributions of our community members. Our recognition programs include:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  
  <div class="card" style="text-align: center; background: #222;">
    <h5 style="color: #ffff00; margin-top: 0;">🏆 Research Awards</h5>
    <p style="font-size: 0.9rem;">Outstanding AI security research contributions</p>
  </div>
  
  <div class="card" style="text-align: center; background: #222;">
    <h5 style="color: #ffff00; margin-top: 0;">🎯 CTF Champions</h5>
    <p style="font-size: 0.9rem;">Top performers in our competitions and challenges</p>
  </div>
  
  <div class="card" style="text-align: center; background: #222;">
    <h5 style="color: #ffff00; margin-top: 0;">🤝 Community Builder</h5>
    <p style="font-size: 0.9rem;">Exceptional contribution to community growth</p>
  </div>
  
  <div class="card" style="text-align: center; background: #222;">
    <h5 style="color: #ffff00; margin-top: 0;">🎓 Educator Excellence</h5>
    <p style="font-size: 0.9rem;">Outstanding teaching and knowledge sharing</p>
  </div>

</div>