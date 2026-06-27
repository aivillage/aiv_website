---
title: Workflows vs. Agents
slug: workflows-vs-agents
summary: Distinguishes predictable AI workflows from agents with broader autonomy and state.
tracks:
  - agentic-ai-advanced-builder
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Describe the main concepts for Workflows vs. Agents.
  - Identify the artifact or checkpoint this module supports.
prerequisites: []
resources:
  - resource: anthropic-building-effective-agents
    role: required
securityLens: required
securityLensText: "More autonomy means more ways for bad context to become bad action. Decide whether a workflow truly needs agent behavior before adding memory, tools, or independent planning."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module helps builders distinguish between structured AI workflows and agentic systems. The curated resources clarify when a fixed sequence, human-in-the-loop process, or limited tool call is enough, and when autonomous planning adds value. Your artifact is a decision note comparing a workflow design and an agent design for the same task, including benefits, risks, and review points. Use the module responsibly by preferring the simplest design that meets the need. Agents can be useful, but they also expand the importance of credentials, logging, approval gates, and containment. This module sets up later agent-specific design decisions. Keep the decision note available as the design changes so autonomy is added deliberately, not by drift.
