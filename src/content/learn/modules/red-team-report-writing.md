---
title: Red-Team Report Writing
slug: red-team-report-writing
summary: Focuses on clear, defensive reporting from authorized AI security exercises.
tracks:
  - offensive-ai-security-red-teaming
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
difficulty: advanced
moduleType: capstone
learningObjectives:
  - Structure authorized findings with scope, evidence, impact, assumptions, and remediation.
  - Draft a red-team report that minimizes sensitive detail while supporting defensive action.
prerequisites:
  - agent-abuse-intro
resources:
  - resource: aiv-red-team-report-template
    role: required
    step: 1
    note: "Use this AIV template to keep report writing defensive, scoped, and disclosure-safe."
requiredArtifact: Red-team report draft
securityLens: primary
securityLensText: "A red-team report should help defenders reproduce, prioritize, and fix issues without spreading unnecessary operational detail. Keep evidence, impact, scope, and remediation clear."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module is a low-risk public anchor for turning authorized AI security work into useful defensive communication. It focuses on reporting structure rather than exploit instruction. The required AIV template supports findings that include title, scope, environment, steps summarized safely, evidence, impact, OWASP mapping, conservative ATLAS mapping where appropriate, deterministic mitigation, regression test, and disclosure boundary.

Your artifact is a red-team report draft for a controlled or hypothetical exercise, with sensitive details minimized to what defenders need. Use the module responsibly by honoring the rules of engagement, avoiding public disclosure of unreviewed issues, and separating confirmed observations from speculation. A good report helps teams understand and reduce risk without encouraging unsafe replication outside the authorized setting.
