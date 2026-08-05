// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Regenerate with:  pnpm posters:import <poster.csv>
// Source of truth:  the restricted poster response export
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
    slug: "ai-agents-escape-their-task-horizon",
    event: "defcon-34",
    title: "AI agents escape their task horizon",
    authors: [
      { name: "Emile Delcourt", affiliation: "OWASP ASI" },
    ],
    abstract: "Frontier Agents (based on OpenAI, Google and Anthropic LLMs) show some propensity to escape their task’s horizon, by exchanging state with past or future instances of themselves, unprompted, to carry forward context and partial contributions towards their goal. Later agents “gain” from the content left by the earlier agent, achieving some continuity, and breaking independence of tasks (in evaluation or production)",
    sourceUrl: "https://drive.google.com/file/d/1FFh8L6_cuE7KRDZ8i-YwmiwHqdMq1dNU/view?usp=drive_link",
    driveFileId: "1FFh8L6_cuE7KRDZ8i-YwmiwHqdMq1dNU",
  },
  {
    slug: "attackers-dont-need-shells-they-need-prompts-this-is-how-we-hunt-them",
    event: "defcon-34",
    title: "Attackers Don't Need Shells, They Need Prompts: This Is How We Hunt Them",
    authors: [
      { name: "Raz Tel-Vered", affiliation: "Zenity" },
    ],
    abstract: "Threat hunting was built around network traffic, process execution, authentication events, and endpoint activity, but in AI systems the most important signals are embedded in language: for example, prompts, tool calls, retrieval data, and model responses. Traditional techniques such as exact match rules, signatures, behavioral filters, and one off LLM analysis either miss semantically equivalent attacks or become too costly to apply at scale. We present Intent based Threat Hunting, a practical method for overcoming the language barrier and effectively hunting threats against AI agents.",
    sourceUrl: "https://drive.google.com/file/d/11kec4Qr0aJXkyI8o1MD-Ra6IZ4Bvr7FS/view?usp=drive_link",
    driveFileId: "11kec4Qr0aJXkyI8o1MD-Ra6IZ4Bvr7FS",
  },
  {
    slug: "beyond-ctfs-engineering-ai-agents-for-real-world-web-pentesting",
    event: "defcon-34",
    title: "Beyond CTFs: Engineering AI Agents for Real-World Web Pentesting",
    authors: [
      { name: "Dhruva Goyal", affiliation: "BugBase" },
      { name: "Sitaraman Subramanian", affiliation: "BugBase" },
    ],
    abstract: "Large language models can solve CTF-style challenges, but production web pentesting is a different systems problem. Authenticated sessions expire, CSRF tokens rotate, single-page applications mutate the DOM, and request surfaces expand into thousands of near-duplicate states. Agents often exhaust their context before reaching meaningful attack paths.\n\nThis work presents the architecture of an autonomous browser-based agent for real-world web application pentesting. The system combines browser automation, DOM and accessibility-tree extraction, network capture, request normalization, page-similarity clustering, category-based memory, and task-specific reasoning loops.\n\nOur central finding is that model selection is not the primary bottleneck; context engineering is. By controlling what the agent sees, remembers, and ignores, the harness can remove approximately 90% of redundant page states before model reasoning, reduce loops, and preserve useful evidence across authenticated workflows. The poster also proposes practical evaluation criteria: meaningful coverage, bug density, context cost, and loop rate. Pentest Copilot, the open-source implementation with 1.1K GitHub stars, demonstrates how these ideas move autonomous pentesting beyond CTFs and toward large, stateful production applications.",
    sourceUrl: "https://drive.google.com/file/d/1cXykSlnfD1D5Xeu0QjOBHk22y28MS81i/view?usp=drive_link",
    driveFileId: "1cXykSlnfD1D5Xeu0QjOBHk22y28MS81i",
  },
  {
    slug: "block-means-yes-extracting-protected-agent-data-through-a-guards-own",
    event: "defcon-34",
    title: "Block Means Yes: Extracting Protected Agent Data Through a Guard’s Own Refusal Signal",
    authors: [
      { name: "Larry Suto" },
    ],
    abstract: "Agent systems increasingly place a response-level guard in front of a model that can\nsee secrets in its prompt, tools, or retrieved documents, assuming that if the guard\nblocks the leaking response, the secret is safe. It is not. A correctly-functioning\nguard that never sees the secret in its own policy still leaks it through the *pattern*\nof its BLOCK/ALLOW decisions: each decision is one bit of an attacker-chosen predicate\nabout the value — structurally a padding oracle whose novel target is the refusal signal.",
    sourceUrl: "https://drive.google.com/file/d/1JK4inE6TIbhQr3KUWvL5vn3gGgOHje_E/view?usp=drive_link",
    driveFileId: "1JK4inE6TIbhQr3KUWvL5vn3gGgOHje_E",
  },
  {
    slug: "confused-deputies-in-slack-exploiting-agentic-ai-in-production",
    event: "defcon-34",
    title: "Confused Deputies in Slack: Exploiting Agentic AI in Production Environments",
    authors: [
      { name: "Rodney Beede", affiliation: "Life360" },
    ],
    abstract: "Enterprise AI assistants are increasingly deployed as Slack‑native agents wired into email, Jira, GitHub, Zoom, and internal knowledge systems. This poster presents the results of a month‑long red‑team engagement against two such production agents—“Saturday” (an IT/security assistant) and DevBot (a developer‑productivity assistant)—revealing systemic security failures in agentic architectures.\n\nThe findings include: (1) confused‑deputy tool use, where agents executed actions using over‑privileged service accounts rather than the requesting user’s permissions; (2) context‑confusion attacks, where multi‑user Slack threads caused the agent to leak Gmail and Zoom data belonging to other employees; (3) token‑revocation bypass, where GitHub access persisted even after explicit OAuth disconnection; (4) prompt‑injection‑driven tool misuse, including partial disclosure of service‑account credentials; and (5) a high‑impact phishing amplification attack, where the agent was tricked into posting a fully‑rendered phishing message to an all‑staff Slack channel.",
    sourceUrl: "https://drive.google.com/file/d/129NfqgqlC6BKrE1772qsRZSIRQu-GHLk/view?usp=drive_link",
    driveFileId: "129NfqgqlC6BKrE1772qsRZSIRQu-GHLk",
  },
  {
    slug: "detecting-unauthorized-tool-calls-using-ollama-and-splunk",
    event: "defcon-34",
    title: "Detecting unauthorized tool calls using Ollama and Splunk",
    authors: [
      { name: "Anshumaan Mishra", affiliation: "Independent Researcher" },
    ],
    abstract: "Organizations increasingly deploy self-hosted LLMs using frameworks like Ollama to get better productivity with tools that can execute actions or access sensitive resources.  Such deployments may be internal or external and often ship without built-in security controls, making them vulnerable to risks such as prompt injection that can manipulate an LLM into invoking connected tools or accessing sensitive resources beyond its intended permissions. One can add guardrails to such models or leverage existing prompt monitoring solutions to gain visibility, but integrating LLM telemetry into existing security operations workflows remains challenging. During a security incident, timely detection and response are critical, which is where PromptMon helps. PromptMon is a lightweight Python middleware library that can be integrated alongside Ollama-hosted LLMs to add observability, prompt monitoring, and security telemetry without modifying the underlying model. PromptMon allows developers to integrate their own machine learning classifiers to evaluate prompts and assign confidence scores. The normalized log data is sent to a SIEM, opening a wide range of possibilities for response actions using SOAR or low code/no code platforms. Furthermore, it can be used for an audit trail during security incidents - add runtime prompt monitoring and SOC-ready observability in a few lines of code. This poster demonstrates the integration of PromptMon with an Ollama-based LLM application, illustrating its architecture, telemetry workflow, and Splunk integration, while outlining future work toward detection-and-response methodologies for agentic systems.",
    sourceUrl: "https://drive.google.com/file/d/13G_1UFRkhnVnmJX3ueZVWCzmiL-5HMbo/view?usp=drive_link",
    driveFileId: "13G_1UFRkhnVnmJX3ueZVWCzmiL-5HMbo",
  },
  {
    slug: "dont-block-bifurcate",
    event: "defcon-34",
    title: "Don't Block — Bifurcate",
    authors: [
      { name: "Kastriot Fetahaj", affiliation: "Kosova Cyber Team" },
      { name: "Robert Shala", affiliation: "DefCon Group Prishtina" },
      { name: "Blerim Rexha", affiliation: "University of Prishtina" },
    ],
    abstract: "Capture The Flag (CTF) events test people, but autonomous AI agents and scripts now read a challenge, exploit it, and submit the flag faster than any human, turning a \"human\" contest into a benchmark for bots. Detecting and blocking fails twice: it does not stick — a client retries or cleans its user-agent — and it is a tell that trains the attacker to adapt. We wanted the opposite, a defence that costs the bot and tells it nothing: don't block, bifurcate. On the same URL, a server-side check decides whether the caller looks human or automated, across four layers: user-agent signature, a trusted edge header, browser behaviour, and honeypot tripwires. Humans get the genuine challenge and the real flag, wheras agents get a parallel reality with a planted flag, recorded as a wrong answer and penalised on submission. A CTFd plugin logs and attributes each catch in about 11 ms. We built these decoys — prompt injection, differential APIs, fake-success gates, deception labyrinths, and embedded forensic decoys — into 28 challenges across five categories, online and offline, and ran two competitions. The traps logged 84 fake-flag submissions among 40 players at the Kosova Cyber Team CTF and 518 among 143 at SHEcurity, a girls-only event. Several students finished on negative scores purely from penalties, with no signal they had been caught. Because the fork is never disclosed and the human path untouched, the deception held across categories and settings. Future work strengthens the behaviour layer beyond the spoofable signature and lowers false positives.",
    sourceUrl: "https://drive.google.com/file/d/1wHDobyEBiGq5CXzaTYVeGGrpLcuFqMtI/view?usp=drive_link",
    driveFileId: "1wHDobyEBiGq5CXzaTYVeGGrpLcuFqMtI",
  },
  {
    slug: "for-prompt-injection-press-1-hacking-ai-voice-agents",
    event: "defcon-34",
    title: "For Prompt Injection, Press 1: Hacking AI Voice Agents",
    authors: [
      { name: "Willie Zhang", affiliation: "ProCircular" },
    ],
    abstract: "What happens when you social engineer an AI agent that was trained to be helpful over the phone? Can you get it to reveal its system prompt out loud? Will it disclose information about other callers? How far can you push it before its guardrails kick in?\n\nAI voice agents sit behind telephony layers like speech-to-text, text-to-speech, and call routing that introduce new attack surfaces and opportunities. They're replacing human operators everywhere: answering phones at doctor's offices, handling IT help desks, triaging customer support, booking appointments. They sound human, but underneath they're the same LLMs we've been prompt injecting.\n\nI built an open-source tool that tackles this by placing real phone calls to voice AI agents, speaking attack scenarios using text-to-speech, capturing responses via speech recognition, and analyzing transcripts for signs of successful exploitation.",
    sourceUrl: "https://drive.google.com/file/d/1WF7E1XQnKobXb6-mIGGqrwq98Iehw8vr/view?usp=drive_link",
    driveFileId: "1WF7E1XQnKobXb6-mIGGqrwq98Iehw8vr",
  },
  {
    slug: "from-recon-to-full-system-prompt-exfiltration",
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
    slug: "ill-just-call-you-agent-to-agent-privilege-boundary-failures-in-ci-cd",
    event: "defcon-34",
    title: "I'll just call you — Agent-to-Agent Privilege Boundary Failures in CI/CD Agents",
    authors: [
      { name: "Dan Lisichkin", affiliation: "Pillar Security" },
    ],
    abstract: "AI agents are no longer just running in local environments. They are already showing up inside real CI/CD cycles, wired into issue triage, PR review, repository maintenance, and user discussion workflows. In Google’s `adk-python` repository, we found exactly that: agentic workflows triaging issues, pull requests, and discussions.\n\nThese agents were susceptible to prompt injection from attacker-controlled repository content. In first glace, the impact looked almost boring: an attacker could make the agent output attacker controlled text as comments inside PRs and issues. So what? Who cares if an agent comments what we tell it to?\n\nThe answer is that this comment was not just text. In the same repository, Google had also interloped Gemini based workflows capable of taking actions against the repository, including code review like behavior and other automation, gated by author or trigger conditions. The ADK-based agents, meanwhile, were wired with highly privileged personal access tokens. That meant an attacker could prompt inject one agent into posting something like `@gemini-cli`, causing another agentic workflow to wake up and begin performing actions.\n\nThis poster presents what we believe is one of the first documented agent-to-agent paths toward potential software supply-chain compromise. We will show how the issue was found, how the exploit chain was developed, why the English language is another form of command execution interface, and how impact analysis changed the severity of the finding. We will also cover remediation steps and broader lessons for securing agentic CI/CD systems before agents start triggering agents all the way down.",
    sourceUrl: "https://drive.google.com/file/d/1dgQXJRa5PGyOlLzjihvr6I0NbFliBBFG/view?usp=drive_link",
    driveFileId: "1dgQXJRa5PGyOlLzjihvr6I0NbFliBBFG",
  },
  {
    slug: "improving-ai-red-teaming-by-systematizing-red-teaming-reports",
    event: "defcon-34",
    title: "Improving AI Red-Teaming by Systematizing Red-Teaming Reports",
    authors: [
      { name: "Jessica Ji", affiliation: "CSET" },
      { name: "Colin Shea-Blymyer", affiliation: "CSET" },
    ],
    abstract: "AI red-teaming faces serious challenges: lack of scientific grounding, inconsistent testing practices, and misalignment with external stakeholders. Because the practice is highly context-dependent and qualitative, reporting remains inconsistent, creating a gap between the information produced and what is needed to improve the field. This fragmentation hinders interpretability, limits stakeholder trust, and complicates efforts to mitigate AI risks. These problems are especially pertinent as the practice of AI red-teaming adapts to evaluate agentic systems.\n\nIn our work, we conducted a qualitative interview study with 17 AI red-teaming practitioners to explore how testing practices influence reporting and identify the challenges preventing standardization. Our thematic analysis reveals that organizational context and threat models are the primary frameworks shaping red-teaming exercises. We identify four key dimensions that practitioners agree are essential to report for improved transparency and utility: the threat model, methodological details, harms elicited during testing, and actionable information for mitigation.\n\nWe will present on the challenges to the AI red-teaming ecosystem, what AI red-teamers want from reports, and how red-teamers can systematize reporting practices to help the AI community move toward more consistent, useful, and interpretable evaluations of AI systems. Solving the challenges that face AI red-teaming is vital for the emerging era of agentic AI, where increased autonomy and interaction complexity require more rigorous, interpretable evaluation methods.",
    sourceUrl: "https://drive.google.com/file/d/1ZEhLs8bq7IsVRpTyFX0UPZak4N-HzWAh/view?usp=drive_link",
    driveFileId: "1ZEhLs8bq7IsVRpTyFX0UPZak4N-HzWAh",
  },
  {
    slug: "malicious-context-propagation-weaponizing-the-extensibility-of-ai",
    event: "defcon-34",
    title: "Malicious Context Propagation: Weaponizing the Extensibility of AI Coding Assistants",
    authors: [
      { name: "Roshan Piyush", affiliation: "Harness of Security Research @ Harness" },
      { name: "Soujanya Namburi", affiliation: "Senior Security Researcher @ Harness" },
    ],
    abstract: "AI coding assistants now read source code, execute shell commands, manage credentials, and make autonomous decisions through hooks, skills, project configs, and MCP integrations that developers rarely inspect. As these agents gain autonomy, they are becoming some of the most privileged components on a developer workstation.\n\nWe weaponized the same extensibility layers that make these tools useful. Hooks silently exfiltrate credentials, skills auto-invoke without commands, MCP servers poison agent behavior after trust checks, and project configs disable vendor guardrails. A developer clones a repository, opens their editor, and the agent does the rest.\n\nStarting from hardened vendor baselines, we found alternative paths around existing protections — allowlists, and approval that never canonicalize — and chained them into full attack sequences enabling code execution, credential theft, lateral movement, persistence, and cross-tool contamination. We show how trust and extensibility create a new attack surface in AI coding agents.",
    sourceUrl: "https://drive.google.com/file/d/1PH9IM3GjineCMvTk6SdgI-frDZmVOolJ/view?usp=drive_link",
    driveFileId: "1PH9IM3GjineCMvTk6SdgI-frDZmVOolJ",
  },
  {
    slug: "poisoned-mandates",
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
    slug: "poisoning-the-soc-prompt-injection-via-ingested-telemetry",
    event: "defcon-34",
    title: "Poisoning the SOC: Prompt Injection via Ingested Telemetry",
    authors: [
      { name: "John Seymour", affiliation: "Salesforce" },
    ],
    abstract: "Security teams are wiring LLM agents into every stage of the SOC, from alert triage to investigation, threat hunting, and autonomous response. Every one of those agents reads logs whose contents are, in large part, written by attackers. An attacker who controls those bytes can steer what the agent concludes, deny it the ability to conclude anything, or turn its own tools against the environment. In practice, that means suppressed detections, decoy investigations, denial of analysis, and attacker-directed tool calls, all delivered through fields the attacker already owns.\n\nWe systematically evaluate what this vector buys an attacker across a real enterprise pipeline. We catalogue the attacker-controlled fields that survive ingestion into a production SIEM, then test whether injected content in each field reaches and steers the agents built on top of it. We report what reliably carries an injection through to an agent, which agents are steerable, and which impacts are realistic versus theoretical. A passerby will leave knowing which everyday log fields double as injection vectors, how far an injection actually travels through a real pipeline before it reaches an agent, and which defenses hold up versus which only look like they do. The takeaway is practical: if you are building agents on top of your SOC, here is where the data-to-instruction boundary breaks and how to defend it.",
    sourceUrl: "https://drive.google.com/file/d/1qkO71SdsClFCjqfmaP4qdPjwRK6vfdk2/view?usp=drive_link",
    driveFileId: "1qkO71SdsClFCjqfmaP4qdPjwRK6vfdk2",
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
    slug: "reference-grafting-in-a2a-cross-principal-task-data-exfiltration-via",
    event: "defcon-34",
    title: "Reference Grafting in A2A: Cross-Principal Task-Data Exfiltration via referenceTaskIds",
    authors: [
      { name: "Shay Sakazi", affiliation: "AI Village" },
      { name: "Sunders Bruskin", affiliation: "AI Village" },
      { name: "Emil Gelman", affiliation: "AI Village" },
    ],
    abstract: "In Agent2Agent (A2A), one AI agent asks another to do work. Reference Grafting steals a victim's private task data from that exchange. The victim's agent correctly refuses to hand over the data — but it does hand over the task's ID, which looks like harmless coordination metadata. The attacker sends that ID back to the server in the referenceTaskIds field. The server checks ownership when a task is requested directly (denied) but not when it's referenced (allowed), so it loads the victim's task and returns the contents.",
    sourceUrl: "https://drive.google.com/file/d/1sF_O_aYgR85bMDRSeZFZoxv74zV-wfKV/view?usp=drive_link",
    driveFileId: "1sF_O_aYgR85bMDRSeZFZoxv74zV-wfKV",
  },
  {
    slug: "securing-cross-enterprise-ai-agents",
    event: "defcon-34",
    title: "Securing Cross-Enterprise AI Agents",
    authors: [
      { name: "Sri Aradhyula", affiliation: "Cisco" },
      { name: "Sarah Evans", affiliation: "Dell Technologies" },
      { name: "Shankar Garikapati", affiliation: "Lyft" },
      { name: "Amritha Lal", affiliation: "AWS" },
      { name: "Manish Singh", affiliation: "Datum" },
    ],
    abstract: "As enterprises adopt autonomous AI agents, they need a way to preserve human accountability while allowing agents to act across organizational boundaries. This research presents a secure reference architecture for cross-enterprise AI agent delegation that separates who initiated an action from who executed it. The architecture propagates human and agent identity, validates delegated authority, enforces policy at each trust boundary, and records auditable evidence of agent actions. Using emerging and established standards such as RFC 8693, ID-JAG, W3C Verifiable Credentials, OPA, OpenTelemetry, and AGNTCY, the work outlines a practical Phase 1 proof of concept for delegated authorization, identity propagation, and cross-domain trust. The result is a foundation for more secure, governable, and interoperable enterprise AI agent ecosystems.",
    sourceUrl: "https://drive.google.com/file/d/1eJ6HA2u2pq0-csk7eAYmAjhPo1ynngC1/view?usp=drive_link",
    driveFileId: "1eJ6HA2u2pq0-csk7eAYmAjhPo1ynngC1",
  },
  {
    slug: "the-anatomy-of-a-chinese-knowledge-distillation-campaign",
    event: "defcon-34",
    title: "The Anatomy of a Chinese Knowledge Distillation Campaign",
    authors: [
      { name: "Colin Shea-Blymyer", affiliation: "CSET" },
      { name: "Kyle Miller", affiliation: "CSET" },
    ],
    abstract: "Chinese AI developers may not need to develop agentic capabilities on their own. “Black-box knowledge distillation” — a technique where a weaker “student” model learns by querying a more capable “teacher” model — has emerged as a technique to “copy” the capabilities from closed-weights models. To understand the role of distillation in model development, we embarked on a literature review of academic research and recent reports on how Chinese model developers engage with the technique. We will present how Chinese labs are believed to circumvent guardrails, location policies, and account restrictions to generate synthetic data that improves their models.\n\nWe break the distillation process itself into five critical steps: select, seed, steer, generate, and train. By understanding these components of distillation, we can begin to understand how to detect and respond to attempts to copy frontier capabilities. Furthermore, we discuss the strategic implications for AI security, highlighting the difficulties developers face in distinguishing adversarial distillation campaigns from legitimate industrial usage.",
    sourceUrl: "https://drive.google.com/file/d/1_7BZTUkcGmu4eb2X05eYidZwKWZi9S0W/view?usp=drive_link",
    driveFileId: "1_7BZTUkcGmu4eb2X05eYidZwKWZi9S0W",
  },
  {
    slug: "the-collapse-of-the-skill-barrier",
    event: "defcon-34",
    title: "The Collapse of the Skill Barrier: Building Autonomous CTF Tools Through Pure Intent",
    authors: [
      { name: "David Kuznicki", affiliation: "Puzzled Hackers" },
    ],
    abstract: "This talk started with a question: Could AI-generated code consistently create finished, usable projects through strict methodology and intent?\n\nIntent is the New Skill, right? At least, that was the idea I wanted to test through a series of projects. An automated CTF tool ended up being the most relevant—and the most fun.\n\nWhat came out of it was more than a tool. AI jumped from “help me check this code” to “build me a usable product” incredibly fast. With defined requirements, strict testing, evidence, and a lot of patience, intent really can collapse the skill barrier.\n\nThe result was a CTF automation tool tested against public challenges with a high success rate. It also documents what it tried, what worked, what failed, and how it solved each challenge—turning it into a learning tool, not just an automated one.\n\nIn this talk, I’m going to show you what worked, what didn’t, and how you can build your own safe starting point for AI red teaming using CTFs.\n\nAt the end, I’m also giving you KEYSTONE—an LLM Agnostic Skill built from the lessons learned across hundreds of GitHub updates to help guide your own project from idea to deployment.\n\nAI red teaming is here. Let’s build something useful with it.",
    sourceUrl: "https://drive.google.com/file/d/1SWqDt4TwJqRw3tTGGp-DU59a_UA4vkiv/view?usp=drive_link",
    driveFileId: "1SWqDt4TwJqRw3tTGGp-DU59a_UA4vkiv",
  },
  {
    slug: "the-model-is-the-malware-runtime-behavioral-detection-of-malicious-ml",
    event: "defcon-34",
    title: "The Model Is the Malware: Runtime Behavioral Detection of Malicious ML Artifacts",
    authors: [
      { name: "Hala Ali", affiliation: "Virginia Commonwealth University" },
      { name: "Andrew Case", affiliation: "Volexity" },
    ],
    abstract: "Agentic AI systems and automated ML pipelines increasingly rely on third-party model artifacts from public hubs, loading them through framework APIs such as torch.load() and AutoModel.from_pretrained(). These systems may select, evaluate, fine-tune, or deploy models without human review before execution. Attackers embed payloads in these artifacts that trigger during deserialization or inference, spawning processes, opening network connections, or exfiltrating host data. Platform scanners use static denylists and miss attacks that avoid denylisted functions, exploit unsupported loading paths, or abuse legitimate framework APIs. To detect such malware, we present ModelShield, the first runtime behavioral detection system that attributes system-level behavior to specific model operations. ModelShield combines application-level instrumentation of framework APIs with eBPF-based syscall tracing, preserving attribution across threads and child processes to separate model-triggered activity from environment noise. Attributed syscall sequences are classified using 193 behavior patterns mapped to MITRE ATT&CK techniques. We evaluated ModelShield on 145,000 models from Hugging Face, ModelScope, and Kaggle across 17 ML frameworks and 36 formats. On Hugging Face, it detected 41 malicious models, including a live reverse shell downloaded 108 times without platform-scanner detection before disclosure, and a payload performing host reconnaissance and outbound exfiltration; all detections were manually confirmed. It detected all 29 evasion variants spanning function substitution, loading-path obfuscation, and TensorFlow API abuse, outperforming static scanners. Analysis completes in a median of 12.3 seconds per model, making ModelShield practical for hub-scale screening. This poster demonstrates that detecting malicious models requires observing what they do, not just inspecting what they contain.",
    sourceUrl: "https://drive.google.com/file/d/1T1qQi24n2Mbem5jVxkdvCUEh5zgVo6i3/view?usp=drive_link",
    driveFileId: "1T1qQi24n2Mbem5jVxkdvCUEh5zgVo6i3",
  },
  {
    slug: "the-weight-of-evidence-how-an-agentic-soc-analyst-earns-your-trust",
    event: "defcon-34",
    title: "The Weight of Evidence: How an Agentic SOC Analyst Earns Your Trust",
    authors: [
      { name: "Sophena Wilson", affiliation: "Microsoft" },
    ],
    abstract: "AI agents are moving into the SOC, where they read alerts, gather context and increasingly help decide what to close and what to escalate. Triage has always been an evidence discipline: a verdict is only ever as sound as the material beneath it. Agents inherit that dependency and add a new weakness, they cannot reliably distinguish evidence they are meant to read from instructions they are being told to follow. The SOC is an attractive place to exploit that, because so much of an agent's evidence is attacker-authored by design.\nThis work builds a representative triage agent, defines a four-part tamper taxonomy for machine-read evidence, and alters exactly one artefact per trial. One attacker-controlled field can move an autonomous verdict,  and the reasoning stays coherent, so the failure reads exactly like good work. Silent closures, not noisy escalations, are the failure worth instrumenting first.",
    sourceUrl: "https://drive.google.com/file/d/1lCCJzB3P0bZhj4WMEi2nkunPgwxDVdGW/view?usp=drive_link",
    driveFileId: "1lCCJzB3P0bZhj4WMEi2nkunPgwxDVdGW",
  },
];
