---
title: Agentic RAG
slug: agentic-rag
summary: Explores RAG systems where agents decide when, how, and why to retrieve context.
tracks:
  - agentic-ai-advanced-builder
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Describe the main concepts for Agentic RAG.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - agent-frameworks
resources:
  - resource: llamaindex-agentic-strategies
    role: required
  - resource: llamaindex-build-agents-from-scratch
    role: optional
requiredArtifact: RAG boundary spec
securityLens: required
securityLensText: "Agentic RAG combines retrieval risk with autonomous decision-making. Limit what the agent can retrieve, label sources clearly, and test how retrieved content changes tool or answer behavior."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module looks at agentic RAG, where an agent can decide when to search, what to retrieve, and how to use retrieved context. LlamaIndex docs are the implementation authority; the video is conceptual support for agent construction, not a current API reference.

Your artifact is a RAG boundary spec. Name the approved RAG sources, retrieval permissions, source labels, metadata, trust classes, and review points for agent decisions. Use the module responsibly by treating both the index and the agent loop as control surfaces. Retrieved content can shape behavior, steer tool use, and conflict with trusted policy. Test ordinary tasks, missing context, conflicting sources, and content that should not influence action.
