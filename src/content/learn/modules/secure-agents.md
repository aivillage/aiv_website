---
title: Secure Agents
slug: secure-agents
summary: Contain agent planning, memory, tool access, approvals, and escalation paths before allowing autonomous work.
tracks:
  - defensive-ai-engineering
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Identify where planning loops, memory, tools, and user delegation expand blast radius.
  - Define runtime containment, approval, and escalation controls for a small agent.
  - Produce an agent containment and escalation matrix.
prerequisites:
  - secure-tool-use
resources:
  - resource: owasp-agentic-applications-top-10
    role: required
    step: 1
    note: "Use this as the required risk taxonomy for agentic application behavior."
  - resource: mcp-security-best-practices
    role: optional
    step: 2
    note: "Use this when the agent reaches MCP servers or other delegated tools."
  - resource: owasp-securing-agentic-applications-guide
    role: deeper
    step: 3
    note: "Use this as deeper guidance after the agent's concrete tools, memory, and escalation paths are named."
labs:
  - email-indirect
  - prompt-extraction
requiredArtifact: Agent runtime containment and escalation matrix
securityLens: primary
securityLensText: "Agent security depends on bounding loops, memory, delegated tools, user data, and escalation paths. Make the runtime fail closed when authority, confidence, or evidence is missing."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module treats agents as software systems with expanded authority, not as a separate trust category. A secure agent design should name the task boundary, allowed tools, memory sources, sensitive data, loop limit, approval points, escalation path, and audit trail. The design should also name what the agent must refuse or hand to a human.

Use Email Indirect Prompt Injection and Prompt Extraction as bounded reminders of how untrusted content and prompt-resident assumptions can shape behavior. Transfer the lesson to agent runtime policy: untrusted content should not rewrite authority, hidden instructions should not hold secrets, and sensitive actions should require application-enforced checks.

The artifact is an agent runtime containment and escalation matrix. Include the allowed task class, prohibited task class, tool boundaries, memory retention rule, approval gates, stop conditions, escalation triggers, log fields, and one regression test for untrusted content influencing an agent decision.
