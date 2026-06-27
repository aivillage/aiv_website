---
title: Email Indirect Prompt Injection
slug: email-indirect
sourceRepo: aivillage/workshops
sourcePath: email-indirect
summary: Safety-bounded metadata for an email indirect prompt injection workshop, focused on tool-mediated data exposure review.
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
  - tool-mediated data exposure
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
    - AML.T0051
requiredArtifact: Lab notes and defensive debrief stub
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This lab entry frames email-based indirect prompt injection as an authorized training exercise, not a real-world testing invitation. Use only intentionally vulnerable workshop fixtures and approved training data. The expected artifact is a set of lab notes that explain the boundary, observed behavior, and defensive questions for review. Final debrief guidance remains draft.
