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
  - Decide when a predictable workflow is enough and when agent autonomy adds justified value.
  - Write a workflow-vs-agent decision memo that records new risks from tools, state, memory, and side effects.
prerequisites: []
resources:
  - resource: anthropic-building-effective-agents
    role: required
  - resource: fsdl-augmented-language-models
    role: optional
requiredArtifact: "Agent Risk Note: workflow-vs-agent decision"
securityLens: required
securityLensText: "More autonomy means more ways for bad context to become bad action. Decide whether a workflow truly needs agent behavior before adding memory, tools, or independent planning."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module starts with least-agency design. Use the written source to decide whether a fixed workflow, human-in-the-loop process, limited tool call, or agent loop is justified for a real user goal. The FSDL video is concept scaffolding for augmented language models, not a current implementation reference.

Your artifact is a workflow-vs-agent decision memo. It should name the user goal, describe the simplest workflow that could solve it, explain what complexity would justify an agent, and list the extra risks introduced by tools, state, memory, retrieval, and side effects. Use the module responsibly by preferring the simplest design that meets the need. Agents can be useful, but they also expand the importance of credentials, logging, approval gates, rollback, and containment. Keep the memo available as the design changes so autonomy is added deliberately, not by drift.
