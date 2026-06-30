---
title: Sensitive Information Disclosure
slug: sensitive-information-disclosure
summary: Reviews where AI systems can expose sensitive data through prompts, retrieval, tools, logs, or outputs.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Identify sensitive data exposure paths across model inputs, context, retrieval, tools, logs, and outputs.
  - Write a disclosure-risk review entry with data class, exposure path, control, and evidence.
prerequisites:
  - prompt-injection
resources:
  - resource: owasp-llm02-sensitive-information-disclosure
    role: required
    step: 1
    note: "Use this official OWASP page as the primary disclosure-risk source."
requiredArtifact: Sensitive data disclosure review entry
securityLens: primary
securityLensText: "Disclosure review should trace where sensitive data enters, persists, is retrieved, appears in logs, or leaves through output. Treat model context as exposure surface, not secure storage."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module uses the official OWASP LLM02 page to focus on sensitive information disclosure. Learners trace sensitive data through the application rather than treating the model as a black box.

Your artifact is a disclosure-risk review entry. It should name the data class, where the data enters the AI system, where it can persist or be logged, which outputs or tools could expose it, which control applies, and what evidence a reviewer would need. Use the module defensively by connecting each exposure path to an owner and a review decision.
