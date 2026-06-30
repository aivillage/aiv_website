---
title: Red-Team the Eval
slug: red-team-the-eval
summary: Checks whether an eval setup can create false confidence through mismatched data, leakage, or weak scoring.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: advanced
moduleType: practice
learningObjectives:
  - Identify eval failure modes including dataset mismatch, solver leakage, grader shortcuts, judge calibration failure, and hidden slices.
  - Write an eval red-team checklist that records threats to the eval claim and follow-up checks.
prerequisites:
  - interpreting-eval-results
resources:
  - resource: inspect-ai-datasets
    role: required
    step: 1
    note: "Use this to check whether samples, provenance, and slices match the behavior claim."
  - resource: inspect-ai-scorers
    role: required
    step: 2
    note: "Use this to check whether the scorer rewards the intended behavior or an easier proxy."
  - resource: inspect-ai-solvers
    role: optional
    step: 3
    note: "Use this to look for solver leakage, shortcut prompts, or tool affordances that change task difficulty."
  - resource: inspect-ai-model-graded
    role: deeper
    step: 4
    note: "Use this for advanced judge calibration risks when a model-graded scorer is involved."
requiredArtifact: Eval red-team checklist
securityLens: required
securityLensText: "Red-teaming an eval means looking for ways the evidence can mislead reviewers. Check hidden slices, dataset mismatch, solver leakage, grader shortcuts, judge calibration failure, and claims that outrun the samples."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module keeps the track from becoming a benchmark farm by asking learners to test the eval itself. The goal is not to attack a model harder. The goal is to find where the eval setup could produce confident-looking but weak evidence.

Your artifact is an eval red-team checklist. It should cover dataset fit and hidden slices, solver leakage or prompt shortcuts, scorer blind spots, grader calibration, metric aggregation, and the exact claim the result should not support. Use the module responsibly by treating weak eval design as a safety and reliability risk. A checklist that finds limitations is a successful outcome when it prevents overstated conclusions.
