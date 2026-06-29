---
title: Inspect Dataset, Solver, and Scorer
slug: inspect-dataset-solver-scorer
summary: Explains the dataset, solver, and scorer roles in Inspect-style evaluation workflows.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Distinguish dataset, solver, and scorer responsibilities in an Inspect-style eval.
  - Sketch an eval component map with dataset source, solver behavior, scorer rule, and limitations.
prerequisites:
  - what-is-an-eval
resources:
  - resource: inspect-ai
    role: required
labs:
  - inspect-bahrain
requiredArtifact: Eval component sketch
securityLens: required
securityLensText: "Evaluation components encode assumptions. Review datasets, solvers, and scorers for what they include, what they omit, and how they could reward behavior you do not want."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces the dataset, solver, and scorer pieces of an Inspect-style evaluation workflow. The curated resources help learners understand how examples are selected, how a system produces answers, and how outputs are judged. Your artifact is a component sketch for one eval task, naming the dataset source, solver behavior, scorer rule, and known limitations. Use the module responsibly by checking whether the evaluation setup matches the behavior you care about. A scorer can reward the wrong thing, and a dataset can miss important cases. Record those limits so results are interpreted as review evidence rather than final truth. Keep the sketch close to the eval files so later reviewers can connect results back to design choices.
