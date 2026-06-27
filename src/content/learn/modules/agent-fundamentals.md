---
title: Agent Fundamentals
slug: agent-fundamentals
summary: Introduces agent loops, goals, tools, memory, and the controls needed around them.
tracks:
  - agentic-ai-advanced-builder
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: practice
learningObjectives:
  - Describe the main concepts for Agent Fundamentals.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - workflows-vs-agents
resources:
  - resource: huggingface-agents-course
    role: required
securityLens: required
securityLensText: "Agent autonomy turns bad context into bad action. Agents need scoped credentials, audit logs, approval gates, and containment before they operate on meaningful data or systems."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces the core parts of an agent: goal, planning loop, model, tools, memory, state, and stopping conditions. The curated resources help you understand what makes an agent different from a single model call or fixed workflow. Your artifact is an agent boundary map that names the agent's allowed task, tools, data, credentials, human approvals, and stop conditions. Use the module responsibly by designing limits before adding capability. An agent should not receive broad credentials, persistent memory, or open-ended tools by default. Start with constrained tasks, visible logs, and clear human review for side effects. Keep the boundary map small enough for another reviewer to challenge assumptions about autonomy, access, and stopping conditions.
