---
title: MITRE ATLAS Mapping
slug: mitre-atlas-mapping
summary: Uses MITRE ATLAS as a vocabulary for organizing AI security observations and controls.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: concept
learningObjectives:
  - Use ATLAS terminology to organize AI security concerns without overclaiming coverage.
  - Write an ATLAS mapping note that ties one concern to evidence or controls.
prerequisites:
  - unbounded-consumption
resources:
  - resource: mitre-atlas
    role: required
    step: 1
    note: "Use this as the primary vocabulary source for conservative AI security mapping."
  - resource: mitre-atlas-data
    role: optional
    step: 2
    note: "Use this only to verify official ATLAS names or IDs before including them in a note."
requiredArtifact: ATLAS mapping note
securityLens: primary
securityLensText: "A mapping is not proof of coverage. Use ATLAS terminology to organize review, then connect each concern to evidence, controls, and system-specific decisions."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module keeps AI security mapping at an orientation level. The curated resources introduce MITRE ATLAS as a vocabulary for describing adversary behavior and security observations in AI systems. The optional ATLAS data resource is for verification only.

Your artifact is a short mapping note that connects one AI system concern to relevant ATLAS concepts, then names what evidence or control would be needed for review. Use the module responsibly by treating mappings as a shared language, not as a checklist that proves safety. Do not invent ATLAS identifiers. If only a name is verified, use the name and mark any ID for review.
