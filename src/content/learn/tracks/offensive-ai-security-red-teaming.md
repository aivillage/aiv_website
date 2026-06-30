---
title: Offensive AI Security and Red Teaming
slug: offensive-ai-security-red-teaming
summary: >-
  A safety-bounded offensive learning path for lab rules, toy AIV lab wrappers, conservative agent-abuse
  review, and defensive report writing.
trackKind: security
stageStart: risk_evaluative_practitioner
stageEnd: specialist_contributor
audiences:
  - AI red teamers
  - Security researchers
  - Practitioners running authorized labs
status: beta
prerequisites:
  - ai-security-core
requiredArtifacts:
  - Rules-of-engagement note
  - Lab debrief findings
  - Red-team report draft
securityLens: primary
securityCheckpoints:
  - Authorization checkpoint
  - Defensive debrief checkpoint
whatExistsNow: The curriculum beta includes a narrow authorized path with rules of engagement, AIV toy-lab wrappers, conservative agent-abuse review, and report/debrief templates.
whatComingNext: Full lessons will add more debrief examples and reviewed AIV-owned off-ramps before any CTF-style path becomes public.
canonicalModules:
  - rules-of-engagement-lab-safety
  - prompt-injection-basics
  - prompt-extraction-lab-wrapper
  - indirect-prompt-injection-lab-wrapper
  - rag-poisoning-lab-wrapper
  - agent-abuse-intro
  - red-team-report-writing
reviewOwner: AI Village Learn
lastReviewed: "2026-06-30"
---

Offensive AI Security and Red Teaming is for practitioners working in authorized labs or approved assessment contexts. The public beta is intentionally narrow: it keeps rules of engagement first, uses only AIV toy-lab wrappers for practical work, keeps agent-abuse material conceptual, and ends with defensive report writing. The expected artifacts are a rules-of-engagement note, lab debrief findings, and a red-team report draft.

The track exists because offensive learning can improve defensive understanding when it is scoped, authorized, toy-lab-only, and debriefed. It should not be read as permission to test real systems, third-party services, or other people's data. `ctf-path` remains outside the public canonical path until there is a safe, non-gated, AIV-owned off-ramp. No offensive video embeds or external CTF replacements are part of this beta path.
