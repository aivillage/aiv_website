---
toc: true
toc_sticky: true
layout: post
title: Max evil MLsec, why should you care?
author: Sara-Jayne Terp
authorUrl: https://twitter.com/bodaceacat
date: 2018-06-11
category: ethics
canonicalSlug: max-evil-sjterp
legacyUrls:
  - /ethics/2018/06/11/max-evil-sjterp.html

---

[Originally posted on Medium](https://medium.com/@sarajayneterp/max-evil-mlsec-why-should-you-care-ae3a42bfea52) - follow [@sarajayneterp](https://medium.com/@sarajayneterp) and like her article there

MLsec is the intersection of machine learning, artificial intelligence, deep learning and information security. It has an active community (see the MLsec project, Defcon’s AI Village and the CAMLIS conference) and a host of applications including the offensive ones outlined in “The Malicious Use of AI”.

One of the things we’ve been talking about is what it means to be ethical in this space. MLsec work divides into using AI to attack systems and ecosystems, using AI to defend them, and attacking the AI itself, to change its models or behavior in some way (e.g. the groups that poisoned the Tay chatbot’s inputs were directly attacking its models to make it racist). Ethics applies to each of these.

### Talking about Ethics

Talking about algorithm ethics is trendy, and outside MLsec, there’s been a lot of recent discussion of ethics and AI. But many of the people talking aren’t practitioners: they don’t build AI systems, or train models or make design decisions on their algorithms. There’s also talk about ethics in infosec because it’s a powerful field that affects many people- and when we twin it with another powerful field (AI), and know how much chaos we could unleash with MLsec, we really need to get its ethics right.

This discussion needs to come from practitioners: the MLsec equivalents of Cathy O’Neill (who I will love forever for seamlessly weaving analysis of penis sizes with flawed recidivism algorithms and other abuses of people). It still needs to be part of the wider conversations about hype cycles (people not trusting bots, then overtrusting them, then reaching a social compromise with them), data risk, and what happens to people and their societies when they start sharing jobs, space, homes, societal decisions and online society with algorithms and bots (sexbots, slackbots, AI-backed bots etc), but we also need to think about the risks that are unique to our domain.

### A simple definition

There are many philosophy courses on ethics. In my data work, I’ve used a simple definition: ethics is about risk, which has 3 main parts:

* how bad the consequences of something are (e.g. death is a risk, but so is having your flight delayed),
* how likely that thing is to happen (e.g. death in a driverless train is relatively rare) and
* who it affects (in this case, the system designer, owner, user and other stakeholders, bystanders etc).

Risk also has perceptions: for example, people believe that risks from terrorism are greater than those from train travel, and people’s attitudes to different risks can vary from risk-seeking through risk-neutral to risk-averse.
Ethics is about reducing risk in the sense of reducing the combination of the severity of adverse effects, the likelihood of them happening and the number of people or entities it affects. It’s about not being “that guy” with the technology, and being aware of the potential effects and sideeffects of what we do.

### Ethics in MLsec

One of my hacker heroes is @straithe. Her work on how to hack human behaviors with robots is creative, incredible, and opening up a whole new area of incursion, information exfiltration and potential destruction. She thinks the hard thoughts about mlsec risks, and some of the things she’s talked about recently include:

* Using a kid or dead relative’s voice in phishing phonecalls. Yes, we can do that: anyone who podcasts or posts videos of themselves online is leaving data about their voice, it’s relatively easy to record people talking, and Baidu’s voice-mimicking programs are already good enough to fool someone.
* Using bots (both online and offline) to build emotional bonds with kids, then ‘killing’ or threatening to ‘kill’ those bots.
* Using passive-aggressive bots to make people do things against their own self-interests.
* The bad things here are generally personal (distress etc), but that’s not “max evil” yet. What about these?

Changing people’s access to resources by triggering a series of actions that reduce their social credit scores and adversely change their life (this is possible using small actions and a model of their human network).
Microtargetting groups of people with emotive content, to force or change their behavior (e.g. start riots and larger conflicts: when does political advertising stop and warfare start?).
Taking control of a set of autonomous vehicles (what responsibility do you have if one crashes and kills people?)
Mass unintended consequences from your machine learning system (e.g. unintentional racism in its actions).
Now we’re on a bigger scale, both in numbers and effect. When we talk about chaos, we’re talking about letting loose adaptive algorithms and mobile entities that could potentially do anything from making people cry through to destroying their lives and death. Welcome to my life, where we talk about just how far we could go with a technology on both attack and defense, because often we’re up against adversaries who won’t hesitate to have the evil thoughts and act on them, and someone has to think them in order to counter them. This is normal in infosec, and we need to have the same discussions about things like the limits of red team testing, blue team actions, deception and responsible disclosure.

### Why we should care

People can get hurt in infosec operations. Some of those hurts are small (e.g. the loss of face from being successfully phished); some of them are larger. Some of the damage is to targets, sometimes it’s to your own team, sometimes it’s to people you don’t even know (like the non-trolls who found themselves on the big list of Russian trolls).

MLsec is infosec on steroids: we have this incredibly powerful, exciting research area. I’ve giggled too at the thought of cute robots getting people to open secure doors for them, and it’s fun to think the evil thoughts, to go to places where most people (or at least people who like to sleep at night) shouldn’t go. But with that power comes responsibility, and our responsibility here is to think about ethics, about societal and moral lines before we unknowingly cross them.

### Some basic actions for us:

When we build or use models, think about whether they’re “fair” to different demographics. Human-created data is often biased against different groups — we shouldn’t just blindly replicate that.
If our models, bots, robots etc can affect humans, think about what the worst effects could be on them, and whether we’re prepared to accept that risk for them.

Make our design choices wisely.

### Further reading:

* Cathy O’Neill — her book “Weapons of Math Destruction” and her mathbabe blog
* Google’s AI ethics memo
* Risks and mitigations of releasing data (older work with the Responsible Data Forum)

