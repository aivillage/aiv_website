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
  - Explain how goals, loops, tools, memory, and stopping conditions shape an agent.
  - Sketch a core agent loop with the controls a reviewer should inspect.
prerequisites:
  - workflows-vs-agents
resources:
  - resource: huggingface-agents-course-what-is-an-agent
    role: required
    step: 1
    note: "Use this direct Unit 1 concept page to define goals, tools, actions, observations, and stopping conditions."
  - resource: microsoft-ai-agents-what-are-ai-agents
    role: optional
    step: 2
    note: "Use this as the single featured video companion for agent-loop vocabulary."
  - resource: huggingface-agents-course-thought-action-observation
    role: deeper
    step: 3
    note: "Use this to add thought-action-observation loop details after the core diagram is drafted."
requiredArtifact: "Agent Risk Note: core agent loop"
securityLens: required
securityLensText: "Agent autonomy turns bad context into bad action. Agents need scoped credentials, audit logs, approval gates, and containment before they operate on meaningful data or systems."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces the core agent loop: a user goal enters an environment, a model chooses a next step, tools or retrieval may change state, memory may persist context, and the loop stops when a condition is met or a human intervenes. The curated resources help you distinguish this loop from a single model call or fixed workflow.

Your artifact is a core agent loop diagram. Include the model, tool inventory, state and memory classes, environment, stop condition, approval gates, and logs. Use the module responsibly by designing limits before adding capability. An agent should not receive broad credentials, persistent memory, or open-ended tools by default. Start with constrained tasks, visible logs, and clear human review for side effects.
