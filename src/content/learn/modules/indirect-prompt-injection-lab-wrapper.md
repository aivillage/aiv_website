---
title: Indirect Prompt Injection Lab Wrapper
slug: indirect-prompt-injection-lab-wrapper
summary: Wraps the AIV email-indirect toy lab with untrusted-content, data-boundary, and debrief framing.
tracks:
  - offensive-ai-security-red-teaming
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
difficulty: intermediate
moduleType: lab
learningObjectives:
  - Review indirect prompt injection through an authorized AIV toy lab with untrusted external content.
  - Write a finding card or control-gap map for the untrusted-content path and tool/data boundary.
prerequisites:
  - prompt-extraction-lab-wrapper
resources:
  - resource: owasp-llm01-prompt-injection
    role: required
    step: 1
    note: "Use this official OWASP page as the required indirect prompt-injection risk frame."
  - resource: owasp-llm02-sensitive-information-disclosure
    role: optional
    step: 2
    note: "Use this when the debrief includes sensitive data exposure or disclosure controls."
labs:
  - email-indirect
requiredArtifact: Indirect injection finding card/control gap map
securityLens: primary
securityLensText: "Indirect prompt injection review should name the untrusted content path, the sensitive data or tool boundary, the approval point, and the logs needed for review. Keep the lab fixture toy-only."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module exposes the AIV email-indirect lab only as an authorized toy-lab wrapper. Learners study how untrusted external content can influence model-mediated access to data, then translate the observation into controls.

Your artifact is an indirect injection finding card or control-gap map. It should name the lab boundary, untrusted content source, sensitive data or tool/data boundary, observed failure category, missing control, evidence, deterministic mitigation, and regression test. Do not include reusable prompts, step-by-step exploitation instructions, or real-target guidance.
