---
layout: post
title: DEFCON 30 Saturday Schedule
author: AI Village
date: 2022-06-20 09:00:00 +0900
category: "defcon 30"
toc: true
---

## A few useful things to know about AI Red Teams

**Time**: 10:00-11:00 \
**Speaker**: Sudipto Rakshit 

AI Red Teams are sprouting across organizations: Microsoft, Facebook, Google, DeepMind, OpenAI, NVIDIA all have dedicated teams to secure and red team their AI systems. Even the US Government is jumping on this bandwagon. But surprisingly, unlike traditional red teams, which have an agreed upon form, function and definition, there is little agreement on AI Red Teaming. This talk synthesizes Microsoft's perspective of AI Red Team and interleaves formal and informal conversations with more than 15 different AI Red Teams across the industry and governments, as well analyzing their job postings, publications and blog posts. We ground each of the lessons in our experience of red teaming production systems.

After this talk, you will get a taste of how AI Red Teams approach the problem, grasp what AI Red Teams do, how they interact with existing security paradigms like traditional red teaming as well as emerging areas like adversarial machine learning. You will be able to assess what it takes to be successful in this field, and how your can make an impact without a PhD in Adversarial Machine learning.

## Hands-on Hacking of Reinforcement Learning Systems

**Time**: 11:00-12:00 \
**Speaker**: Dr. Amanda Minnich 

Reinforcement learning (RL) is a class of machine learning where an agent learns the optimal actions to take to achieve short- and long-term objectives in the context of its environment. RL models are everywhere, from enabling autonomous vehicles to drive to assisting in diagnostic decision making in healthcare. They are used to make critical decisions with life-or-death implications, meaning the security and robustness of these models and the machine learning systems they comprise is extremely important.

However, the threat model of these RL systems is not well understood. Traditional network and system security measures are expected to provide some level of protection from threat actors, but if an attacker can get past these, many post-exploitation threat vectors exist in the reinforcement learning model itself, which can be weaponized and lead to disastrous outcomes.

In this talk, I will provide a high-level overview of reinforcement learning and the classes of attacks used to compromise RL systems. I will also present and demo two RL attacks we developed that do not require in-depth machine learning expertise to implement: the initial perturbation attack and the Corrupted Replay Attack (CRA), an attack we created while doing this research. Both of these attacks will be available as part of our open-source toolkit, Counterfit, so attendees can use these attacks against a reinforcement learning model of their choice. Finally, I will speak about my practical experiences in this space, describing the repercussions of an adversary successfully executing these attacks in the wild.

Attendees will walk away from this talk with the knowledge and tools to attack RL models, as well as an appreciation for the importance of properly securing machine learning systems.

## A System for Alert Prioritization

**Time**: 12:00-13:00 \
**Speaker**: Salma Taoufiq and Ben Gelman

At any moment, tens of thousands of analysts within security operations centers (SOCs) inspect security alerts to detect evidence of compromise, but the knowledge they gain in the process is often lost, siloed, or inefficiently preserved. In our talk, we'll present a machine learning prototype that leverages this forgotten knowledge, helping analysts triage malicious alerts in a feedback loop. The system learns to predict which alerts analysts will escalate, presents these alerts to analysts, and improves as analysts make decisions about these alerts. Our system is trained on real activity from hundreds of SOC analysts analyzing threats over thousands of customer environments, and it demonstrates a dramatic reduction in alert volume with minimal loss in detection rate, freeing up analysts to dive into alerts that truly matter.

In our presentation, we describe this system in transparent detail, discussing the complexity of raw data, the limitations of current approaches, and how our system can integrate into existing infrastructure, even in the presence of unstructured data and a shifting landscape of security sensors. We’ll also show our system's performance in the practical defense of a diverse population of organizations and go over in-the-trenches case studies illustrating our system's strengths and weaknesses.

## CatPhish Automation - The Emerging Use of Artificial Intelligence in Social Engineering

**Time**: 13:00-14:00 \
**Speaker**: Justin Hutchens

Infestations of bots on social network platforms is nothing new, but the sophistication of these bots have transformed dramatically in the past few years. In the recent past, it was fairly easy for any sensible person to recognize if they were talking to a bot. But that is rapidly changing as Artificial Intelligence (AI) solutions become more advanced and more accessible. During this presentation, the speaker will explore the increasing use of AI for automated social engineering within the context of social networks, and will show how AI chat bots can be leveraged to conduct phishing attacks, compromise credentials, or distribute malware. By using emerging technologies (to include Generative Adversarial Networks for generating non-searchable profile images, and deep-learning natural language processing models for simulating human intelligence), these bots can be used to consistently fool even the most vigilant of users.

## The Use of AI/ML in Offensive Security Operations

**Time**: 14:00-15:00 \
**Moderator**: Omar Santos

The [Red Team Village](https://redteamvillage.io/) and the AI Village will host a panel from different industry experts to discuss the use of artificial intelligence and machine learning in offensive security operations. More details coming soon!

Panelists:
- Will Schroeder: @HarmJ0y
- Will Pearce: @moo_hax
- TBA
- TBA

## Generative Art Tutorial

**Time**: 15:00-16:00 \
**Speaker**: TBD

TBA

## AI Death Metal : Eliminating Humans from Music

**Time**: 16:00-17:00 \
**Speaker**: dadabots

This is the soundtrack to skynet eliminating all humans," joke YouTubers tuning into a livestream of their raw audio neural network trained on technical death metal which has been running 24/7 for 3 years. Join us as Dadabots unleashes machine learning onto the production of extreme music. Dadabots takes us on a journey from procedural mathcore, battling human beatbox champions, inventing new subgenres (florpstep, no soul), ssh'ing into giant gpu clusters, python dependency hell, kurt cobain screaming jesus, nuns singing hail satan & more. Dadabots also shows us how to fight takedowns on music deep fakes, and how to sell arms to both sides of the copyright war. As these tools become accessible to people, we imminently approach a major creative renaissance. To quote Mike Patton, "the more fucked up and further away music is from music, the healthier it is for music