---
title: MCP Security Basics
slug: mcp-security-basics
summary: Maps common MCP security concerns to practical design and review questions.
tracks:
  - agentic-ai-advanced-builder
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: practice
learningObjectives:
  - Identify MCP trust boundaries involving servers, scopes, tokens, resources, and tool descriptions.
  - Draft an MCP threat model that prevents token passthrough and overbroad authority.
prerequisites:
  - mcp-fundamentals
resources:
  - resource: mcp-security-best-practices
    role: required
    step: 1
    note: "Use this as the primary MCP security source for token audiences, consent, server trust, and token passthrough prohibitions."
  - resource: mcp-authorization
    role: optional
    step: 2
    note: "Use this to add authorization server, resource metadata, scopes, and token audience details."
  - resource: owasp-agentic-applications-top-10
    role: optional
    step: 3
    note: "Use this OWASP adjunct to compare MCP risks against agentic application risk categories."
  - resource: owasp-securing-agentic-applications-guide
    role: deeper
    step: 4
    note: "Use this deeper OWASP guide after the MCP threat model has concrete servers, scopes, and approval UI."
  - resource: microsoft-mcp-for-beginners-full-course
    role: deeper
    step: 5
    note: "Link-only full-course context; do not treat the compilation as the security authority."
requiredArtifact: "Agent Risk Note: MCP threat model"
securityLens: required
securityLensText: "MCP security depends on more than the model prompt. Review OAuth/resource metadata, audience-bound tokens, token passthrough prohibition, user consent UI, remote MCP server trust, and whether one component can act with another component's authority."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module turns MCP security concerns into practical review questions for builders. The curated resources help you examine OAuth/resource metadata, server trust, tool permissions, token handling, session isolation, user approval, and adjacent OWASP agentic risk categories. The full-course MCP video is linked for context only and is not embedded inline.

Your artifact is an MCP threat model for one integration. Include the remote MCP servers involved and treat them as third-party systems unless the team owns and verifies them. Record token audiences, authorization servers, scopes, user identity, and resource metadata. Prohibit token passthrough: an MCP server should not receive broad upstream tokens just because the host has them. Use audience-bound tokens for the intended resource, require user consent and review UI before sensitive tool use, and treat tool descriptions as untrusted unless they come from a trusted server. The application should enforce permissions and scope outside the model. Keep the threat model specific enough that reviewers can test confused-deputy, cross-session, and overbroad-token behavior.
