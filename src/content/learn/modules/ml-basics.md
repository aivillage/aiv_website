---
title: ML Basics
slug: ml-basics
summary: Builds baseline understanding of training data, labels, metrics, and model evaluation.
tracks:
  - ai-fundamentals
stageStart: explorer
stageEnd: ai_literate
difficulty: intro
moduleType: practice
learningObjectives:
  - Explain how examples, labels, metrics, and validation shape a simple ML task.
  - Write a baseline ML model note with task, data, metric, and limitations.
prerequisites:
  - python-notebook-readiness
resources:
  - resource: google-introduction-to-ml
    role: required
    step: 1
    note: "Use this direct introduction to define the task, examples, labels, metric, and limitation in your baseline note."
  - resource: google-ml-crash-course
    role: optional
    step: 2
    note: "Use the broader course only after your baseline ML note has the core vocabulary."
  - resource: fastai-practical-deep-learning
    role: deeper
    step: 3
    note: "Optional off-ramp for learners who want a broader hands-on course."
requiredArtifact: Baseline ML model note
securityLens: awareness
securityLensText: "Metrics define what good means for a model. A high score on the wrong metric can hide bias, brittleness, or unsafe behavior in the situations users actually face."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces machine learning as a process for fitting patterns from data and checking whether those patterns generalize. Use the curated resource to understand examples, labels, training data, validation data, and basic metrics before moving into deep learning or LLM topics. The expected checkpoint is a short explanation of one model task, the data it would need, and the metric you would use to decide whether it is useful. Use the module responsibly by asking what the metric leaves out. Accuracy, loss, and benchmark scores are helpful only when they reflect the real decision or workflow. Keep a note of assumptions, failure cases, and groups or situations that may need separate review.
