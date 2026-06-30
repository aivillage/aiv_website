---
title: RAG Poisoning Lab Wrapper
slug: rag-poisoning-lab-wrapper
summary: Wraps the AIV RAG poisoning toy lab with provenance, ingestion, retrieval-control, and report framing.
tracks:
  - offensive-ai-security-red-teaming
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
difficulty: intermediate
moduleType: lab
learningObjectives:
  - Review RAG poisoning risk inside an authorized toy retrieval corpus.
  - Write a RAG poisoning report or risk memo focused on ingestion, provenance, retrieval, and mitigation controls.
prerequisites:
  - indirect-prompt-injection-lab-wrapper
resources:
  - resource: owasp-llm04-data-model-poisoning
    role: required
    step: 1
    note: "Use this official OWASP page as the required poisoning risk frame."
  - resource: owasp-llm08-vector-embedding-weaknesses
    role: optional
    step: 2
    note: "Use this when the report needs vector-store or retrieval-boundary controls."
labs:
  - rag-poisoning
requiredArtifact: RAG poisoning report/risk memo
securityLens: primary
securityLensText: "RAG poisoning review should focus on ingestion review, source provenance, retrieval filtering, citation checks, and trust boundaries. Use only sandboxed corpora created for the lab."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module exposes the AIV RAG poisoning lab only as an authorized toy-lab wrapper. Learners study the defensive consequences of untrusted retrieval content and source provenance, not a general-purpose poisoning method.

Your artifact is a RAG poisoning report or risk memo. It should summarize the safety boundary, affected retrieval corpus, provenance gap, observed failure category, defensive evidence, deterministic mitigation, and regression test. Do not include payload collections, operational walkthroughs, or instructions for use against real retrieval systems.
