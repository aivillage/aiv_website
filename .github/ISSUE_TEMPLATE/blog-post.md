---
name: Blog post
about: Propose or draft an AI Village blog post
title: "[BLOG] "
labels: ""
assignees: ""
---

## Publication metadata

- Title:
- Author(s):
- Category:
- Preferred slug (optional):
- Source or paper link (if applicable):
- Target publication date (optional):

## Summary

Describe the post and why it belongs on the AI Village site in two or three
sentences.

## Draft

Paste the proposed article here, or link to a draft that collaborators can
access.

Use second-level headings (`##`) for major sections. Astro renders the title
from front matter as the page's only top-level heading, so the article body
must not contain a `#` heading.

For research summaries, the following outline is a useful starting point:

### Overview

Summarize the paper, project, or topic and its central claim.

### Introduction

Explain the question, approach, and key finding in plain language.

### Body

Develop the analysis with descriptive headings and links to primary sources.

### Between the lines

Explain why the findings matter, the gaps that remain, and useful next
questions.

## Assets and accessibility

- [ ] Images or diagrams are attached or linked.
- [ ] Each image has proposed alternative text.
- [ ] Any social-card image is identified.

## Astro implementation notes

Accepted posts live in `src/content/blog/` as Markdown or MDX. A minimal source
file looks like this:

```yaml
---
title: "Post title"
date: 2026-08-26
author:
  - Author Name
category: "research"
description: "A concise description for listings and social previews."
slug: "post-slug"
---
```

Do not add Jekyll fields such as `layout`, create `_posts` files, or fabricate
legacy redirects for a new post. Before opening the implementation PR, run
`pnpm validate`.
