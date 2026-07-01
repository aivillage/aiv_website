---
slug: mcp-security-best-practices
title: MCP Security Best Practices
provider: Model Context Protocol
canonicalUrl: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
targetStage: risk_evaluative_practitioner
difficulty: advanced
tracks:
  - agentic-ai-advanced-builder
  - ai-security-core
  - defensive-ai-engineering
rightsMode: link_only
license: MCP documentation terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: Model Context Protocol
watchFocus: Focus on OAuth/resource metadata, token audiences, user consent, server trust, and the prohibition on token passthrough.
checkpointPrompt: Draft an MCP threat model that names the remote MCP server, token audience, scopes, consent UI, and confused-deputy tests.
canonicalFor:
  - mcp-security-basics
  - secure-agents
  - secure-tool-use
reviewStatus: accepted
maintenanceRisk: medium
caveats:
  - Security guidance may change as MCP implementations mature; re-check before applying to a production integration.
reviewOwner: AI Village Learn
lastChecked: "2026-06-26"
---

Use this source when the MCP threat model moves from roles to controls. The AIV focus is token audience, resource metadata, user consent, server trust, authorization boundaries, and avoiding confused-deputy behavior.

The checkpoint should turn one best practice into a testable threat-model row. Do not treat the checklist as complete coverage for every remote server or tool capability.
