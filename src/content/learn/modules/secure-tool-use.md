---
title: Secure Tool Use
slug: secure-tool-use
summary: Build a tool trust policy for scopes, authorization, approvals, side effects, and audit evidence.
tracks:
  - defensive-ai-engineering
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Distinguish model suggestions from application-enforced tool authorization.
  - Define approval gates for sensitive reads, writes, purchases, messages, and external side effects.
  - Produce a tool trust policy and approval matrix for a small AI app.
prerequisites:
  - secure-rag
resources:
  - resource: mcp-security-best-practices
    role: required
    step: 1
    note: "Use this as the required security baseline for scopes, consent, token audience, and server trust."
  - resource: mcp-authorization
    role: optional
    step: 2
    note: "Use this to deepen authorization-server, scope, resource metadata, and token-audience decisions."
  - resource: openai-function-calling
    role: optional
    step: 3
    note: "Use implementation docs only after the app has its own authorization and approval policy."
  - resource: owasp-agentic-applications-top-10
    role: optional
    step: 4
    note: "Use this as a broader risk checklist for tool and agentic application behavior."
labs:
  - email-indirect
requiredArtifact: Tool trust policy and approval matrix
securityLens: primary
securityLensText: "Tool use is safe only when the application enforces identity, scopes, approval gates, side-effect limits, and audit logs outside the model response. Do not let model text become authorization."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module focuses on the handoff from model output to application action. A tool call should be checked by code that knows the user, the requested action, the data being accessed, the side effect, and the approval state. The model can propose an action, but it should not be the authority that decides whether the action is allowed.

Use the Email Indirect Prompt Injection lab as a bounded review anchor. The lab shows how untrusted content can influence model-mediated handling of sensitive information. Your tool policy should identify which reads or writes require explicit approval, which data can be summarized, which actions are blocked, and what audit event is recorded.

The artifact is a tool trust policy and approval matrix. Include tool name, purpose, data classes, allowed users, scopes, approval requirement, side-effect limit, denial behavior, log fields, and one regression test for untrusted content attempting to trigger or influence a sensitive action.
