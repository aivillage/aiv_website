---
title: Prompt Injection Basics
slug: prompt-injection-basics
summary: Introduces prompt injection as a lab-bounded concept for understanding instruction conflicts and defensive review.
tracks:
  - offensive-ai-security-red-teaming
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
difficulty: intermediate
moduleType: practice
learningObjectives:
  - Explain prompt injection as an instruction-boundary problem inside authorized toy labs.
  - Write a lab-boundary note naming allowed targets, scoped inputs, and defensive review needs.
prerequisites:
  - rules-of-engagement-lab-safety
resources:
  - resource: lakera-gandalf
    role: required
  - resource: portswigger-web-llm-attacks
    role: optional
labs:
  - prompt-extraction
  - email-indirect
requiredArtifact: Lab-boundary note
securityLens: primary
securityLensText: "Prompt injection basics should stay inside authorized toy labs and defensive review. Focus on instruction boundaries, source trust, and how applications decide which input can influence model behavior."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module gives the Offensive AI Security track a safe conceptual on-ramp after rules of engagement. It frames prompt injection as an instruction-boundary problem: a model may receive system instructions, user requests, retrieved text, tool output, and lab content that compete for influence. The curated resources are for authorized training environments and orientation, not for testing real systems.

Your checkpoint is a short lab-boundary note that explains the allowed toy target, what input sources are in scope, what behavior would need defensive review, and what should not be attempted. Use the module responsibly by staying inside approved exercises, avoiding real third-party systems, and focusing on how defenders can identify, document, and reduce instruction-conflict risk. This is not an exploit walkthrough; it is a safety-bounded orientation before later lab material receives full debrief review.
