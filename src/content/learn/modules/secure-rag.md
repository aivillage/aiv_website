---
title: Secure RAG
slug: secure-rag
summary: Define RAG controls for source provenance, ingestion review, retrieval trust, citation handling, and poisoned-context regression tests.
tracks:
  - defensive-ai-engineering
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Separate trusted policy, retrieved evidence, and untrusted external content in a RAG design.
  - Identify poisoning, stale-context, and vector-store weaknesses that create false confidence.
  - Produce a RAG trust-boundary and ingestion-control checklist.
prerequisites:
  - secure-ai-architecture
resources:
  - resource: owasp-llm04-data-model-poisoning
    role: required
    step: 1
    note: "Use this to frame data and model poisoning risks around source provenance and ingestion review."
  - resource: owasp-llm08-vector-embedding-weaknesses
    role: required
    step: 2
    note: "Use this to frame retrieval, vector-store, and embedding trust boundaries."
  - resource: llamaindex-rag-docs
    role: optional
    step: 3
    note: "Use implementation docs only after the security checklist names data sources, retrieval controls, and review evidence."
  - resource: nist-genai-profile
    role: optional
    step: 4
    note: "Use this to connect RAG controls to broader risk-management evidence."
labs:
  - rag-poisoning
requiredArtifact: RAG trust-boundary and ingestion-control checklist
securityLens: primary
securityLensText: "Secure RAG work should make retrieved content less authoritative by default: track provenance, review ingestion paths, separate policy from context, constrain retrieval access, and test known poisoned-context failures."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module treats RAG as a trust-boundary problem. Retrieved context can look like evidence while carrying stale, malicious, unreviewed, or overbroad information. A defensive RAG design names each source, ingestion path, index or vector store, access rule, retrieval filter, citation rule, and review owner before treating outputs as support for a decision.

Use the RAG Poisoning lab as a bounded review exercise. The point is not to collect payloads. The point is to observe how untrusted or misleading retrieved content changes output behavior, then write down which provenance, review, filtering, citation, and regression controls would reduce the same failure in a real system.

The artifact is a RAG trust-boundary and ingestion-control checklist. Include source provenance, data owner, ingestion approval, index scope, retrieval authorization, citation expectations, log fields, known poisoned-context tests, and limitations. The checklist should make clear what the RAG system can support and what it must not be used to claim.
