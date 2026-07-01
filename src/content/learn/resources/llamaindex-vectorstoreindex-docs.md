---
slug: llamaindex-vectorstoreindex-docs
title: VectorStoreIndex documentation
provider: LlamaIndex
canonicalUrl: https://docs.llamaindex.ai/en/stable/module_guides/indexing/vector_store_index/
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
rightsMode: link_only
license: LlamaIndex docs terms
cost: free
loginRequired: false
accessMode: direct_open
embedAllowed: false
ageRestricted: false
attribution: LlamaIndex
watchFocus: Focus on documents, nodes or chunks, VectorStoreIndex construction, retrieval behavior, and the query path.
checkpointPrompt: Extend the retrieval plan with index contents, chunk boundaries, metadata, top-k behavior, and one review check.
maintenanceRisk: medium
caveats:
  - Match indexing choices to the prototype's data access and review boundaries.
reviewOwner: AI Village Learn
lastChecked: "2026-06-27"
canonicalFor:
  - vector-search-retrieval
reviewStatus: accepted
---

Use this page when the vector-search module needs a concrete indexing mental model: documents become nodes or chunks, an index supports retrieval, and query behavior depends on how the corpus was prepared. The AIV task is to capture those choices in the retrieval plan.

The checkpoint should include metadata and review checks, not only code shape. Do not treat a working index as proof that the retrieved context is authorized, fresh, or relevant.
