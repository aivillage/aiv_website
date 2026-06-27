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
  - Describe the main concepts for ML Basics.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - python-notebook-readiness
resources:
  - resource: google-ml-crash-course
    role: required
  - resource: fastai-practical-deep-learning
    role: optional
securityLens: awareness
securityLensText: "Metrics define what good means for a model. A high score on the wrong metric can hide bias, brittleness, or unsafe behavior in the situations users actually face."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces machine learning as a process for fitting patterns from data and checking whether those patterns generalize. Use the curated resource to understand examples, labels, training data, validation data, and basic metrics before moving into deep learning or LLM topics. The expected checkpoint is a short explanation of one model task, the data it would need, and the metric you would use to decide whether it is useful. Use the module responsibly by asking what the metric leaves out. Accuracy, loss, and benchmark scores are helpful only when they reflect the real decision or workflow. Keep a note of assumptions, failure cases, and groups or situations that may need separate review.
