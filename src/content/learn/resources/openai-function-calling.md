---
slug: openai-function-calling
title: Function calling
provider: OpenAI
canonicalUrl: https://developers.openai.com/api/docs/guides/function-calling
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
  - code
targetStage: builder
difficulty: advanced
tracks:
  - ai-builder-core
  - defensive-ai-engineering
rightsMode: link_only
license: OpenAI documentation terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: OpenAI
watchFocus: Focus on tool schemas, model-selected arguments, tool results, and where the application enforces authorization before taking action.
checkpointPrompt: Draft one tool contract with arguments, allowed operation, approval or denial path, logging, and application-side validation.
maintenanceRisk: low
caveats:
  - Tool calls still require application-enforced authorization and approval gates.
reviewOwner: AI Village Learn
lastChecked: "2026-06-29"
canonicalFor:
  - secure-tool-use
  - tool-calling-basics
reviewStatus: accepted
---

Use this guide to separate model reasoning about a tool call from the application logic that actually runs the tool. The AIV module uses it to build a tool contract with validation, approval, logging, and failure handling.

The checkpoint should name which checks happen outside the model. Do not rely on function-calling structure as an authorization or containment control.
