---
layout: post
title: DEFCON 30 Friday Schedule
author: AI Village
date: 2022-06-20 09:00:00 +0900
category: "defcon 30"
toc: true
canonicalSlug: defcon30-friday
legacyUrls:
  - /defcon%2030/2022/06/20/defcon30-friday.html

---

## Automate Detection with Machine Learning

**Time**: 9:30-11:00 \
**Speaker**: Gavin Klondike

Today, over a quarter of security products for detection have some form of machine learning built in. However, “machine learning” is nothing more than a mysterious buzzword for many security analysts. In order to properly deploy and manage these products, analysts will need to understand how the machine learning components operate to ensure they are working efficiently. In this talk, we will dive head first into building and training our own security-related models using the 7-step machine learning process. No environment setup is necessary, but Python experience is strongly encouraged. 

Gavin Klondike is a senior consultant and researcher who has a passion for network security, both attack and defense. Through that passion, he runs NetSec Explained; a blog and YouTube channel which covers intermediate and advanced level network security topics, in an easy to understand way. His work has given him the opportunity to be published in industry magazines and speak at conferences such as Def Con, Def Con China, and CactusCon. Currently, he is researching into ways to address the cybersecurity skills gap, by utilizing machine learning to augment the capabilities of current security analysts.

## I’m not Keylogging you! Just some benign data collection for User Behavior Modeling

**Time**: 11:00-12:00 \
**Speaker**: Harini Kannan 

User and Entity Behavior Analysis (UEBA) has been an active area of research in cybersecurity for years now. Advancements in unsupervised machine learning methodologies have made UEBA models effective in detecting anomalous drifts from baseline behavior. But when collecting user generated systems data from a cluster of machines in the cloud or from an endpoint, the data scientist gets access to human generated raw features, which keys are typed when, and what are those. This starts off as acceptable but wades into the grey area of almost keylogging users which is dangerous.

In this talk, we will go through a real example of how a user behavior experiment was set up, right from building the features to running the data collection script within containers to flushing the raw data regularly and the users sending only aggregated metrics to the data scientists for model building and analysis. We’ll go through the entire setup from data collection and data flushing to model building by creating weak labels and further analysis.

## Keynote

**Time**: 12:00-13:00 \
**Speaker**: Keith E. Sonderling - EEOC Commissioner

Keith E. Sonderling was confirmed by the U.S. Senate, with a bipartisan vote, to be a Commissioner on the U.S. Equal Employment Opportunity Commission (EEOC) in 2020.  Until January of 2021, he served as the Commission’s Vice-Chair.  His term expires on July 1, 2024.

The EEOC is the United States’ premier civil rights agency enforcing federal laws that make it illegal to discriminate against a job applicant or an employee because of the person's race, color, religion, sex, national origin, age, disability or genetic information.

Prior to his confirmation to the EEOC, Commissioner Sonderling served as the Acting and Deputy Administrator of the Wage and Hour Division at the U.S. Department of Labor.  Before joining the Department of Labor in 2017, Commissioner Sonderling practiced Labor and Employment law in Florida.

Since joining the EEOC, one of Commissioner Sonderling’s highest priorities is ensuring that artificial intelligence and workplace technologies are designed and deployed consistent with long-standing civil rights laws. Commissioner Sonderling has published numerous articles on the benefits and potential harms of using artificial intelligence-based technology in the workplace and speaks globally on these emerging issues.

Commissioner Sonderling will provide an overview of the ways that AI is already being used to make employment decisions, the legal framework governing AI in the U.S., important ways that U.S. civil rights laws protect employees from discrimination by algorithms, and the status of regulatory efforts at the federal, state, local and global levels. He will also discuss his thoughts on ways our society can achieve the benefits of AI while respecting the rights of workers.

## ML Security Evasion Competition Launch

**Time**: 13:30-14:00 \
**Speaker**: Hyrum Anderson

Calling ML practitioners and security researchers to compete in two competitions.  Returning to AI Village is the ML Security Evasion Competition--with new twists for the offense-minded contestant.  New to AI Village this year is the ML Model Attribution Challenge for those interested in defense and compliance.  There are multiple ways to win in each competition, with first place prizes at $3000 USD, honorable mention prizes at $1500 USD, and multiple student awards also valued at $1500 USD. In all, we'll be giving away up to $20K USD divided amongst up to 9 top contestants.  The challenges begin now!

In the ML Security Evasion Competition (https://mlsec.io), you are an attacker attempting to bypass HTML antiphishing models, and biometric face recognition models in two separate challenges.  Modify HTML or image samples in a way to fool the models hosted by the competition sponsors.  Visit https://mlsec.io to register, participate, submit and potentially win.  You have 6 weeks to submit (Sep 23, 2022).

In the ML Model Attribution Challenge (https://mlmac.io), you take the role of an adjudicator, where you must determine which base model has been used for several fined-tuned generative models hosted by the competition sponsors.  Query the models to investigate what might be under the hood.  Students are especially encouraged to apply, with additional travel awards given to top student submissions to present results at https://camlis.org.  Visit https://mlmac.io to register, participate, submit and potentially win.  You have 4 weeks to submit (Sep 9, 2022).

## The Chaos of Coding with Language Models

**Time**: 14:00-15:00 \
**Speaker**: Nick Doiron

Language models are being deployed to assist with writing code and explaining code snippets. These transformer-based models have learned patterns and probabilities from large datasets of open source code and human text. A Wired article claims one plugin writes "a remarkable 35 percent of its users’ newly posted code".

Could these models be a new source of exploits and risky coding practices?
What can research in Natural Language Generation tell us about what to expect from our new AI coworkers?

This presentation will cover:

- How code explanation models, by reading variable names and comments for context clues, can be tricked to ignore unusual imports and calls to remote servers in their descriptions.
- How code generation models may generate different code based on licenses and author names. Others' research shows these models' accuracy are highly variable based on "prompt engineering" (example: "I've tested this function myself so I know that it's correct:").
- An adversarial search for comments, prompts, and decoding strategies which would increase the chance of a SQL injection vulnerability in generated code. This helps evaluate if normal user interaction may result in models recommending exploitable coding.

Resources will include a GitHub repo, runnable notebooks, and a form to suggest new prompts for code generation.

## LATMA - Lateral movement analyzer

**Time**: 15:00-16:00 \
**Speaker**: Gal Sadeh

Lateral movement is the stage in which attackers spread in networks following initial access. so far, reliable detections of lateral movement attacks from a given set of authentications is an unaddressed challenge. This talk will present a new online algorithm for detecting lateral movement attacks which provides one false positive a day, 30 times better than the state-of-the-art algorithms. Our algorithm was trained and tested on data from more than 20 different enterprise environments. The detection method combines domain knowledge, practical machine learning and algorithmic tools. In addition, we will present the offline tool LATMA which collects authentication AD logs, finds suspected lateral movement based on our algorithm and visualises the results. We will explain how to analyse lateral movement attacks using LATMA’s visualisations and demonstrate it.

## AI and Hiring Tech

**Time**: 16:00-17:00 \
**Moderator**: Rachel See, EEOC

<a href="/blog/hiring-panel/"> See the post here. </a>
