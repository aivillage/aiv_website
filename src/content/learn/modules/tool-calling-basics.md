---
title: Tool Calling Basics
slug: tool-calling-basics
summary: Explains tool calling as controlled application behavior, not model-owned authority.
tracks:
  - ai-builder-core
stageStart: ai_practitioner
stageEnd: builder
difficulty: advanced
moduleType: practice
learningObjectives:
  - Describe the main concepts for Tool Calling Basics.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - vector-search-retrieval
resources:
  - resource: openai-cookbook
    role: required
securityLens: required
securityLensText: "Every tool call is a privilege boundary. The application, not the model, must enforce user intent, authorization, scope, and approval before any real action occurs."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces tool calling as a way for AI applications to request actions such as lookup, calculation, retrieval, or workflow steps. The curated resources show how tool definitions, arguments, responses, and orchestration fit together. Your artifact is a tool-use boundary note for one tool, including allowed actions, required inputs, user approval, and failure handling. Use the module responsibly by keeping the model in a requesting role and the application in the enforcing role. A model should not decide that a user is authorized, that an action is safe, or that a side effect should happen. Build checks around each tool boundary.
