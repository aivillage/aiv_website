---
slug: aiv-eval-card-template
title: AIV Eval Card Template
provider: AI Village Learn
canonicalUrl: https://aivillage.org/learn/resources/aiv-eval-card-template/
resourceType: docs
mediaType: docs
sourcePlatform: website
modality:
  - text
targetStage: risk_evaluative_practitioner
difficulty: intermediate
tracks:
  - evals-reliability-grt
rightsMode: internal
license: AI Village Learn terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: AI Village Learn
maintenanceRisk: low
caveats: []
reviewOwner: AI Village Learn
lastChecked: "2026-06-30"
recommendedRole: required
watchFocus: Treat every field as a claim boundary, not as paperwork after the result.
checkpointPrompt: Fill every field before using the eval to support a decision.
canonicalFor:
  - eval-cards
reviewStatus: accepted
---

Use this template to document a small eval before its result is turned into a decision.

Required fields:

- Behavior tested
- System/model version
- Dataset provenance
- Dataset population/slices
- Solver configuration
- Scorer/metrics
- Run config
- Representative failures
- Limitations
- Decision supported
- Decision not supported
- Owner
- Next regression test

The card is complete only when a reviewer can reproduce the run, inspect representative samples, and see the boundary between supported and unsupported claims.
