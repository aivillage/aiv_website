---
title: Human Approval and Containment
slug: human-approval-containment
summary: Designs approval gates and containment around agents, tools, and high-impact actions.
tracks:
  - agentic-ai-advanced-builder
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Describe the main concepts for Human Approval and Containment.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - mcp-security-basics
resources:
  - resource: anthropic-building-effective-agents
    role: required
requiredArtifact: Human Approval Containment artifact
securityLens: required
securityLensText: "Approval gates only work when the human sees the right decision context. Show the requested action, source evidence, affected data, and rollback or cancellation options before approval."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module focuses on containment and human approval for AI systems that can take action. The curated resources support decisions about when to require confirmation, what context to show, and how to limit side effects. Your artifact is a human approval plan for one workflow, naming actions that are automatic, actions that require approval, and actions that are never allowed. Use the module responsibly by making approval meaningful. A reviewer should see what will happen, why the system recommends it, what data or account is affected, and how to stop or reverse the action. Containment keeps mistakes small enough to learn from safely.
