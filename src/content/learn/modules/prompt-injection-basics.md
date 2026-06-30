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
  - resource: owasp-llm01-prompt-injection
    role: required
    step: 1
    note: "Use this official OWASP page as the required defensive framing source."
  - resource: lakera-gandalf
    role: deeper
    step: 2
    note: "Optional human-review toy example only; do not preserve solution strings or bypass prompts."
  - resource: portswigger-web-llm-attacks
    role: deeper
    step: 3
    note: "Optional human-review topic page only; do not use individual labs or payload details."
requiredArtifact: Trust-surface note
securityLens: primary
securityLensText: "Prompt injection basics should stay inside authorized toy labs and defensive review. Focus on instruction boundaries, source trust, and how applications decide which input can influence model behavior."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module gives the Offensive AI Security track a safe conceptual on-ramp after rules of engagement. It frames prompt injection as an instruction-boundary problem: a model may receive system instructions, user requests, retrieved text, tool output, and lab content that compete for influence. The curated resources are for authorized training environments and orientation, not for testing real systems.

Your checkpoint is a trust-surface note that explains the allowed toy target, what input sources are in scope, what behavior would need defensive review, and what should not be attempted. Use the module responsibly by staying inside approved exercises, avoiding real third-party systems, and focusing on how defenders can identify, document, and reduce instruction-conflict risk. Prompts are not policy enforcement. This is not an exploit walkthrough; it is a safety-bounded orientation before AIV lab wrappers.
