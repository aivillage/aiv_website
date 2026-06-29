---
title: MCP Fundamentals
slug: mcp-fundamentals
summary: Introduces MCP as a way to connect AI systems to tools, data, and local services.
tracks:
  - agentic-ai-advanced-builder
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: practice
learningObjectives:
  - Describe the main concepts for MCP Fundamentals.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - agent-observability-evals
resources:
  - resource: mcp-introduction
    role: required
  - resource: microsoft-mcp-introduction
    role: optional
  - resource: mcp-spec-2025-11-25
    role: deeper
requiredArtifact: Protocol boundary diagram
securityLens: required
securityLensText: "MCP connects AI systems to real tools and data. Design for confused deputy risk, token passthrough risk, session boundaries, and local-server exposure."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module introduces the Model Context Protocol as a pattern for connecting AI applications to tools and data sources. The curated resources explain the host, client, server, tools, resources, authorization server, and user consent path. The spec resource is pinned to the 2025-11-25 version so learners can notice version drift.

Your artifact is a protocol boundary diagram. Name the host, client, MCP server, exposed tools and resources, authorization server, credential boundary, user consent step, and logs. Use the module responsibly by treating MCP as an integration boundary, not just a convenience layer. Local and remote servers, credentials, and tool descriptions can all affect what the AI system can do. Keep scope narrow, document trust assumptions, and review what is exposed before connecting sensitive workflows.
