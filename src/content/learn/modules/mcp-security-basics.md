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
  - Describe the main concepts for MCP Security Basics.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - mcp-fundamentals
resources:
  - resource: mcp-security-best-practices
    role: required
  - resource: mcp-authorization
    role: optional
  - resource: microsoft-mcp-for-beginners-full-course
    role: deeper
requiredArtifact: MCP threat model
securityLens: required
securityLensText: "MCP security depends on more than the model prompt. Review OAuth/resource metadata, audience-bound tokens, token passthrough prohibition, user consent UI, remote MCP server trust, and whether one component can act with another component's authority."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module turns MCP security concerns into practical review questions for builders. The curated resources help you examine OAuth/resource metadata, server trust, tool permissions, token handling, session isolation, and user approval. The full-course MCP video is linked for context only and is not embedded inline.

Your artifact is an MCP threat model for one integration. Include the remote MCP servers involved and treat them as third-party systems unless the team owns and verifies them. Record token audiences, authorization servers, scopes, user identity, and resource metadata. Prohibit token passthrough: an MCP server should not receive broad upstream tokens just because the host has them. Use audience-bound tokens for the intended resource, require user consent and review UI before sensitive tool use, and treat tool descriptions as untrusted unless they come from a trusted server. The application should enforce permissions and scope outside the model. Keep the threat model specific enough that reviewers can test confused-deputy, cross-session, and overbroad-token behavior.
