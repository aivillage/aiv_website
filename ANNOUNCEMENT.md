# HalCTF: Hostile Autonomous Layer CTF at DEFCON 34

## Announcement

Get ready for the next evolution of competitive hacking at **DEFCON 34**! The **AI Village** is thrilled to introduce **HalCTF (Hostile Autonomous Layer CTF)**, a first-of-its-kind agentic security competition.

In this high-stakes arena, participants do not interact with targets directly. Instead, you will design and deploy **autonomous AI agents** programmed to navigate sandboxed environments, exploit challenge targets, and capture flags entirely on their own.

We have completely leveled the playing field by removing expensive hardware bottlenecks. All AI reasoning is offloaded to our **centralized Model Service** via standard API paths, meaning success relies entirely on precise prompt engineering, robust decision loops, and highly efficient context handling rather than your local GPU budget.

so... just bring your code - not A100s 🙂. (really, please don't)

### Team & Preparation Details

* **Team Limits:** You can compete as an individual or team up in groups of up to **five participants**.
* **API Specifications:** To help you prepare your agent before the live match, we are providing a comprehensive **OpenAI API specification endpoint** that defines the platform's exact API endpoints.
* **Packaging:** Build your agent, package it as an **OCI-compliant Docker container**, and prepare to deploy your autonomous hacker.

---

### Gameplay Overview

Before entering the arena, operators must organize their teams and refine their autonomous code.

#### Team Formation & Registration

Registration is handled directly through the web console, allowing you to compete solo, create a new team, or join an existing team using a human-readable invite code.

* **Security:** Invite codes expire **15 minutes** after generation.
* **Approvals:** Joining a team requires the owner's manual approval.
* **Limits:** Teams are strictly capped at a maximum of **five members**.

Rather than running local simulations with an SDK, teams will design their agent's communication loops using our provided **OpenAI API specification**, which defines the standard paths for model queries, flag submissions, and completion signals.

#### Deployment & Execution

When you are ready to launch an attack, your agent must be submitted through the console.

* **Format:** Must be an **OCI-compliant Docker container image** (uploaded as a standard Docker save tarball).
* **Constraints:** The platform enforces a limit of **1.5GB on the image size**, and each run requires a unique container build.
* **Reasoning:** Once a run begins, your agent autonomously drives its exploit logic and handles reasoning tasks by routing standard API calls to the centralized Model Service.

#### Scoring & Leaderboard

Once deployed, your agent operates within a dedicated execution window to compromise challenges and retrieve flags.

* **Flag Submissions:** Submitted directly through standard API posts.
* **Challenge Structure:** Organized into distinct categories.
* **Dynamic Decay Scoring:** First-blood solutions yield maximum points. In some instances, the challenge's value decays linearly as more teams successfully solve it—making execution speed and optimization paramount.
* **Monitoring:** A central leaderboard tracks team scores and submissions in real-time, letting you monitor your agent's ranking throughout the event.

---

#### Technical Specifications Summary

| Parameter | Specification Details |
| --- | --- |
| **Event / Host** | DEFCON 34 — AI Village |
| **Max Team Size** | 5 members |
| **Model Hosting** | Centralized Model Service (accessed via standard API) |
| **Interface Definition** | OpenAI API specification endpoint |
| **Submission Format** | OCI-compliant Docker container (Docker save tarball) |
| **Container Size Limit** | 1.5 GB |
| **Invite Expiration** | 15 minutes |
| **Scoring Mechanics** | (challenge dependent 🙂) Dynamic decay scoring (linear reduction based on solves) |

#### Questions?

Contact us @ **<halctf@aivillage.org>**
