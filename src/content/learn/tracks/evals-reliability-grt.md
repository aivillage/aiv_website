---
title: Evals, Reliability, and GRT Research
slug: evals-reliability-grt
summary: >-
  A unified Inspect-first evals and GRT-style path for eval design, logs, benchmark transparency,
  eval cards, agent evals, and findings.
trackKind: evals
stageStart: builder
stageEnd: specialist_contributor
audiences:
  - Researchers
  - Eval contributors
  - GRT-style findings contributors
status: beta
prerequisites:
  - ai-builder-core
requiredArtifacts:
  - Reproducible Inspect eval package
  - Completed eval card
  - GRT-style finding memo
  - Log/sample-level review evidence
  - Limitations and non-claims
securityLens: required
securityCheckpoints:
  - Inspect run evidence checkpoint
  - Eval red-team checkpoint
  - Benchmark transparency checkpoint
  - Findings quality checkpoint
whatExistsNow: The curriculum beta includes one combined Evals/GRT track with Inspect-first docs, a lab-backed run anchor, eval-card and GRT-style finding templates, and no duplicate GRT track.
whatComingNext: Additional case studies and reviewed benchmark references will expand the beta without changing the Inspect-first artifact spine.
canonicalModules:
  - what-is-an-eval
  - inspect-dataset-solver-scorer
  - running-inspect-eval
  - custom-solvers-scoring
  - interpreting-eval-results
  - red-team-the-eval
  - benchmark-transparency
  - model-eval-harnesses
  - agent-evals
  - eval-cards
  - grt-style-findings
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

Evals, Reliability, and GRT Research is for builders, researchers, and contributors who need to turn AI behavior into reviewable evidence. It is docs-first, Inspect-first, and artifact-first: learners define eval anatomy, run a small authorized Inspect package, inspect logs and samples, red-team the eval design, compare benchmark transparency, choose harnesses carefully, scope agent evals, and complete eval-card and GRT-style finding artifacts.

The learner should produce one small reproducible Inspect eval package, one completed eval card, one short GRT-style finding memo, evidence of log/sample-level review, and clear limitations and non-claims. Security is built in through adversarial cases, benchmark transparency, agent-environment scoping, and careful claims about evidence. The track keeps GRT-style work inside the single Evals/GRT path rather than splitting it into a duplicate research track or turning the track into a video sequence or benchmark farm.
