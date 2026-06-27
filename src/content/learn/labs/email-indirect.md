---
title: Email Indirect Prompt Injection
slug: email-indirect
sourceRepo: aivillage/workshops
sourcePath: email-indirect
summary: Authorized indirect prompt injection challenge focused on calendar-information leakage.
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
difficulty: intermediate
estimatedMinutes: 75
runModes:
  - docker
  - event
llmRequired: true
gpuRequired: false
concepts:
  - indirect prompt injection
  - untrusted external content
  - calendar-information leakage
threatCategories:
  - indirect prompt injection
isOffensive: true
safetyBoundary: Use only with intentionally vulnerable workshop fixtures and authorized training data.
setupStatus: draft
debriefStatus: draft
instructorGuideStatus: missing
mappings:
  owasp:
    - LLM01
  mitreAtlas:
    - AML.T0051.001
    - AML.T0057
requiredArtifact: Lab notes and defensive debrief stub
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This lab page wraps an existing AI Village workshop challenge from the public `aivillage/workshops` repository. The workshop is designed as a low-friction learning demo, not as a production-secure reference architecture or complete course.

## What This Lab Teaches

Email Indirect Prompt Injection is an authorized challenge to fool an LLM into leaking calendar information. The lab uses a per-user user container, a central stateless email server, and an external LLM service. It is intentionally vulnerable so learners can study how untrusted external content can influence model-mediated disclosure.

The intended learner understands basic prompt injection and wants to reason about trust boundaries around sensitive data. Expect a containerized workshop environment with no hosted launcher or scoring system in Learn. Use only the approved workshop fixtures and authorized training data.

## What To Write Down

Produce a short incident-style note that identifies the untrusted content, the sensitive calendar information at risk, the trust boundary failure, and the controls that would reduce exposure. Include what the learner observed, what should have required approval, and what audit events would help a defender review the case.

This lab supports the AI security and offensive-security learning paths by connecting indirect prompt injection to defensive data-handling controls. It is not a complete agent security lab, protocol-specific integration lab, real email exploit, account-abuse scenario, arbitrary tool-exploitation training, or full calendar security course.

## Defensive Debrief

### What Failed

Untrusted content influenced model behavior around sensitive calendar information.

### Why It Failed

The application and model treated external content as more authoritative than it should have been near sensitive data. The system did not keep data and instructions separated enough to prevent model-mediated disclosure.

### What The Attacker Controlled

The attacker controlled email or other external content inside the intentionally vulnerable lab scenario.

### What The Application Trusted

The application trusted model interpretation of untrusted content close to calendar data that should have been handled with tighter disclosure controls.

### What Defenders Should Observe

Look for sensitive data exposure through model-mediated interaction, especially reads or summaries involving calendar information after untrusted content is processed.

### How To Reduce Blast Radius

Classify external content as untrusted, separate data from instructions, constrain sensitive reads, require approval before disclosure, scope access to sensitive data, and log sensitive reads for review.

### Regression Test

A regression test should confirm that untrusted email content cannot cause calendar information to be disclosed without the expected policy checks and approval gates.

### Learner Artifact

Include a short incident-style note describing the trust boundary failure, the calendar-information exposure risk, and proposed controls.
