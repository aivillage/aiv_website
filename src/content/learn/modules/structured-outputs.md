---
title: Structured Outputs
slug: structured-outputs
summary: Uses schemas and structured responses to make AI output easier to validate and route.
tracks:
  - ai-builder-core
stageStart: ai_practitioner
stageEnd: builder
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Describe the main concepts for Structured Outputs.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - api-based-ai-apps
resources:
  - resource: openai-structured-outputs
    role: required
  - resource: microsoft-function-calling-external-apps
    role: optional
securityLens: required
securityLensText: "Schema validation is not authorization. A valid JSON object can still request an unsafe or unauthorized action, so applications must validate intent, permissions, and business rules separately."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces structured outputs as a way to make model responses easier for applications to consume. The curated resources show how schemas, JSON output, function arguments, and parsing rules can reduce ambiguity. Your artifact is a small schema for one AI-assisted workflow, plus examples of valid output, invalid output, and output that is valid but should still be rejected. Use the module responsibly by remembering that structure is not trust. A response can match the schema and still contain a false claim, unsafe instruction, or unauthorized request. Pair structured outputs with validation, authorization, review, and tests that reflect the workflow's real risk.
