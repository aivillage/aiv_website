---
title: Misinformation
slug: misinformation
summary: Reviews unsupported or misleading model claims as a provenance, uncertainty, and decision-risk problem.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: concept
learningObjectives:
  - Identify misinformation risks from unsupported claims, weak provenance, stale retrieval, missing uncertainty, and decision impact.
  - Write a misinformation review entry with claim, source requirement, control, unsupported decision, and owner.
prerequisites:
  - system-prompt-leakage
resources:
  - resource: owasp-llm09-misinformation
    role: required
    step: 1
    note: "Use this official OWASP page for misinformation risk framing."
requiredArtifact: Misinformation review entry
securityLens: primary
securityLensText: "Misinformation review should connect unsupported claims to source requirements, uncertainty, citations, decision impact, and owner review. Do not treat fluent output as evidence."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module splits misinformation out of the previous combined placeholder so learners can review claim quality separately from cost and consumption controls. The focus is provenance, uncertainty, source quality, and the downstream decision that could be harmed by unsupported output.

Your artifact is a misinformation review entry. It should name the claim, expected source or evidence requirement, current support level, uncertainty signal, review control, owner, and the decision the output should not support. Use the module defensively by requiring evidence before model output becomes advice, policy, or operational direction.
