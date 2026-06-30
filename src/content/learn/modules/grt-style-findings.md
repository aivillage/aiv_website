---
title: GRT-Style Findings
slug: grt-style-findings
summary: Turns eval evidence into a short GRT-style finding memo with claim boundaries and reproducibility.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: advanced
moduleType: capstone
learningObjectives:
  - Convert an eval card and sample evidence into a narrow GRT-style finding.
  - Write a finding memo that includes claim, evidence source, reproducibility path, limits, and follow-up action.
prerequisites:
  - eval-cards
resources:
  - resource: aiv-grt-finding-template
    role: required
    step: 1
    note: "Use this AIV-authored template to keep the finding tied to evidence, limits, and follow-up action."
  - resource: aiv-eval-card-template
    role: optional
    step: 2
    note: "Use this to check that the finding is supported by the completed eval card."
requiredArtifact: GRT-style finding memo
securityLens: required
securityLensText: "A GRT-style finding should make a narrow, reproducible claim. It must not inflate limited samples into broad safety or reliability conclusions, and it should name limits and follow-up actions."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module keeps GRT-specific writing inside the Evals, Reliability, and GRT Research track. Learners turn one eval card and sample-level evidence into a short finding memo, not a broad research claim.

Your artifact is a GRT-style finding memo. It should include the claim, evidence source, samples, reproducibility path, limits, severity or importance framing, affected model/system claim, and follow-up action. Use the module responsibly by writing only what the evidence supports. The memo should help another reviewer rerun or inspect the evidence, understand what is out of scope, and decide the next action without treating the eval as stronger than it is.
