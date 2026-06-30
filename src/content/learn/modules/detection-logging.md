---
title: Detection and Logging
slug: detection-logging
summary: Define AI telemetry fields, redaction rules, sample review, and alert thresholds for defensive review.
tracks:
  - defensive-ai-engineering
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Identify the prompts, retrieved content, tool calls, approvals, scores, and failures needed for review.
  - Balance evidence collection with redaction, access control, retention, and user privacy.
  - Produce an AI telemetry field map and alert spec.
prerequisites:
  - defensive-evals
resources:
  - resource: inspect-ai-eval-logs
    role: required
    step: 1
    note: "Use Inspect logs as the required evidence model for run config, samples, scoring, and interpretation."
  - resource: inspect-ai-log-viewer
    role: optional
    step: 2
    note: "Use the viewer to inspect sample-level failures instead of relying on headline results only."
  - resource: phoenix-observability-docs
    role: optional
    step: 3
    note: "Use tracing docs as an implementation off-ramp after the field map and redaction rules are written."
  - resource: openinference-docs
    role: optional
    step: 4
    note: "Use OpenInference as an instrumentation off-ramp for trace semantics and integration patterns."
labs:
  - inspect-bahrain
requiredArtifact: AI telemetry field map and alert spec
securityLens: primary
securityLensText: "Detection and logging must capture enough evidence to review AI failures without creating uncontrolled copies of prompts, outputs, credentials, retrieved content, or sensitive user data."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module turns defensive eval and runtime review needs into telemetry requirements. Logging every token is rarely the right answer. Instead, name the fields that support review: user intent class, policy decision, prompt template version, retrieved sources, tool call request, approval result, model and system version, scorer result, representative samples, error class, latency, cost, and owner.

Use Inspect logs as the first evidence model because they connect run configuration, samples, scores, and interpretation. Then decide which fields belong in production traces, which fields must be redacted or hashed, who can access them, how long they are retained, and which thresholds should trigger review.

The artifact is an AI telemetry field map and alert spec. Include field name, source, purpose, sensitivity, redaction rule, retention period, access owner, alert condition, and example follow-up. The artifact should make it possible to investigate a failure without expanding data exposure beyond the review need.
