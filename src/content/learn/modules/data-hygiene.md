---
title: Data Hygiene
slug: data-hygiene
summary: Builds habits for deciding what data belongs in AI workflows and what must stay out.
tracks:
  - ai-practitioner
stageStart: ai_literate
stageEnd: ai_practitioner
difficulty: intro
moduleType: concept
learningObjectives:
  - Classify data by sensitivity, reuse permission, and review requirements before AI use.
  - Build a red/yellow/green data matrix for an approved workflow.
prerequisites:
  - ai-for-security-workflows
resources:
  - resource: ncsc-ai-cyber-security
    role: required
    step: 1
    note: "Use this to classify allowed inputs, restricted inputs, review owners, and escalation points for AI data use."
requiredArtifact: Red/yellow/green data matrix
securityLens: awareness
securityLensText: "Data hygiene is an access-control and privacy issue, not just a cleanup task. Know what data you are allowed to use, where it goes, and how long it remains available."
status: beta
reviewOwner: AI Village Learn
lastReviewed: "2026-06-26"
---

This module helps practitioners decide what information should enter an AI workflow. The curated resources frame data hygiene as a practical checklist: classify the data, remove what is not needed, document sources, and decide who can view outputs. Your artifact is a data-use note for one workflow that names allowed inputs, restricted inputs, retention concerns, and review steps. Use the module responsibly by reducing unnecessary data movement. Do not send customer, employee, credential, legal, or regulated information into tools unless the tool and process are approved for that use. Clean data habits make prompting, retrieval, and evaluation safer later. Keep the note easy to update when the workflow, tool, or allowed data classification changes.
