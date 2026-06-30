---
title: NIST AI RMF and GenAI Profile
slug: nist-ai-rmf-genai-profile
summary: Connects NIST AI RMF and GenAI Profile concepts to reviewable AI system decisions.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: advanced
moduleType: concept
learningObjectives:
  - Map one AI use case to NIST AI RMF and GenAI Profile concepts without claiming compliance.
  - Create a governance evidence map naming owners, controls, and review evidence.
prerequisites:
  - mitre-atlas-mapping
resources:
  - resource: nist-ai-rmf
    role: required
    step: 1
    note: "Use this as the primary risk-management framework source."
  - resource: nist-genai-profile
    role: required
    step: 2
    note: "Use this as the GenAI-specific companion to the AI RMF."
  - resource: nist-ai-rmf-playbook
    role: optional
    step: 3
    note: "Use this to translate framework language into evidence, controls, owners, and review actions."
requiredArtifact: Governance evidence map
securityLens: primary
securityLensText: "A risk framework is only useful if it maps to controls, owners, evidence, and review decisions. Use framework language to make accountability clearer, not to decorate a document."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module introduces NIST AI RMF and the GenAI Profile as tools for organizing risk discussions. The curated resources help learners understand functions such as Govern, Map, Measure, and Manage without claiming that a short module creates compliance. The playbook is optional support for turning framework language into evidence and owner fields.

Your artifact is a governance evidence map that maps one AI use case to framework language, identifies owners, and names evidence that would support a decision. Use the module responsibly by keeping the framework tied to action. A framework reference should lead to controls, review cadence, documentation, or a decision to defer. Treat unresolved risks as open decisions rather than polished assurances.
