---
title: Agent Evals
slug: agent-evals
summary: Scopes agent evaluations around observable environment behavior, tool use, state, and reproducible traces.
tracks:
  - evals-reliability-grt
stageStart: builder
stageEnd: specialist_contributor
difficulty: advanced
moduleType: practice
learningObjectives:
  - Define the environment boundary, tools, state, and evidence needed for an agent eval.
  - Write an agent eval environment note that avoids uncontrolled demos and unsupported security claims.
prerequisites:
  - model-eval-harnesses
resources:
  - resource: inspect-ai-agents
    role: required
    step: 1
    note: "Use this as the primary Inspect-specific resource for agent environments and traces."
  - resource: agentdojo
    role: deeper
    step: 2
    note: "Use this only as human-review benchmark context, not as a required or core track resource."
requiredArtifact: Agent eval environment note
securityLens: required
securityLensText: "Agent evals can hide risk in tool permissions, environment state, prompt injection paths, and side effects. Scope the environment, log actions, and avoid claims that the trace cannot support."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module adds a scoped agent eval path without creating a separate GRT or agent-security benchmark track. Learners focus on the environment boundary: what tools exist, what state carries across steps, what actions are allowed, what evidence is logged, and what side effects are impossible or out of scope.

Your artifact is an agent eval environment note. It should name the task, tools, permissions, state, observation surface, log evidence, stop condition, and limitation. Use the module responsibly by separating an agent demonstration from an evaluation claim. Agent-security benchmark material remains optional and human-review until it is explicitly accepted for core use.
