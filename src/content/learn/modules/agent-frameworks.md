---
title: Agent Frameworks
slug: agent-frameworks
summary: Helps builders compare agent frameworks through boundaries, control points, and fit.
tracks:
  - agentic-ai-advanced-builder
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Describe the main concepts for Agent Frameworks.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - agent-fundamentals
resources:
  - resource: huggingface-agents-course-unit-2
    role: required
  - resource: microsoft-ai-agents-framework-selection
    role: optional
  - resource: anthropic-building-effective-agents
    role: deeper
requiredArtifact: Framework ADR
securityLens: required
securityLensText: "Framework defaults can hide important decisions about memory, tool execution, retries, and logging. Review framework behavior before trusting an agent built from examples."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module helps builders evaluate agent frameworks without turning the lesson into a framework ranking. Treat framework choice as a debug, control, and maintenance decision: what behavior can you inspect, constrain, test, and override when an agent loop behaves badly?

Your artifact is a framework ADR for one real use case. It should name the candidate framework, the control points it provides, the assumptions it makes, how it handles credentials, tool errors, retries, human approval, logging, and state, and why the team accepts those tradeoffs. A framework can speed up development, but the application team still owns the boundaries, review process, and deployment decisions.
