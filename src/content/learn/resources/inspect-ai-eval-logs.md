---
slug: inspect-ai-eval-logs
title: Inspect Eval Logs
provider: UK AI Security Institute
canonicalUrl: https://inspect.aisi.org.uk/eval-logs.html
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
  - code
targetStage: risk_evaluative_practitioner
difficulty: intermediate
tracks:
  - defensive-ai-engineering
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
caveats:
  - Eval logs can contain prompts, model outputs, and other sensitive run details.
reviewOwner: AI Village Learn
lastChecked: "2026-06-30"
recommendedRole: required
watchFocus: Track the fields that make a run reproducible and the samples that justify the interpretation.
checkpointPrompt: Capture one sample-level failure with enough log context to support a narrow finding.
canonicalFor:
  - defensive-evals
  - detection-logging
  - eval-cards
  - interpreting-eval-results
  - running-inspect-eval
reviewStatus: accepted
---

Use the eval log docs to connect a run result to the samples, configuration, and evidence behind it.
