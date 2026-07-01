---
title: RAG Poisoning
slug: rag-poisoning
sourceRepo: aivillage/workshops
sourcePath: rag-poisoning
summary: Authorized RAG knowledge-base poisoning challenge focused on retrieved misinformation.
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
  - knowledge-base poisoning
  - source provenance
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
    - AML.T0070
    - AML.T0066
    - AML.T0071
requiredArtifact: Lab notes and defensive debrief note
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This lab page wraps an existing AI Village workshop challenge from the public `aivillage/workshops` repository. The workshop is designed as a low-friction learning demo, not as a production-secure reference architecture or complete course.

## What This Lab Teaches

RAG Poisoning is an authorized challenge to poison a RAG knowledge base and make an AI assistant spread misinformation. The lab uses a per-user user container, a central stateless RAG backend, and an external LLM service. It is intentionally vulnerable so learners can study retrieval as an attack path.

The intended learner understands basic retrieval augmented generation and wants to connect poisoned retrieved content to defensive controls. Expect a containerized workshop environment with no hosted launcher or scoring system in Learn. Use only sandboxed corpora created for the exercise.

## What To Write Down

Produce a short RAG risk memo that describes the poisoning path, the observed effect on assistant output, the safety boundary, and the controls that would reduce exposure. Include what source provenance would have helped, what crafted or false retrieval content influenced the answer, what retrieval behavior should be filtered or reviewed, and what regression test would catch the same failure.

This lab supports the AI security and offensive-security learning paths by connecting RAG knowledge-base poisoning to defensive review of retrieval systems. It is not a complete secure-RAG course, production RAG attack framework, general misinformation defense system, or full RAG security benchmark.

## Defensive Debrief

### What Failed

Retrieved content was trusted enough to influence assistant output and spread misinformation.

### Why It Failed

The knowledge base became part of the instruction and evidence surface. Retrieved context was not separated strongly enough from trusted policy, and the system did not apply enough provenance or trust review before using it.

### What The Attacker Controlled

The attacker controlled crafted or false content inserted into the intentionally vulnerable knowledge base.

### What The Retrieval System Trusted

The retrieval system trusted retrieved context without enough provenance, trust scoring, or separation between untrusted content and policy.

### What Defenders Should Observe

Look for poisoned documents influencing answer behavior, especially when retrieved context changes the assistant's claims without reliable provenance or citation support.

### How To Reduce Blast Radius

Use provenance tracking, ingestion review, trust scoring, retrieval filtering, citation checking, and clear separation between trusted policy and retrieved content. Add regression tests using poisoned documents to check whether the assistant repeats unsupported or unsafe claims.

### Regression Test

A regression test should confirm that known poisoned documents do not cause the assistant to present misinformation as reliable fact, and that citation or provenance checks surface the issue for review.

### Learner Artifact

Include a short RAG risk memo with the poisoning path, observed effect, and proposed controls.
