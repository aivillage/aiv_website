---
title: AI Supply Chain
slug: ai-supply-chain
summary: Frames AI supply-chain review around models, datasets, packages, prompts, and integrations.
tracks:
  - ai-security-core
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Describe the main concepts for AI Supply Chain.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - sensitive-information-disclosure
resources:
  - resource: owasp-llm-top-10-2025
    role: required
securityLens: primary
securityLensText: "AI supply chains include more than software packages. Review model sources, datasets, weights, prompts, plugins, tools, and external services before depending on them."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module is a public anchor for reviewing the AI supply chain at a high level. It helps learners identify the components that enter an AI system: models, datasets, prompts, packages, notebooks, evals, tools, and hosted services. The curated resources support a practical inventory rather than a deep assurance claim. Your artifact is a supply-chain checklist for one AI workflow, listing the components, source, license or rights note, update path, and review owner. Use the module responsibly by focusing on traceability and decision evidence. A component should not become trusted just because it is popular or easy to install. Record assumptions and escalate unresolved license, provenance, or maintenance questions.
