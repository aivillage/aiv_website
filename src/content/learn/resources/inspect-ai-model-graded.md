---
slug: inspect-ai-model-graded
title: Inspect Model Grading
provider: UK AI Security Institute
canonicalUrl: https://inspect.aisi.org.uk/model-graded.html
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
  - code
targetStage: risk_evaluative_practitioner
difficulty: advanced
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
maintenanceRisk: medium
caveats:
  - Model-graded evals require calibration before they support claims.
reviewOwner: AI Village Learn
lastChecked: "2026-06-30"
recommendedRole: deeper
watchFocus: Watch for judge prompt design, calibration examples, and uncertainty in model-graded scoring.
checkpointPrompt: State why a model-graded result would need independent spot checks before becoming a finding.
canonicalFor:
  - custom-solvers-scoring
  - red-team-the-eval
reviewStatus: accepted
---

Use model grading only when you can explain and test the judge behavior behind the score.
