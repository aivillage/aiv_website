---
title: Running an Inspect Eval
slug: running-inspect-eval
summary: Walks through running an Inspect-style eval in an authorized learning context.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Run an Inspect-style eval only with authorized models, accounts, datasets, and credentials.
  - Write an eval run note with task, system under test, config, result summary, and limitations.
prerequisites:
  - inspect-dataset-solver-scorer
resources:
  - resource: inspect-ai
    role: required
  - resource: inspect-bahrain
    role: optional
labs:
  - inspect-bahrain
requiredArtifact: Eval run note
securityLens: required
securityLensText: "Running an eval can send prompts, outputs, and configuration to models or services. Use authorized data, protect credentials, and document the environment before interpreting results."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module is a public anchor for running an Inspect-style evaluation in a controlled learning context. The curated resources and linked lab metadata help learners connect configuration, model access, datasets, solvers, scorers, and result files. Your artifact is an eval run note that records the task, model or system under test, configuration, result summary, and limitations. Use the module responsibly by running only against authorized models, accounts, and datasets. Keep credentials out of notebooks and logs, and do not treat a single run as a stable conclusion. The value is learning how to produce reviewable evidence and questions for follow-up.
