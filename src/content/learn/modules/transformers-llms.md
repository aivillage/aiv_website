---
title: Transformers and LLMs
slug: transformers-llms
summary: Introduces transformers and language models as prediction systems with context-dependent behavior.
tracks:
  - ai-fundamentals
stageStart: explorer
stageEnd: ai_literate
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Explain tokens, attention, training data, context windows, and generation limits at a practical level.
  - Create a token and attention explainer that names where confidence can be misleading.
prerequisites:
  - deep-learning-systems
resources:
  - resource: huggingface-llm-course
    role: required
  - resource: 3blue1brown-transformers
    role: required
    step: 2
    note: "Use this to explain tokens, attention, context, and generation in your own words."
requiredArtifact: Token and attention explainer
securityLens: awareness
securityLensText: "Language models respond to context, not just user intent. Treat system prompts, retrieved text, chat history, and pasted documents as inputs that can shape behavior and require review."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces transformers and large language models at the level needed to reason about modern AI applications. The curated resources explain tokens, attention, pretraining, context, and generation without turning the module into a model-building course. Your checkpoint is to describe what information is available to a model at inference time and what the model is not actually verifying. Use the module responsibly by keeping a clear boundary between fluent output and trustworthy output. Language models can be useful assistants, but their responses depend heavily on prompt wording, context, and training patterns. This module sets up later work on prompting, retrieval, tool use, and evaluation.
