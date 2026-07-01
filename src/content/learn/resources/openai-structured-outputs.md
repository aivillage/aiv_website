---
slug: openai-structured-outputs
title: Structured Outputs
provider: OpenAI
canonicalUrl: https://developers.openai.com/api/docs/guides/structured-outputs
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
  - code
targetStage: builder
difficulty: intermediate
tracks:
  - ai-builder-core
rightsMode: link_only
license: OpenAI documentation terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: OpenAI
watchFocus: Focus on schema-constrained responses, refusals or errors, downstream validation, and what the schema does not prove.
checkpointPrompt: Write a response contract with schema fields, invalid-response handling, reviewer-visible errors, and one downstream validation check.
maintenanceRisk: low
caveats:
  - Schema conformance still requires application-level validation and authorization.
reviewOwner: AI Village Learn
lastChecked: "2026-06-29"
canonicalFor:
  - structured-outputs
reviewStatus: accepted
---

Use this guide when the module asks for a response contract rather than free-form model text. The AIV focus is schema shape, invalid-response handling, user-visible errors, and downstream validation.

The checkpoint should state what the schema guarantees and what it does not. Do not treat structured output as truth, policy compliance, or permission to skip business-rule checks.
