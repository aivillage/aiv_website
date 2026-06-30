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
  - Identify where an agentic workflow needs approval gates, containment, rollback, or stop conditions.
  - Create an approval matrix plus containment policy for one bounded workflow.
prerequisites:
  - agentic-rag
resources:
  - resource: langchain-human-in-the-loop
    role: required
    step: 1
    note: "Use this as one implementation reference for approval gates, then generalize the pattern beyond LangChain."
  - resource: langchain-introduction-to-langgraph
    role: optional
    step: 2
    note: "Use this as optional graph-workflow context, not as the default worldview."
  - resource: mcp-spec-2025-11-25
    role: deeper
    step: 3
    note: "Use this to connect approval and containment decisions to protocol boundaries and tool authority."
labs:
  - email-indirect
requiredArtifact: "Agent Risk Note: approval and containment policy"
securityLens: required
securityLensText: "Approval gates only work when the human sees the right decision context. Show the requested action, source evidence, affected data, and rollback or cancellation options before approval."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module focuses on containment and human approval for AI systems that can take action. LangChain and LangGraph provide concrete implementation references, but the pattern generalizes beyond any one framework: approval, containment, recoverability, and logging must be designed into the workflow.

Your artifact is an approval matrix plus containment policy. Name actions that are automatic, actions that require approval, actions that are never allowed, rollback paths, kill-switch owner, log evidence, and containment boundaries for tools, memory, retrieval, and MCP servers. Use the module responsibly by making approval meaningful. A reviewer should see what will happen, why the system recommends it, what data or account is affected, and how to stop or reverse the action. Containment keeps mistakes small enough to learn from safely.
