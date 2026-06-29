---
title: AI App Architecture
slug: ai-app-architecture
summary: Introduces the core parts of an AI application and the boundaries between them.
tracks:
  - ai-builder-core
stageStart: ai_practitioner
stageEnd: builder
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Describe the main concepts for AI App Architecture.
  - Identify the artifact or checkpoint this module supports.
prerequisites: []
resources:
  - resource: microsoft-genai-beginners
    role: required
  - resource: full-stack-deep-learning-llm-bootcamp
    role: optional
  - resource: fsdl-launch-llm-app-one-hour
    role: deeper
securityLens: required
securityLensText: "AI application architecture should make trust boundaries visible. Separate user input, model calls, retrieved context, tools, storage, and approvals so controls can be placed where decisions happen."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces the architecture of a Team Knowledge Assistant: user interface, prompt assembly, model call, retrieval, tools, storage, logging, and evaluation. Use the curated resources to see how these pieces fit together before selecting a framework. Your artifact is a design sketch for the assistant that labels data flow, model inputs, outputs, and human review points. Use the module responsibly by keeping architecture decisions explicit. Do not hide authorization, privacy, or safety assumptions inside prompt text. A clear design sketch helps teams decide where validation, logging, access control, and fallback behavior belong before the prototype becomes hard to change.
