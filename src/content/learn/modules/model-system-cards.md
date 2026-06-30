---
title: Model and System Cards
slug: model-system-cards
summary: Critique a model or system card as evidence for scope, limitations, risks, and review decisions.
tracks:
  - governance-responsible-use
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intro
moduleType: capstone
learningObjectives:
  - Identify the core claims, evidence, limitations, and omissions in a model or system card.
  - Distinguish documentation evidence from marketing, compliance, or safety certification.
  - Produce a model/system card critique for one AI system.
prerequisites:
  - responsible-ai-use
resources:
  - resource: model-cards-for-model-reporting
    role: required
    step: 1
    note: "Use the model cards paper as the required primary source for documentation structure and intent."
  - resource: openai-gpt-4o-system-card
    role: optional
    step: 2
    note: "Use this as one official system-card example to critique, not as a universal template."
requiredArtifact: Model/system card critique
securityLens: awareness
securityLensText: "Card review should ask what claims are supported, what risks and limits are disclosed, which user groups are represented, and what decisions the card cannot support."
status: draft
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This draft module treats model and system cards as evidence artifacts. A useful card names intended use, out-of-scope use, evaluation evidence, known limitations, affected users, safety or security considerations, and update cadence. A weak card hides uncertainty, omits important slices, or turns a narrow evaluation into a broad claim.

Your artifact is a model/system card critique. Include the card being reviewed, the claims it makes, the evidence behind those claims, missing stakeholder or risk coverage, limitations, update questions, and one decision the card should not be used to support. Do not treat a card as legal certification or proof that a system is safe.
