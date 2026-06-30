---
title: Defensive AI Engineering
slug: defensive-ai-engineering
summary: >-
  A defensive engineering path for secure AI architecture, RAG, tool use, agents, defensive evals, logging,
  incident response, and debrief libraries.
trackKind: defensive
stageStart: builder
stageEnd: risk_evaluative_practitioner
audiences:
  - Defensive engineers
  - AppSec teams
  - AI platform teams
status: beta
prerequisites:
  - ai-builder-core
  - ai-security-core
requiredArtifacts:
  - Secure AI architecture control plan
  - RAG, tool, and agent control checklist
  - Defensive eval spec and regression pack
  - AI telemetry field map and alert spec
securityLens: primary
securityCheckpoints:
  - Architecture control checkpoint
  - Defensive eval checkpoint
  - Detection and logging checkpoint
whatExistsNow: The thin beta includes the first six control-oriented modules, lab-backed checkpoints, and required artifacts for secure AI architecture, RAG, tool use, agents, defensive evals, and AI telemetry.
whatComingNext: AI incident response and the defensive debrief library remain roadmap modules until reviewed templates, evidence checklists, and debrief examples are ready.
canonicalModules:
  - secure-ai-architecture
  - secure-rag
  - secure-tool-use
  - secure-agents
  - defensive-evals
  - detection-logging
  - ai-incident-response
  - defensive-debrief-library
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

Defensive AI Engineering is a thin beta for defensive engineers, AppSec teams, and AI platform teams that need to turn AI security concerns into concrete controls. The usable beta spine covers secure architecture, secure RAG, tool-use controls, agent containment, defensive evals, and detection/logging. It is intentionally control-oriented: learners should produce a small set of reviewable artifacts, not a broad assurance claim.

Use the AIV labs only as bounded defensive review anchors. Prompt Extraction supports prompt-resident secret review, Email Indirect Prompt Injection supports untrusted-content and approval-gate review, RAG Poisoning supports ingestion and retrieval controls, and Inspect Bahrain supports defensive eval evidence. The labs are not production attack playbooks, benchmark claims, or complete runbooks.

AI Incident Response and the Defensive Debrief Library remain draft roadmap modules. They stay in the canonical sequence so learners can see where the track is going, but they should not be treated as public curriculum until they have reviewed templates, evidence requirements, and debrief examples.
