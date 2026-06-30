---
title: Inspect Dataset, Solver, and Scorer
slug: inspect-dataset-solver-scorer
summary: Explains dataset, solver, scorer, and metric roles in Inspect-style evaluation workflows.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Distinguish dataset, solver, scorer, and metric responsibilities in an Inspect-style eval.
  - Sketch an eval component map with dataset source, solver behavior, scorer rule, metric, and limitations.
prerequisites:
  - what-is-an-eval
resources:
  - resource: inspect-ai-datasets
    role: required
    step: 1
    note: "Use this to identify sample structure, provenance, population, and slice limits."
  - resource: inspect-ai-scorers
    role: required
    step: 2
    note: "Use this to describe the scoring rule and the assumptions it introduces."
  - resource: inspect-ai-solvers
    role: optional
    step: 3
    note: "Use this to record the model interaction path and any prompt or tool behavior that shapes outputs."
  - resource: inspect-ai-metrics
    role: deeper
    step: 4
    note: "Use this to connect sample scores to aggregate metrics without losing limitations."
labs:
  - inspect-bahrain
requiredArtifact: Eval component sketch
securityLens: required
securityLensText: "Evaluation components encode assumptions. Review datasets, solvers, and scorers for what they include, what they omit, and how they could reward behavior you do not want."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module replaces broad Inspect orientation with page-specific docs for the parts of an eval. The dataset defines the sample population and provenance. The solver defines how the model or system is asked to act. The scorer defines how outputs are judged. The metric summarizes those judgments and can hide important sample-level failures.

Your artifact is a component sketch for one eval task, naming the dataset source, solver behavior, scorer rule, metric, and known limitations. Use the module responsibly by checking whether the setup matches the behavior you care about. False assurance can enter through mismatched samples, a solver that leaks answers or tool affordances, a scorer that rewards the wrong proxy, or a metric that compresses failures into a clean-looking number. Keep the sketch close to the eval files so later reviewers can connect results back to design choices.
