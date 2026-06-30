---
title: RAG Poisoning Risk
slug: rag-poisoning-risk
summary: Reviews RAG poisoning as a provenance, ingestion, retrieval, and debrief risk.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Explain RAG poisoning risk through source provenance, ingestion review, retrieval trust, and output claims.
  - Write a RAG poisoning risk memo that names the poisoning path, control, evidence, and safety boundary.
prerequisites:
  - vector-embedding-weaknesses
resources:
  - resource: owasp-llm04-data-model-poisoning
    role: required
    step: 1
    note: "Use this official OWASP page for poisoning risk framing, not hands-on attack practice."
labs:
  - rag-poisoning
requiredArtifact: RAG poisoning risk memo
securityLens: primary
securityLensText: "RAG poisoning review should stay defensive: provenance, ingestion review, retrieval trust, citation checks, and debrief evidence. Keep the AIV lab optional and safety-framed."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module reviews RAG poisoning as a data and model poisoning risk without making offensive lab work the core path. Learners connect poisoned or untrusted content to ingestion controls, retrieval behavior, source provenance, output claims, and review evidence.

Your artifact is a RAG poisoning risk memo. It should name the poisoning path, affected retrieval source, provenance signal, control owner, observed or plausible output effect, safety boundary, and follow-up review. The AI Village RAG lab is available only as an optional safety-framed debrief reference for learners who already have an authorized lab context.
