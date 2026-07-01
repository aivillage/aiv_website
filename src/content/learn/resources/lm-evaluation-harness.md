---
slug: lm-evaluation-harness
title: Language Model Evaluation Harness
provider: EleutherAI
canonicalUrl: https://github.com/EleutherAI/lm-evaluation-harness
resourceType: repo
modality:
  - code
  - text
targetStage: risk_evaluative_practitioner
difficulty: advanced
tracks:
  - evals-reliability-grt
rightsMode: link_only
license: Repository license
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: EleutherAI
canonicalFor:
  - model-eval-harnesses
reviewStatus: accepted
maintenanceRisk: medium
caveats:
  - Rights metadata needs review before reuse beyond linking.
reviewOwner: AI Village Learn
lastChecked: "2026-06-30"
recommendedRole: required
watchFocus: Focus on when a broad evaluation harness is the right fit, how tasks are registered, and what reproducibility metadata is needed.
checkpointPrompt: Write a harness selection note that explains why this harness fits one eval goal better than Inspect Evals or Promptfoo.
---

Use this repo as a comparison point for broad benchmark-style evaluation. The AIV module asks learners to decide when a harness is the right tool, what task metadata is needed, and how the result differs from a small Inspect eval or regression suite.

The checkpoint should be a harness-selection note with fit, reproducibility needs, and claim limits. Do not treat benchmark convenience as deployment evidence by itself.
