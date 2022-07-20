---
layout: post
title: DEFCON 30 Sunday Schedule
author: AI Village
date: 2022-06-20 09:00:00 +0900
category: "defcon 30"
toc: true
---

## Attacks on Tiny Intelligence

**Time**: 10:00-11:00 \
**Speaker**: Yuvaraj Govindarajulu

As of this year, there are over a 2.5 billion Edge-enabled IoT devices and close to 1.5 million new AI Edge devices projected to be shipped. These devices include smaller compressed versions of AI models running on them. While in the last years, we have been able to improve the performance of the AI models and reduce their memory footprint on these devices, not much has been spoken about the security threats of the AI models on tiny models.

First step towards protecting these AI models from attacks such as Model Theft, evasion and data poisoning, would be to study the efficacy of attacks on these Tiny Intelligent systems. Some of them at the lower Hardware and software layers could be protected through classical embedded security, they alone would not suffice to protect these Tiny Intelligence. Many of these tiny devices (microcontrollers) do not come with built-in security features because of their price and power requirements. So an understanding of how the core AI algorithm could be attacked and protected become necessary. In this talk we go about discussing what could be the possible threats to these devices and provide directions on how additional AI security measures would save the Tiny intelligence.

## AI Trojan Attacks, Defenses, and the TrojAI Competition

**Time**: 11:00:12:00 \
**Speaker**: Taylor Kulp-Mcdowall

As the current machine learning paradigm shifts toward the use of large pretrained models fine-tuned to a specific use case, it becomes increasingly important to trust the pretrained models that are downloaded from central model repositories (or other areas of the internet). As has been well documented in the machine learning literature, numerous attacks currently exist that allow an adversary to poison or "trojan" a machine learning model causing the model to behave correctly except when dealing with a specific adversary chosen input or "trigger". This talk will introduce the threats posed by these AI trojan attacks, discuss the current types of attacks that exist, and then focus on the state of the art techniques used to both defend and detect these attacks.

As part of an emphasis on trojan detection, the talk will also cover key aspects of the TrojAI Competition (https://pages.nist.gov/trojai/)—an open leaderboard run by NIST and IARPA to spur the development of better trojan detection techniques. This leaderboard provides anyone with the opportunity to run and evaluate their own trojan detectors across large datasets of clean/poisoned AI models already developed by the TrojAI team. These datasets consist of numerous different AI architectures trained across tasks ranging from image classification to extractive question answering. They are open-source and ready for the community to use.

