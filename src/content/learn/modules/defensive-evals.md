---
title: Defensive Evals
slug: defensive-evals
summary: Turn known AI failure modes into small regression evals with narrow claims and reviewable evidence.
tracks:
  - defensive-ai-engineering
stageStart: builder
stageEnd: risk_evaluative_practitioner
difficulty: intermediate
moduleType: concept
learningObjectives:
  - Convert a known control failure into an eval behavior, dataset, solver, scorer, and limit statement.
  - Use sample-level evidence instead of relying only on aggregate scores.
  - Produce a defensive eval spec and regression pack for one control.
prerequisites:
  - secure-agents
resources:
  - resource: inspect-ai-tutorial
    role: required
    step: 1
    note: "Use this as the required Inspect-specific guide for connecting task, dataset, solver, scorer, and logs."
  - resource: inspect-bahrain
    role: optional
    step: 2
    note: "Use this lab-backed repo to practice a small reproducible eval package."
  - resource: inspect-ai-eval-logs
    role: optional
    step: 3
    note: "Use logs to preserve run config and sample-level evidence."
  - resource: promptfoo-getting-started
    role: optional
    step: 4
    note: "Use Promptfoo as a regression or CI follow-on only after the behavior and evidence model are clear."
labs:
  - inspect-bahrain
requiredArtifact: Defensive eval spec and regression pack
securityLens: primary
securityLensText: "A defensive eval should freeze a known failure mode into a repeatable check, document the exact behavior tested, and state what the eval does not prove. Do not turn a passing eval into a broad safety claim."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

This module uses evals as defensive regression evidence. Start with one failure mode from earlier modules: prompt-resident secrets, untrusted external content, poisoned retrieval, unsafe tool action, or an agent escalation failure. Define the behavior being tested, the input set, the solver or interaction pattern, the scorer, and the limitation statement before you run anything.

Use Inspect Bahrain as the lab-backed practice anchor when you need a concrete package shape. Keep the claim narrow: one small eval can support a control review and regression plan, but it does not prove that the model or application is safe across untested situations.

The artifact is a defensive eval spec and regression pack. Include behavior tested, system version, dataset provenance, sample slices, solver configuration, scorer or metric, run configuration, representative failures, log evidence, decision supported, decision not supported, owner, and next regression test.
