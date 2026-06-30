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
  - Model a small search problem in terms of states, actions, goals, and constraints.
  - Sketch a search problem that includes invalid paths or unacceptable outcomes.
prerequisites:
  - ml-basics
resources:
  - resource: cs50-ai-lecture0-notes
    role: required
    step: 1
    note: "Use the notes to identify states, actions, goal tests, path costs, and constraints."
  - resource: cs50-ai-week0-search
    role: optional
    step: 2
    note: "Use the Week 0 page to connect the notes, examples, and original CS50 lesson context."
  - resource: cs50-ai-search-lecture-0
    role: deeper
    step: 3
    note: "Use the search examples to sketch states, actions, goal tests, and cost for one problem."
requiredArtifact: Search problem sketch
securityLens: awareness
securityLensText: "Search systems can optimize exactly what they are asked to optimize, even when that is not what the user intended. Define constraints and stopping conditions before trusting an automated search or planning result."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module uses classical AI search and planning to show that AI is broader than modern generative models. The curated material helps you see how states, actions, goals, heuristics, and constraints shape the behavior of a system. Your checkpoint is to describe a small search problem in plain language, including the goal, allowed actions, and what would count as a bad or invalid path. Use the module responsibly by remembering that optimization follows the objective it is given. If a goal omits safety, cost, privacy, or fairness constraints, the result can look efficient while still being unacceptable. This vocabulary will help later when agents, tools, and evals appear more complex.
