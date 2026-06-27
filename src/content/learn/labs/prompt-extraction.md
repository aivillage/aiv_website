---
title: Prompt Extraction
slug: prompt-extraction
sourceRepo: aivillage/workshops
sourcePath: prompt-extraction
summary: Safety-bounded metadata for an authorized prompt extraction workshop, focused on lab notes and defensive review.
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
    - AML.T0051
requiredArtifact: Lab notes and defensive debrief stub
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This lab entry points to an authorized workshop context for learning how prompt extraction risks are discussed and documented. Use only the provided lab targets or approved local fixtures, keep notes inside the stated safety boundary, and produce lab notes that support defensive review. Final debrief guidance remains draft and will be handled in a later content pass.
