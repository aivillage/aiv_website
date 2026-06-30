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
  - resource: aiv-threat-modeling-llm-applications
    role: required
    step: 1
    note: "Use this AIV article as the defensive opening anchor for AI threat modeling."
  - resource: owasp-llm-top-10-2025
    role: optional
    step: 2
    note: "Use this as a secondary overview map after the system outline exists."
requiredArtifact: AI threat model outline or AI Security Core review pack entry
securityLens: primary
securityLensText: "AI threat modeling should connect risks to concrete controls and owners. Keep the model high-level enough for shared review, but specific enough to guide design decisions."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module is the docs-first anchor for the AI Security Core track. It introduces threat modeling as a way to name assets, actors, trust boundaries, data flows, model behavior, tools, retrieval sources, and control decisions in an AI system. The AIV article is the required starting point because it keeps the work defensive and system-focused before learners consult broader risk lists.

Your artifact is an AI threat model outline or AI Security Core review pack entry. It should identify the system goal, sensitive data, model inputs, model outputs, tools, retrieval sources, trust boundaries, controls, owners, and open review decisions. Use the module responsibly by keeping the exercise defensive and design-focused. Do not turn the model into attack instructions; use it to decide what needs validation, monitoring, review, or redesign.
