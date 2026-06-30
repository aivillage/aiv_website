---
slug: aiv-red-team-report-template
title: AIV Red-Team Report Template
provider: AI Village Learn
canonicalUrl: https://aivillage.org/learn/resources/aiv-red-team-report-template/
resourceType: docs
mediaType: docs
sourcePlatform: website
modality:
  - text
targetStage: specialist_contributor
difficulty: advanced
tracks:
  - offensive-ai-security-red-teaming
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
watchFocus: Keep the report useful to defenders while minimizing unnecessary operational detail.
checkpointPrompt: Write a finding that includes evidence, impact, deterministic mitigation, regression test, and disclosure boundary.
canonicalFor:
  - red-team-report-writing
reviewStatus: accepted
---

Use this template to turn an authorized lab or assessment observation into a defensive report.

Required fields:

- Title
- Scope
- Environment
- Steps summarized safely
- Evidence
- Impact
- OWASP mapping
- ATLAS mapping if conservative
- Deterministic mitigation
- Regression test
- Disclosure boundary

The report should help a defender understand and fix the issue without publishing payload collections, solution strings, or instructions for use against real systems.
