---
slug: mcp-introduction
title: MCP Introduction
provider: Model Context Protocol
canonicalUrl: https://modelcontextprotocol.io/docs/getting-started/intro
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
  - code
targetStage: builder
difficulty: intermediate
tracks:
  - agentic-ai-advanced-builder
rightsMode: link_only
license: MCP documentation terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: Model Context Protocol
recommendedRole: required
watchFocus: Focus on host, client, server, tools, resources, authorization server, user consent, and the protocol boundary.
checkpointPrompt: Draw a protocol boundary diagram that names the host, client, MCP server, auth server, scopes, tools, resources, and consent step.
maintenanceRisk: low
caveats:
  - MCP documentation evolves; re-check terms and concepts before implementation work.
reviewOwner: AI Village Learn
lastChecked: "2026-06-28"
canonicalFor:
  - mcp-fundamentals
reviewStatus: accepted
status: beta
---

Use this introduction to establish MCP roles and boundaries before security details are added: host, client, server, tools, resources, authorization server, scopes, and consent. In AIV Learn it supports a protocol-boundary diagram.

The checkpoint should separate protocol vocabulary from trust decisions. Do not assume MCP makes a tool safe; the later threat model still needs token audience, server trust, consent UI, and containment checks.
