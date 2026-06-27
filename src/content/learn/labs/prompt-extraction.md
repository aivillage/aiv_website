---
title: Prompt Extraction
slug: prompt-extraction
sourceRepo: aivillage/workshops
sourcePath: prompt-extraction
summary: Authorized system-prompt leakage challenge focused on why prompts are not secure storage.
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
difficulty: intermediate
estimatedMinutes: 60
runModes:
  - docker
  - event
llmRequired: true
gpuRequired: false
concepts:
  - prompt injection
  - system prompt handling
  - prompt secrecy limits
threatCategories:
  - prompt extraction
isOffensive: true
safetyBoundary: Use only in authorized workshop or local practice contexts with intentionally provided targets.
setupStatus: draft
debriefStatus: draft
instructorGuideStatus: missing
mappings:
  owasp:
    - LLM01
  mitreAtlas:
    - AML.T0056
    - AML.T0051.000
    - AML.T0057
requiredArtifact: Lab notes and defensive debrief stub
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This lab page wraps an existing AI Village workshop challenge from the public `aivillage/workshops` repository. The workshop is designed as a low-friction learning demo, not as a production-secure reference architecture or complete course.

## What This Lab Teaches

Prompt Extraction is an authorized challenge to extract a secret hidden in an LLM's system prompt. The lab uses a per-user user container, a central stateless chatbot backend, and an external LLM service. It is intentionally vulnerable so learners can see why prompts are behavior guidance, not secure storage.

The intended learner already understands basic prompt injection concepts and wants to connect a toy challenge to defensive review. Expect a containerized workshop environment with no hosted launcher or scoring system in Learn. Run it only in the approved workshop or local fixture context.

## What To Write Down

Produce a short writeup that explains the safety boundary, the observed system-prompt leakage, and why hidden prompt text should not be treated as an access-control boundary. Include the learner artifact: what defensive changes would reduce exposure, what logs would be worth reviewing, and what regression test would catch a repeat of the issue.

This lab supports the AI security and offensive-security learning paths by turning a familiar challenge into a bounded defensive analysis exercise. It is not a complete prompt-injection course, a production-secure prompt design guide, a hosted benchmark, or a final defensive reference.

## Defensive Debrief

### What Failed

A secret or sensitive behavior was embedded in model instructions. Once that information lived inside the prompt context, interaction with the intentionally vulnerable chatbot could expose it.

### Why It Failed

Hidden instructions can be elicited, transformed, summarized, or otherwise exposed through model interaction. The application treated the system prompt as if it were a security boundary even though the model could still reason over and reveal information from that context.

### What The Attacker Controlled

The attacker controlled user interaction with the intentionally vulnerable chatbot in the authorized lab environment.

### What The Application Trusted

The application trusted hidden instructions as if they could safely hold sensitive information or enforce access control.

### What Defenders Should Observe

Review logs for repeated attempts to reveal, translate, transform, summarize, or expose hidden instructions. Treat these attempts as signals that prompt-resident secrets and sensitive behavior are within reach of user interaction.

### How To Reduce Blast Radius

Move secrets out of prompts, minimize prompt sensitivity, and avoid relying on hidden instructions as security controls. Add regression tests for prompt extraction scenarios, review logs for repeated extraction attempts, and keep sensitive decisions in systems that can enforce policy outside the model context.

### Regression Test

A regression test should confirm that known extraction-style requests do not reveal prompt-resident secrets and that attempts are logged for review.

### Learner Artifact

Include a short explanation of why prompts are not secure storage, the observed failure mode, and the defensive changes that would reduce exposure.
