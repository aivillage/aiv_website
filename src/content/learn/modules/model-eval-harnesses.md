---
title: Model Eval Harnesses
slug: model-eval-harnesses
summary: Compares evaluation harnesses as tools for repeatable testing and evidence collection.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: advanced
moduleType: concept
learningObjectives:
  - Compare eval harnesses by configuration, task definitions, model adapters, and scoring assumptions.
  - Draft a harness selection note that records fit, evidence produced, and blind spots.
prerequisites:
  - benchmark-transparency
resources:
  - resource: lm-evaluation-harness
    role: required
    step: 1
    note: "Use this as the primary broad model-eval harness reference."
  - resource: inspect-evals
    role: optional
    step: 2
    note: "Use this as an optional Inspect registry reference, not the operational spine."
  - resource: promptfoo-getting-started
    role: optional
    step: 3
    note: "Use this as an optional regression or CI follow-on after eval anatomy is clear."
requiredArtifact: Harness selection note
securityLens: required
securityLensText: "An eval harness can standardize tests, but it can also standardize blind spots. Review configuration, datasets, scoring, and logging before relying on repeated results."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module compares model evaluation harnesses after learners already understand Inspect anatomy and sample-level review. LM Evaluation Harness is the primary broad harness reference. Inspect Evals is treated as a registry reference. Promptfoo is an optional regression or CI follow-on, not the opening eval anatomy spine.

Your artifact is a harness selection note that names the eval goal, why one harness fits, what evidence it produces, what assumptions it bakes in, and what blind spots remain. Use the module responsibly by checking whether the harness fits the system and question being evaluated. Repeatability is valuable, but repeated tests with the wrong dataset or metric still lead to weak conclusions. Pair harness output with example inspection, documentation, and follow-up tests for important behaviors.
