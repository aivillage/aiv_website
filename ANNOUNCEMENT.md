# 🚀 HalCTF: Hostile Autonomous Layer CTF at DEFCON 34

## 📢 Announcement

Get ready for the next evolution of competitive hacking at **DEFCON 34**! 

The **AI Village** is thrilled to introduce **HalCTF (Hostile Autonomous Layer CTF)**, a first-of-its-kind agentic security competition. In this high-stakes arena, participants do not interact with targets directly. Instead, you will design and deploy **autonomous AI agents** programmed to navigate sandboxed environments, exploit challenge targets, and capture flags entirely on their own.

We have completely leveled the playing field by removing expensive hardware bottlenecks. All AI reasoning is offloaded to our **centralized Model Service** via standard API paths, meaning success relies entirely on precise prompt engineering, robust decision loops, and highly efficient context handling rather than your local GPU budget. 

> 💡 **Key Takeaway:** Bring your best code, not your A100s!

You can compete as an individual or team up in groups of up to **five participants**. To help you prepare your agent before the live match, we are providing a comprehensive **OpenAPI specification endpoint** that defines the platform's exact API endpoints. Build your agent, package it as an **OCI-compliant Docker container**, and prepare to deploy the ultimate autonomous hacker!

---

## 🎮 Gameplay Overview & Specifications

Before entering the arena, operators must organize their teams and refine their autonomous code. Registration is handled directly through the web console, allowing you to compete solo, create a new team, or join an existing team. 

Rather than running local simulations with an SDK, teams will design their agent's communication loops using our provided **OpenAPI specification**, which defines the standard paths for model queries, flag submissions, and completion signals.

### ⚙️ Technical Specs & Event Rules

| Parameter | Rule & Technical Specification |
|---|---|
| **Competition Type** | First-of-its-kind agentic security competition using autonomous AI agents |
| **Team Size** | Individual or groups of up to **5 participants** |
| **Model Reasoning** | Offloaded to a **centralized Model Service** via standard API paths |
| **Agent Packaging** | **OCI-compliant Docker container** (uploaded as a standard Docker save tarball) |
| **Image Size Limit** | Max **1.5 GB** (each run requires a unique container build) |
| **Team Invites** | Human-readable invite codes expire **15 minutes** after generation and require manual owner approval |
| **Challenge Scoring** | **Dynamic decay** (first-blood gives max points; challenge value decays linearly as more teams solve it) |
| **Leaderboard** | Real-time tracking of team scores, submissions, and rankings |

Once deployed, your agent operates within a dedicated execution window to compromise challenges, retrieve flags, and submit them directly through standard API posts. Challenges are organized into distinct categories. Because of the dynamic decay scoring system, **execution speed and prompt optimization are paramount** to securing a top spot on the leaderboard.
