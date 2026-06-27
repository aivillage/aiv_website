---
title: RAG Poisoning
slug: rag-poisoning
sourceRepo: aivillage/workshops
sourcePath: rag-poisoning
summary: Safety-bounded metadata for a RAG poisoning workshop using sandboxed retrieval corpora.
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
difficulty: advanced
estimatedMinutes: 90
runModes:
  - docker
  - event
llmRequired: true
gpuRequired: false
concepts:
  - retrieval augmented generation
  - corpus poisoning
threatCategories:
  - RAG poisoning
isOffensive: true
safetyBoundary: Use only against sandboxed retrieval corpora created for the lab.
setupStatus: draft
debriefStatus: draft
instructorGuideStatus: missing
mappings:
  owasp:
    - LLM08
  mitreAtlas:
    - AML.T0054
requiredArtifact: Lab notes and defensive debrief stub
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This lab entry is for controlled RAG poisoning practice against sandboxed corpora created for the exercise. It should help learners document how retrieval content can influence model behavior and what defensive review should inspect. The expected artifact is lab notes and a defensive debrief stub. Full debrief content remains draft and is not published in this pass.
