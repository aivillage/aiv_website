---
title: Classical AI Search
slug: classical-ai-search
summary: Explains search, planning, and older AI techniques as foundations for modern AI workflows.
tracks:
  - ai-fundamentals
stageStart: explorer
stageEnd: ai_literate
difficulty: intro
moduleType: concept
learningObjectives:
  - Describe the main concepts for Classical AI Search.
  - Identify the artifact or checkpoint this module supports.
prerequisites:
  - ml-basics
resources:
  - resource: cs50-ai
    role: required
securityLens: awareness
securityLensText: "Search systems can optimize exactly what they are asked to optimize, even when that is not what the user intended. Define constraints and stopping conditions before trusting an automated search or planning result."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module uses classical AI search and planning to show that AI is broader than modern generative models. The curated material helps you see how states, actions, goals, heuristics, and constraints shape the behavior of a system. Your checkpoint is to describe a small search problem in plain language, including the goal, allowed actions, and what would count as a bad or invalid path. Use the module responsibly by remembering that optimization follows the objective it is given. If a goal omits safety, cost, privacy, or fairness constraints, the result can look efficient while still being unacceptable. This vocabulary will help later when agents, tools, and evals appear more complex.
