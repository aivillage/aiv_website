---
title: Prompt Injection
slug: prompt-injection
summary: Frames prompt injection as a trust-boundary and control-design risk for AI systems.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Explain prompt injection as untrusted instruction influence across model context, tools, retrieval, and user workflows.
  - Write a prompt-injection review entry with affected boundary, control, owner, and evidence needed.
prerequisites:
  - ai-threat-modeling
resources:
  - resource: owasp-llm01-prompt-injection
    role: required
    step: 1
    note: "Use this official written source for defensive prompt-injection framing."
labs:
  - email-indirect
requiredArtifact: Prompt-injection review entry
securityLens: primary
securityLensText: "Prompt injection review should focus on trust boundaries, untrusted content, sensitive data access, tool authority, and controls. Keep lab references as optional defensive debriefs, not exploit walkthroughs."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module introduces prompt injection through the official OWASP LLM01 page and keeps the discussion defensive. Learners identify where instructions can enter a model-mediated workflow: user input, retrieved content, files, emails, tools, or prior conversation state.

Your artifact is a prompt-injection review entry. It should name the affected trust boundary, the untrusted content source, the sensitive data or action at risk, the control owner, and the evidence needed to review the control. Use the optional AI Village lab only as a safety-framed debrief reference. The goal is to reason about controls such as data/instruction separation, approval, scoped access, logging, and regression tests.
