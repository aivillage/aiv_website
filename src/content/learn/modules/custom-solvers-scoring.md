---
title: Custom Solvers and Scoring
slug: custom-solvers-scoring
summary: Shows how custom solver and scorer choices change the claim an Inspect eval can support.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: advanced
moduleType: practice
learningObjectives:
  - Explain how a custom solver or scorer changes the behavior being tested and the assumptions behind the score.
  - Write a custom solver/scorer change note that records the reason, test case, risk, and limitation.
prerequisites:
  - running-inspect-eval
resources:
  - resource: inspect-ai-solvers
    role: required
    step: 1
    note: "Use this to identify the solver behavior and configuration that must stay reproducible."
  - resource: inspect-ai-custom-scorers
    role: required
    step: 2
    note: "Use this to document what the custom scorer checks and how you would test it."
  - resource: inspect-ai-model-graded
    role: deeper
    step: 3
    note: "Use this only as advanced context for model-graded judge calibration and shortcuts."
requiredArtifact: Custom solver/scorer change note
securityLens: required
securityLensText: "Custom solver and scorer code can create hidden shortcuts, leakage, or judge bias. Treat changes as part of the eval evidence, test them directly, and record what they cannot measure."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module promotes the former placeholder into a bounded practice module. Learners do not need to build a large harness here. They need to understand that changing a solver or scorer changes the evidence the eval can produce.

Your artifact is a custom solver/scorer change note. It should name the behavior the change is meant to capture, the exact solver or scorer setting affected, one positive test case, one negative or failure case, and the limitation that remains. Use the module responsibly by checking for hidden answer leakage, prompt shortcuts, tool affordances that make the task easier than intended, and model-graded judges that have not been calibrated. A custom component is useful only when reviewers can see why it exists and how it was tested.
