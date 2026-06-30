---
title: Eval Cards
slug: eval-cards
summary: Introduces eval cards as concise documentation for evaluation intent, setup, results, and limits.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: advanced
moduleType: capstone
learningObjectives:
  - Document eval purpose, setup, methods, results, limitations, and owner.
  - Complete an eval card that makes supported and unsupported claims explicit.
prerequisites:
  - agent-evals
resources:
  - resource: aiv-eval-card-template
    role: required
    step: 1
    note: "Use this AIV-authored template as the required primary artifact structure."
  - resource: inspect-ai-eval-logs
    role: optional
    step: 2
    note: "Use this to connect eval-card evidence fields back to run logs."
labs:
  - inspect-bahrain
requiredArtifact: Completed eval card
securityLens: required
securityLensText: "An eval card should make evidence easier to review, not make weak evidence look complete. Include scope, methods, limitations, owners, and decisions the eval should or should not support."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module introduces eval cards as a concise way to document evaluation work and now provides the AIV-authored template as the required primary resource. The template captures behavior tested, system or model version, dataset provenance and slices, solver configuration, scorer and metrics, run config, representative failures, limitations, supported decision, unsupported decision, owner, and next regression test.

Your artifact is a completed eval card for the Inspect-backed example or another controlled eval. Use the module responsibly by making uncertainty visible. An eval card should state what the evidence supports, what it does not support, and what review decisions remain open. Good documentation prevents scores from traveling without context.
