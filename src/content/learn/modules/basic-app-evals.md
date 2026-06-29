---
title: Basic App Evals
slug: basic-app-evals
summary: Introduces small evaluation sets that test whether an AI app behaves as intended.
tracks:
  - ai-builder-core
stageStart: ai_practitioner
stageEnd: builder
difficulty: advanced
moduleType: concept
learningObjectives:
  - Describe the main concepts for Basic App Evals.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - tool-calling-basics
resources:
  - resource: inspect-tutorial
    role: required
  - resource: inspect-logs
    role: optional
  - resource: promptfoo
    role: deeper
securityLens: required
securityLensText: "A benchmark score is not a security guarantee. Test the behavior your application actually depends on, including refusal, uncertainty, retrieval failure, and adversarial cases."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module helps builders create basic evaluations for the Team Knowledge Assistant before relying on demos or impressions. The curated resources introduce test cases, expected behavior, scoring, and regression checks. Your artifact is a small eval plan with representative prompts, edge cases, expected outcomes, and notes on what failure would mean. Use the module responsibly by testing behavior that matters to the actual workflow, not only examples where the system looks good. Include cases involving missing context, ambiguous instructions, unsafe requests, and low-confidence output. Basic evals do not prove a system is safe, but they make review more concrete and repeatable.
