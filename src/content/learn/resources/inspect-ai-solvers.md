---
slug: inspect-ai-solvers
title: Inspect Solvers
provider: UK AI Security Institute
canonicalUrl: https://inspect.aisi.org.uk/solvers.html
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
  - code
targetStage: risk_evaluative_practitioner
difficulty: intermediate
tracks:
  - evals-reliability-grt
rightsMode: link_only
license: Inspect AI documentation license and site terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: UK AI Security Institute
maintenanceRisk: low
caveats: []
reviewOwner: AI Village Learn
lastChecked: "2026-06-30"
recommendedRole: required
watchFocus: Track the exact prompt, model call, tool use, and control flow that the solver introduces.
checkpointPrompt: Record the solver settings that would have to stay fixed for a fair rerun.
canonicalFor:
  - custom-solvers-scoring
  - inspect-dataset-solver-scorer
  - red-team-the-eval
reviewStatus: accepted
---

Use the solver docs to identify what the eval actually asks the model to do and which settings shape the answer path.
