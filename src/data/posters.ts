// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Regenerate with:  pnpm posters:import <queue.csv>
// Source of truth:  the Website Publish Queue spreadsheet
//
// Edits made here will be overwritten on the next import. To change a poster,
// change the spreadsheet row and re-run the importer.

import type { Poster } from "./poster-events";

export const posters: Poster[] = [
  {
    slug: "agent-to-agent-worm-propagation-in-mcp-based-ai-systems",
    event: "defcon-34",
    title: "Agent-to-Agent Worm Propagation in MCP-Based AI Systems",
    authors: [
      { name: "Utku Yildirim", affiliation: "Cobalt.io & Hoffmann Cybersecurity" },
      { name: "Ozgun Kultekin", affiliation: "Trendyol Group" },
    ],
    abstract: "MCP-connected agents often read from and write to shared systems such as Slack, GitHub, Jira, email, and Notion. Most prompt-injection research focuses on a single agent, but this work asks a different question: can attacker-controlled context move from one agent to another and trigger actions with the second agent’s permissions?\n\nWe present a two-hop propagation model. First, Agent A reads a poisoned MCP tool description and writes a carrier into a shared channel. Later, Agent B reads that content as part of its normal workflow and may perform unintended actions using its own tools. We count propagation only when Agent B performs an unintended tool call; simply reading the payload is not considered a successful chain.\n\nUsing MCParasite in controlled and sandboxed environments, we reproduced end-to-end propagation in 21 of 26 channel tests. Every tested shared channel propagated at least once, although outcomes varied across models and context configurations.\nThe poster explains how this propagation works, what we measured, and where defenders can break the chain through context separation, provenance tracking, least privilege, sensitive-action approval, and complete tool-call logging.",
    sourceUrl: "https://drive.google.com/file/d/1ms39W56OgrB0K3zuxXkSiba4Pwpr86v6/view?usp=drive_link",
    driveFileId: "1ms39W56OgrB0K3zuxXkSiba4Pwpr86v6",
  },
  {
    slug: "from-recon-to-full-system-prompt-exfiltration-a-5-stage-attack-chain",
    event: "defcon-34",
    title: "From Recon to Full System Prompt Exfiltration: A 5-Stage Attack Chain Against a Production LLM Chatbot",
    authors: [
      { name: "Veli Oguzcan Akdag", affiliation: "Bilishim Cyber Security & AI" },
    ],
    abstract: "This research documents a 5-stage attack chain against a production LLM-powered support chatbot, executed under authorized bug bounty scope. Starting with nothing but a browser, an unauthenticated attacker can extract the complete system prompt, full infrastructure fingerprint, and internal tool schemas without any CVE, exploit code, or specialized tooling. Each stage exploits a distinct architectural failure, collectively illustrating how compounding design decisions create a complete information disclosure path in deployed agentic systems.",
    sourceUrl: "https://drive.google.com/file/d/1j2yHo4PyMi2nkj-efo7ACXvhyqY2JcAy/view?usp=sharing",
    driveFileId: "1j2yHo4PyMi2nkj-efo7ACXvhyqY2JcAy",
  },
  {
    slug: "poisoned-mandates-stealing-agency-from-agentic-commerce",
    event: "defcon-34",
    title: "Poisoned Mandates: Stealing Agency from Agentic Commerce",
    authors: [
      { name: "Saish Bhorpe", affiliation: "Repello AI" },
      { name: "Aryan Bhujang", affiliation: "Repello AI" },
      { name: "Aryaman Behera", affiliation: "Repello AI" },
    ],
    abstract: "Three protocols launched in late 2025 to let AI agents shop and pay for you: Google's Agent Payments Protocol (AP2), Stripe and OpenAI's Agentic Commerce Protocol, and Visa's Trusted Agent Protocol. All three sign mandates, scope tokens, and separate roles. None of them treat the merchant's product description as input an attacker controls.\n\nWe put text in one product-description field and walked it through AP2's reference implementation end to end. A registered merchant with an ordinary storefront is all it takes. We built five escalating attacks, each breaking a different part of the pipeline. The agent presented the wrong product. It then overrode a user who said no seven times. It carried the payload across the whole agent chain and cleared eight human-in-the-loop checkpoints, including the one-time-password step. It defamed a competitor's product with invented reviews. Finally, one poisoned listing corrupted a separate, unrelated purchase the user made later. Every attack produced a cryptographically valid, signed payment mandate for a transaction the user never approved.",
    sourceUrl: "https://drive.google.com/file/d/1jqap8e7pTx0smzSUOm6WK3PXif01dEH8/view?usp=drive_link",
    driveFileId: "1jqap8e7pTx0smzSUOm6WK3PXif01dEH8",
  },
  {
    slug: "policy-driven-agentic-red-teaming",
    event: "defcon-34",
    title: "Policy driven agentic red teaming",
    authors: [
      { name: "Muneeza Azmat", affiliation: "Red Hat" },
      { name: "Sai Chandra Pandraju", affiliation: "Red Hat" },
      { name: "Diego Maniloff", affiliation: "Red Hat" },
      { name: "Stuart Battersby", affiliation: "Red Hat" },
      { name: "Henrique Nunes", affiliation: "Red Hat" },
      { name: "Alessandro Beltramo", affiliation: "Red Hat" },
    ],
    abstract: "Tool-using AI agents are vulnerable to indirect prompt injection: adversarial instructions hidden in tool outputs, RAG retrievals, and poisoned memory that can steer an agent to exfiltrate PII, take unauthorized actions, or corrupt records. Red-teaming for these failures is largely manual where teams build synthetic environments and hand-place payloads. This scales poorly across real deployments, and generic benchmarks miss deployment-specific policy.\n\nWe present an end-to-end pipeline that turns the policy documents governing a deployment into artifacts a red-teaming framework can run. A policy mapper grounds each requirement to an evidence passage and maps it across four risk taxonomies; a scenario generator profiles the target system and produces concrete attacks as attack trees, actor profiles, and Gherkin specs; an artifact generator synthesizes a lean environment per scenario (deterministic codegen for schemas and tools, an LLM only for seed data) validated before any agent interaction. Red teaming frameworks that are unable to access the attack surface or observe the attack success behavior are flagged as unsupported for that scenario. Evaluation is fully deterministic, using predicate-based security checks and tool-call-sequence utility comparison. On a customer-service agent, the pipeline extracted 27 risks from one policy document and generated 31 scenarios across eight agentic threat classes, rendered for both Garak and AgentDojo. It extends to attacks such as denial of service, memory poisoning, and goal hijacking.",
    sourceUrl: "https://drive.google.com/file/d/1OdjYXqaEmFK3fkqCuTPMlZ4Zis8oo4H6/view?usp=drive_link",
    driveFileId: "1OdjYXqaEmFK3fkqCuTPMlZ4Zis8oo4H6",
  },
  {
    slug: "prompt-injection-testing-at-scale",
    event: "defcon-34",
    title: "Prompt Injection Testing at Scale",
    authors: [
      { name: "Gabriele Randi", affiliation: "Google" },
      { name: "Viviana Sutedjo", affiliation: "Google" },
    ],
    abstract: "AI agents with powerful capabilities are being developed and deployed at an unprecedented pace. This rapid evolution presents a significant challenge for security, as traditional testing methods struggle to keep up. While manual red teaming offers deep insights, it cannot provide the continuous and broad coverage required to secure these dynamic systems.\n\nThis poster explores the shift towards \"Automated Prompt Injection Testing\"—the use of automated systems to discover vulnerabilities in AI agents effectively and at scale. We will discuss why this approach is essential to match the speed of AI innovation and how embedding automated adversarial testing into the development lifecycle helps ensure that speed does not come at the expense of security. Learn about general principles and the benefits of proactively and continuously uncovering agentic vulnerabilities.",
    sourceUrl: "https://drive.google.com/file/d/10W_HshKMlk-CAM8FRCnTEW8cLpFmsGLA/view?usp=drive_link",
    driveFileId: "10W_HshKMlk-CAM8FRCnTEW8cLpFmsGLA",
  },
  {
    slug: "the-collapse-of-the-skill-barrier-building-autonomous-ctf-tools-through",
    event: "defcon-34",
    title: "The Collapse of the Skill Barrier: Building Autonomous CTF Tools Through Pure Intent",
    authors: [
      { name: "David Kuznicki", affiliation: "Puzzled Hackers" },
    ],
    abstract: "This talk started with a question: Could AI-generated code consistently create finished, usable projects through strict methodology and intent?\n\nIntent is the New Skill, right? At least, that was the idea I wanted to test through a series of projects. An automated CTF tool ended up being the most relevant—and the most fun.\n\nWhat came out of it was more than a tool. AI jumped from “help me check this code” to “build me a usable product” incredibly fast. With defined requirements, strict testing, evidence, and a lot of patience, intent really can collapse the skill barrier.\n\nThe result was a CTF automation tool tested against public challenges with a high success rate. It also documents what it tried, what worked, what failed, and how it solved each challenge—turning it into a learning tool, not just an automated one.\n\nIn this talk, I’m going to show you what worked, what didn’t, and how you can build your own safe starting point for AI red teaming using CTFs.\n\nAt the end, I’m also giving you KEYSTONE—an LLM Agnostic Skill built from the lessons learned across hundreds of GitHub updates to help guide your own project from idea to deployment.\n\nAI red teaming is here. Let’s build something useful with it.",
    sourceUrl: "https://drive.google.com/file/d/1SWqDt4TwJqRw3tTGGp-DU59a_UA4vkiv/view?usp=drive_link",
    driveFileId: "1SWqDt4TwJqRw3tTGGp-DU59a_UA4vkiv",
  },
];
