---
title: AI Builder Core
slug: ai-builder-core
summary: >-
  A builder path for designing API-based AI applications, structured outputs, RAG, vector search, tool
  calling, basic evals, and observability.
trackKind: builder
stageStart: ai_practitioner
stageEnd: builder
audiences:
  - Software builders
  - Prototype teams
  - Engineers new to AI application architecture
status: beta
prerequisites:
  - ai-fundamentals
requiredArtifacts:
  - Small AI app design sketch
  - Basic eval plan
securityLens: required
securityCheckpoints:
  - Input/output boundary checkpoint
  - Retrieval and tool-use checkpoint
whatExistsNow: The curriculum beta includes the builder curriculum metadata, module order, and starter resource map.
whatComingNext: Full lessons will add architecture notes, lab prompts, and security checkpoints.
canonicalModules:
  - ai-app-architecture
  - api-based-ai-apps
  - structured-outputs
  - rag-basics
  - vector-search-retrieval
  - tool-calling-basics
  - basic-app-evals
  - observability-cost
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

AI Builder Core is for software builders and prototype teams creating small AI applications. It covers application architecture, API-based model calls, structured outputs, RAG, vector search, tool calling, basic evals, and observability. The learner should produce a small AI app design sketch and a basic eval plan that explain where data moves, what the model can influence, and how behavior will be checked.

Security is built into the architecture rather than saved for the end. Each module asks where validation, authorization, retrieval controls, logging, and human review belong. What is useful now is a practical module sequence with curated resources and beta module pages that help teams reason before they build. More detailed lab prompts, architecture notes, and security checkpoints are still being expanded. Treat the track as a design guide for safer prototypes, not as a production readiness guarantee.
