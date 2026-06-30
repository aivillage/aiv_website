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
  - Label model, retrieval, tool, storage, logging, and review boundaries in an AI app.
  - Draft a Team Knowledge Assistant architecture sketch with data flow and human review points.
prerequisites: []
resources:
  - resource: microsoft-genai-application-lifecycle
    role: required
    step: 1
    note: "Start here for app boundaries, lifecycle review, evaluation, monitoring, and operational feedback."
  - resource: fsdl-launch-llm-app-one-hour
    role: deeper
    step: 2
    note: "Use this as broader context for the main application parts after the architecture sketch has concrete boundaries."
requiredArtifact: Team Knowledge Assistant architecture sketch
securityLens: required
securityLensText: "AI application architecture should make trust boundaries visible. Separate user input, model calls, retrieved context, tools, storage, and approvals so controls can be placed where decisions happen."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces the architecture of a Team Knowledge Assistant: user interface, prompt assembly, model call, approved-document retrieval, safe read-only tools, storage, logging, evaluation, and human review. Use the curated resources to see how these pieces fit together before selecting a framework. Your artifact is a design sketch for the assistant that labels data flow, model inputs, outputs, tool authority, retrieved context, logs, and review points. Use the module responsibly by keeping architecture decisions explicit. Do not hide authorization, privacy, or safety assumptions inside prompt text. A clear design sketch helps teams decide where validation, logging, access control, and fallback behavior belong before the prototype becomes hard to change.
