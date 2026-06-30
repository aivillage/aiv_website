---
title: System Prompt Leakage
slug: system-prompt-leakage
summary: Reviews why system prompts are not secure storage or enforceable access controls.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: concept
learningObjectives:
  - Explain system prompt leakage as a design risk for prompt-resident secrets, policies, and hidden behavior.
  - Write a prompt-leakage review entry with sensitive prompt content, replacement control, and regression test.
prerequisites:
  - rag-poisoning-risk
resources:
  - resource: owasp-llm07-system-prompt-leakage
    role: required
    step: 1
    note: "Use this official OWASP page for system prompt leakage framing."
labs:
  - prompt-extraction
requiredArtifact: System prompt leakage review entry
securityLens: primary
securityLensText: "Prompts are not secure storage. Review prompt-resident secrets, hidden policies, sensitive examples, and controls that must move outside model context."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module uses the official OWASP LLM07 page to review system prompt leakage. Learners focus on the design mistake of placing secrets, sensitive policies, or access-control assumptions inside model context.

Your artifact is a system prompt leakage review entry. It should name the prompt-resident sensitive content or policy, why it should not be treated as a boundary, the replacement control, the owner, and a regression test. The AI Village prompt-extraction lab is optional debrief context only, not a required walkthrough.
