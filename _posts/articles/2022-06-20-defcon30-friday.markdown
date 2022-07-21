---
layout: post
title: DEFCON 30 Friday Schedule
author: AI Village
date: 2022-06-20 09:00:00 +0900
category: "defcon 30"
toc: true
---

## ML Workshop

**Time**: 9:30-11:00 \
**Speaker**: Gavin Klondike

Come build a spam detection model from scratch in this hands on workshop.

## I’m not Keylogging you! Just some benign data collection for User Behavior Modeling

**Time**: 11:00-12:00 \
**Speaker**: Harini Kannan 

User and Entity Behavior Analysis (UEBA) has been an active area of research in cybersecurity for years now. Advancements in unsupervised machine learning methodologies have made UEBA models effective in detecting anomalous drifts from baseline behavior. But when collecting user generated systems data from a cluster of machines in the cloud or from an endpoint, the data scientist gets access to human generated raw features, which keys are typed when, and what are those. This starts off as acceptable but wades into the grey area of almost keylogging users which is dangerous.

In this talk, we will go through a real example of how a user behavior experiment was set up, right from building the features to running the data collection script within containers to flushing the raw data regularly and the users sending only aggregated metrics to the data scientists for model building and analysis. We’ll go through the entire setup from data collection and data flushing to model building by creating weak labels and further analysis.

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
