---
title: Excessive Agency
slug: excessive-agency
summary: Reviews tool authority, approval, containment, and logging for AI systems that can take actions.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: concept
learningObjectives:
  - Identify where model-mediated workflows have too much authority, autonomy, or access.
  - Write an agency-boundary review entry with allowed action, approval point, containment control, and log evidence.
prerequisites:
  - improper-output-handling
resources:
  - resource: owasp-llm06-excessive-agency
    role: required
    step: 1
    note: "Use this official OWASP page for authority, autonomy, approval, and containment review."
  - resource: owasp-agentic-applications-top-10
    role: deeper
    step: 2
    note: "Use this only as optional agentic-application context after the LLM06 entry is scoped."
requiredArtifact: Agency-boundary review entry
securityLens: primary
securityLensText: "Excessive-agency review should ask what actions the system can take, who approves them, how they are scoped, how they can be reversed, and what logs support review."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module sits near the output and tool boundary. Learners review whether a model-mediated workflow can read, write, send, delete, purchase, deploy, or otherwise affect systems without enough scoping and approval.

Your artifact is an agency-boundary review entry. It should name the allowed action, the tool or integration, the authority boundary, the approval point, the containment control, the logging evidence, and the owner. Use the module defensively by preferring least privilege, human approval for sensitive actions, reversible operations, and clear escalation paths.
