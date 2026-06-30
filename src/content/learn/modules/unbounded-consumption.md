---
title: Unbounded Consumption
slug: unbounded-consumption
summary: Reviews cost, quota, recursion, rate-limit, and availability risks in AI workloads.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: concept
learningObjectives:
  - Identify unbounded consumption risks across prompts, loops, agents, retrieval, tool calls, and hosted model usage.
  - Write a consumption-control entry with limit, owner, alert, fallback, and review evidence.
prerequisites:
  - misinformation
resources:
  - resource: owasp-llm10-unbounded-consumption
    role: required
    step: 1
    note: "Use this official OWASP page for cost, quota, recursion, and availability controls."
requiredArtifact: Consumption-control review entry
securityLens: primary
securityLensText: "Consumption controls are security controls when model calls, loops, retrieval, and tools can create cost, availability, or abuse risk. Name budgets, limits, alerts, owners, and fallback decisions."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module splits unbounded consumption out of the previous combined placeholder so learners can review operational limits directly. The focus is model-call cost, prompt size, recursive workflows, retrieval fanout, tool-call loops, quota exhaustion, and availability impact.

Your artifact is a consumption-control review entry. It should name the consumption trigger, budget or quota, rate limit, recursion or loop guard, owner, alert, fallback decision, and review evidence. Use the module defensively by treating cost and availability limits as part of the AI security design, not as a later operations detail.
