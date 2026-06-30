---
title: Improper Output Handling
slug: improper-output-handling
summary: Reviews how model output crosses into rendered UI, code, tools, decisions, and other trusted systems.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Identify downstream trust boundaries where model output can trigger rendering, execution, decisions, or tool actions.
  - Write an output-handling control entry with validation owner, failure mode, and review evidence.
prerequisites:
  - sensitive-information-disclosure
resources:
  - resource: owasp-llm05-improper-output-handling
    role: required
    step: 1
    note: "Use this official OWASP page for output validation and downstream trust-boundary review."
requiredArtifact: Output-handling control entry
securityLens: primary
securityLensText: "Model output should not become trusted code, markup, policy, or action without validation. Review the destination, validation point, owner, and evidence for failure handling."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module moves earlier in the AI Security Core sequence because output handling is the boundary where model text can affect users, applications, and tools. Learners review how outputs are rendered, stored, transformed, executed, or used in decisions.

Your artifact is an output-handling control entry. It should name the output destination, the trust boundary crossed, the validation or sanitization control, the owner, the failure mode, and the evidence needed for review. Use the module defensively by treating model output as untrusted until a downstream system has handled it safely.
