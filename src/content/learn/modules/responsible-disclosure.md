---
title: Responsible Disclosure
slug: responsible-disclosure
summary: Decide whether an AI issue is a vulnerability, model flaw, policy issue, or content-quality report before choosing a disclosure path.
tracks:
  - governance-responsible-use
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Distinguish coordinated vulnerability disclosure from model behavior, content quality, policy, and safety reports.
  - Identify the owner, evidence, impact, confidentiality boundary, and next action for one report.
  - Produce a disclosure decision note without creating an AIV-specific policy commitment.
prerequisites:
  - model-system-cards
resources:
  - resource: cisa-coordinated-vulnerability-disclosure-program
    role: required
    step: 1
    note: "Use CISA's CVD program page as the required public-sector disclosure reference."
  - resource: cert-guide-to-cvd
    role: optional
    step: 2
    note: "Use CERT's guide as deeper support for coordination roles, process, and terminology."
requiredArtifact: Disclosure decision note
securityLens: awareness
securityLensText: "Disclosure review should classify the issue, protect sensitive evidence, identify the affected party, and avoid publishing exploit details or AIV-specific policy commitments before human review."
status: draft
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This draft module separates disclosure categories before choosing a path. Some findings are security vulnerabilities. Others are model flaws, policy concerns, safety reports, content-quality issues, or documentation gaps. The right evidence, owner, timeline, and confidentiality boundary depend on that classification.

Your artifact is a disclosure decision note. Include issue type, affected system or model, evidence summary, potential impact, owner or recipient, confidentiality boundary, proposed next step, unresolved questions, and why the chosen path fits. AIV-specific disclosure, remediation, rights, and escalation commitments require human review and are not finalized in this draft.
