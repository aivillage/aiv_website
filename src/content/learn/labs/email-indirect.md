---
title: Email Indirect Prompt Injection
slug: email-indirect
sourceRepo: aivillage/workshops
sourcePath: email-indirect
summary: Metadata wrapper for the public email indirect prompt injection workshop.
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

Lab wrapper guidance and defensive debriefs are pending review for the curriculum beta. Use only within the stated safety boundary.
