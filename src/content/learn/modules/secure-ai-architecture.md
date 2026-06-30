---
title: Secure AI Architecture
slug: secure-ai-architecture
summary: Build a control map for prompts, retrieval, tools, model providers, logs, approvals, and regression evidence.
tracks:
  - defensive-ai-engineering
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Name the AI application boundaries that need explicit controls before launch.
  - Map likely GenAI risks to owners, evidence, logs, and regression tests.
  - Produce a first secure AI architecture control plan for a small app.
prerequisites: []
resources:
  - resource: nist-genai-profile
    role: required
    step: 1
    note: "Use the GenAI Profile as the required control-mapping frame for model, data, and monitoring risks."
  - resource: nist-ai-rmf
    role: optional
    step: 2
    note: "Use this when you need the broader Govern, Map, Measure, and Manage structure behind the control plan."
  - resource: owasp-llm-top-10-2025
    role: optional
    step: 3
    note: "Use this as a risk category map after you have named the app boundaries and owners."
labs:
  - prompt-extraction
requiredArtifact: Secure AI architecture control plan
securityLens: primary
securityLensText: "Secure AI architecture starts by refusing to treat prompts, retrieval context, model outputs, tools, or logs as implicit trust boundaries. Name the owner, control, evidence, and regression test for each boundary."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module turns AI security concerns into an architecture control plan. Start with the system you already intend to build or review: user input, application policy, prompt construction, retrieval, tools, model provider calls, memory, logs, approvals, and deployment owners. For each boundary, write down what can cross it, what should never cross it, and what evidence would show the control is working.

Use the Prompt Extraction lab as a small defensive anchor. The lab demonstrates why prompt-resident secrets and hidden instructions are not access-control boundaries. Your control plan should explain where secrets live instead, what prompt content is allowed to contain, which logs are reviewed, and which regression test catches a repeat.

The artifact is a secure AI architecture control plan. It should include the system purpose, trust boundaries, sensitive data locations, controls, approval points, logging fields, review owner, and at least one regression test tied to a known failure mode. Keep claims narrow: a short beta control plan can support review, but it cannot prove the whole system is safe.
