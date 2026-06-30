---
title: AI Security Core
slug: ai-security-core
summary: >-
  A docs-first AI security track covering threat modeling, OWASP LLM risks, supply chain,
  retrieval risks, conservative MITRE mapping, and NIST risk-framework evidence.
trackKind: security
stageStart: ai_literate
stageEnd: risk_evaluative_practitioner
audiences:
  - Security practitioners learning AI
  - AppSec teams
  - Builders who need AI security fundamentals
status: beta
prerequisites:
  - ai-fundamentals
requiredArtifacts:
  - AI threat model outline
  - AI Security Core review pack
  - Governance evidence map
securityLens: primary
securityCheckpoints:
  - Threat model checkpoint
  - OWASP risk entry checkpoint
  - Control mapping checkpoint
whatExistsNow: The curriculum beta includes a docs-first AI Security Core path with an AIV threat-modeling anchor, module-specific OWASP LLM resources, conservative MITRE mapping, and NIST evidence framing.
whatComingNext: Full lessons will add deeper examples and templates while keeping labs optional, safety-framed, and outside the required core path.
canonicalModules:
  - ai-threat-modeling
  - prompt-injection
  - sensitive-information-disclosure
  - improper-output-handling
  - excessive-agency
  - ai-supply-chain
  - vector-embedding-weaknesses
  - rag-poisoning-risk
  - system-prompt-leakage
  - misinformation
  - unbounded-consumption
  - mitre-atlas-mapping
  - nist-ai-rmf-genai-profile
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

AI Security Core is for security practitioners, AppSec teams, and builders who need a first structured pass through AI-specific risks. The public beta is docs-first and defensive: threat modeling opens with an AIV-authored anchor, OWASP module-specific pages replace the generic landing page as the primary source for most risk modules, and MITRE/NIST appear late as conservative mapping and evidence frameworks.

The learner should produce an AI threat model outline, AI Security Core review pack entries, and a governance evidence map that can be reviewed with system owners. AIV labs are kept optional and safety-framed where they support debriefing. The track does not publish offensive walkthroughs, add CTF resources, embed security videos, or treat mappings as proof of coverage.
