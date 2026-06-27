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
  - resource: llamaindex-rag-docs
    role: required
securityLens: required
securityLensText: "Agentic RAG combines retrieval risk with autonomous decision-making. Limit what the agent can retrieve, label sources clearly, and test how retrieved content changes tool or answer behavior."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module looks at agentic RAG, where an agent can decide when to search, what to retrieve, and how to use retrieved context. The curated resources connect retrieval design with planning, tool use, and answer generation. Your artifact is an agentic RAG design note that names the sources, retrieval permissions, source labels, and review points for agent decisions. Use the module responsibly by treating both the index and the agent loop as control surfaces. Retrieved content can steer the agent, and the agent can choose retrieval paths that a fixed workflow would not. Test ordinary tasks, missing context, conflicting sources, and content that should not influence action.
