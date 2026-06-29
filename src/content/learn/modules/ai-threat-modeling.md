---
title: AI Threat Modeling
slug: ai-threat-modeling
summary: Introduces AI threat modeling as a structured way to reason about data, models, tools, and users.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Name assets, actors, trust boundaries, data flows, and controls for an AI system.
  - Draft an AI threat model outline that connects risks to owners and review decisions.
prerequisites: []
resources:
  - resource: owasp-llm-top-10-2025
    role: required
requiredArtifact: AI threat model outline
securityLens: primary
securityLensText: "AI threat modeling should connect risks to concrete controls and owners. Keep the model high-level enough for shared review, but specific enough to guide design decisions."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module is a low-risk anchor for the AI Security Core track. It introduces threat modeling as a way to name assets, actors, trust boundaries, data flows, model behavior, and control decisions in an AI system. The curated resources help security practitioners and builders move from a vague concern to a reviewable diagram or outline. Your artifact is an AI threat model outline that identifies the system goal, sensitive data, model inputs, model outputs, tools, retrieval sources, and the controls that need owners. Use the module responsibly by keeping the exercise defensive and design-focused. Do not turn the model into attack instructions; use it to decide what needs validation, monitoring, review, or redesign.
