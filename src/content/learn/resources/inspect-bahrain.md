---
slug: inspect-bahrain
title: inspect-bahrain
provider: AI Village
canonicalUrl: https://github.com/aivillage/inspect-bahrain
resourceType: repo
modality:
  - code
  - text
targetStage: risk_evaluative_practitioner
difficulty: intermediate
tracks:
  - defensive-ai-engineering
  - evals-reliability-grt
rightsMode: link_only
license: Repository license
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: AI Village
canonicalFor:
  - defensive-evals
  - running-inspect-eval
reviewStatus: accepted
maintenanceRisk: medium
caveats:
  - Rights metadata needs review before reuse beyond linking.
reviewOwner: AI Village Learn
lastChecked: "2026-06-30"
recommendedRole: required
watchFocus: Use the repo as the lab-backed anchor for creating a small Inspect eval package and capturing run evidence.
checkpointPrompt: Record the task, dataset, solver, scorer, model, run config, result, and limitation fields from your run.
---

Use this repo as the lab-backed anchor for a small Inspect eval package. In AIV Learn it is valuable because it gives learners a concrete place to capture task, dataset, solver, scorer, run configuration, result, and limitation evidence.

The checkpoint should leave an auditable run note, not just a passing command. Do not generalize beyond the task and samples actually inspected.
