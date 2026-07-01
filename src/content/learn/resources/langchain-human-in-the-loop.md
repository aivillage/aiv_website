---
slug: langchain-human-in-the-loop
title: LangChain Human-in-the-loop
provider: LangChain
canonicalUrl: https://docs.langchain.com/oss/python/langchain/human-in-the-loop
resourceType: docs
mediaType: docs
sourcePlatform: docs
modality:
  - text
  - code
targetStage: builder
difficulty: intermediate
tracks:
  - agentic-ai-advanced-builder
rightsMode: link_only
license: LangChain documentation terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: LangChain
recommendedRole: required
watchFocus: Use this as a concrete implementation reference for adding human approval gates to agentic workflows.
checkpointPrompt: Create an approval matrix plus containment policy that names automatic, approval-required, and disallowed actions.
maintenanceRisk: medium
caveats:
  - LangChain examples are implementation references; generalize approval and containment patterns beyond one framework.
reviewOwner: AI Village Learn
lastChecked: "2026-06-28"
canonicalFor:
  - human-approval-containment
reviewStatus: accepted
status: beta
---

Use this page as a concrete implementation reference for approval, pause, review, and resume patterns. The AIV focus is the approval matrix: which actions need a human, what information the reviewer sees, and what happens when approval is denied.

Do not mistake a framework feature for a complete containment design. The module still needs policy boundaries, logs, rollback, and disallowed-action handling.
