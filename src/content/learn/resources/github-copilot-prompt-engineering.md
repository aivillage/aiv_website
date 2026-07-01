---
slug: github-copilot-prompt-engineering
title: GitHub Copilot prompt engineering
provider: GitHub Docs
canonicalUrl: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
targetStage: ai_practitioner
difficulty: intro
tracks:
  - ai-practitioner
rightsMode: link_only
license: GitHub Docs terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: GitHub Docs
recommendedRole: required
watchFocus: Use this for coding-assistant prompts that specify context, constraints, tests, and review expectations.
checkpointPrompt: Record one coding prompt, the generated change, the tests or checks run, and what you rejected before accepting the change.
maintenanceRisk: low
caveats:
  - Product-specific guidance; adapt examples to approved coding tools and repository policy.
reviewOwner: AI Village Learn
lastChecked: "2026-06-28"
canonicalFor:
  - ai-assisted-coding
reviewStatus: accepted
status: beta
---

Use this page to make coding-assistant work auditable: provide relevant context, name constraints, ask for tests or checks, and review generated changes before accepting them. In AIV Learn it supports a small code-change log rather than a blind productivity claim.

The checkpoint should record the prompt, the change produced, checks run, and what was rejected. Do not treat assistant output as trusted just because it compiles.
