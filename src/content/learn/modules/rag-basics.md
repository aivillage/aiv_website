---
title: RAG Basics
slug: rag-basics
summary: Builds a practical mental model for retrieval augmented generation and its review points.
tracks:
  - ai-builder-core
stageStart: ai_practitioner
stageEnd: builder
difficulty: intermediate
moduleType: practice
learningObjectives:
  - Explain how approved sources become retrieved context for an AI answer.
  - Draft a Team Knowledge Assistant RAG design note with source, retrieval method, answer format, and review step.
prerequisites:
  - structured-outputs
resources:
  - resource: llamaindex-rag-docs
    role: required
    step: 1
    note: "Use this to name the RAG source, chunking, retrieval, answer, and review pieces."
  - resource: microsoft-rag-vector-databases
    role: optional
    step: 2
    note: "Use this as optional context for vector database and retrieval design choices."
labs:
  - rag-poisoning
requiredArtifact: Team Knowledge Assistant RAG design note
securityLens: required
securityLensText: "A RAG knowledge base is an instruction surface, not just data storage. Retrieved content should be treated as untrusted input until the application proves otherwise."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces retrieval augmented generation as the Team Knowledge Assistant's path from approved team documents into model context. The curated resources explain indexing, chunking, retrieval, prompt assembly, and answer generation. Your artifact is a basic RAG design note that names the content source, retrieval method, answer format, and review step. Use the module responsibly by treating retrieved text as influential input rather than neutral background. Do not assume the newest, closest, or longest chunk is safe or correct. RAG systems need access rules, source labeling, evaluation, and fallback behavior when retrieval is weak or conflicting. Keep the design note close to the prototype so retrieval assumptions are reviewed as the content changes.
