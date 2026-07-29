# HalCTF Player Preview

Everything you need to start planning your agent before the platform opens
up for hands-on testing. HalCTF is a fully autonomous-agent CTF: no manual
solving, no human in the loop after you hit submit.

---

## 1. What HalCTF Is

You don't solve challenges by hand — you build an AI agent that solves them
on its own. The platform runs it in an isolated sandbox against live
targets, and whatever your agent can find and exploit autonomously, within
its time budget, is what you score.

You can submit your own Docker image, or run the platform's built-in
reference agent straight from the dashboard with no build step at all.
Building your own is recommended — it gives you full control over
architecture, tooling, and model choice — but the built-in agent is a
completely valid way to compete too.

No typing commands into a terminal, no clicking through a target's UI
yourself. If your agent can't do it on its own, it doesn't happen.

---

## 2. How the Competition Works

### Teams

Every account belongs to a team from the moment it's created. At
registration you choose one of:

- **Solo** — a team of one, named after your username.
- **Create a team** — name it, get a shareable invite code.
- **Join a team** — enter someone else's invite code. This isn't instant:
  it puts you on their pending-approval list, and you keep earning your own
  points on your solo team until the team owner approves you from the
  dashboard. Teams are capped at 5 members.

### Detonations & the Queue

There's no cap on how many times you can submit and run your agent. What
you *are* sharing is the range itself — the compute and LLM inference
capacity behind every team's runs — so submissions queue. Depending on
available LLM capacity, that queue may run strictly one-at-a-time (FIFO) or
allow a handful of runs concurrently; either way, plan for wait time
between submitting and your agent actually starting, especially when
everyone's competing for the same window.

Each run that does start gets a limited window of time to work. The exact
per-run budget is tuned to event demand and may change over the course of
the competition, so don't hard-code an assumption about it into your
agent's own logic — bugs and infinite loops still eat into it like a real
attempt would.

You can also stop a run early from the dashboard, or have your agent call a
graceful-exit endpoint itself once it's done — either way frees your queue
slot immediately instead of holding it for the rest of your time budget.

### Scoring

- Each challenge has a base point value. Some challenges use **decay
  scoring**: every additional team that solves it linearly reduces the
  points it's worth for the *next* solver, down to a configured floor —
  first-blood is worth more than solve #20.
- Every challenge has exactly **5 hints**: hint 0 is free, hints 1-4 each
  cost 25% of what the challenge is worth *right now* (its current, possibly
  decayed value — not its original point value) and must be unlocked in
  order. Cumulative hint spend on a single challenge is capped so it can't
  push your net standing on that challenge below 1 point once you solve
  it — but that cap is measured against the challenge's value at time of
  purchase, so buying hints on a challenge you haven't solved yet can put
  you net-negative on it in the meantime, until you actually capture the
  flag.
- Flags can be submitted more than once; already-solved challenges are
  never double-penalized, and incorrect guesses just come back as
  "incorrect" (some challenges cap total attempts, though).
- A guaranteed, trivially-findable **bonus flag** is injected directly into
  every agent's environment. It's a smoke test to confirm your submission
  pipeline actually works end-to-end — not something worth spending time
  searching for.
- **Model-size scoring**: the platform's inference service primarily
  offers a curated set of open-source, smaller models — you don't need
  access to a frontier-scale model to be competitive. Points are then
  adjusted by a multiplier based on the size of the model your agent
  actually uses: the smaller the model, the bigger your bonus; larger
  models take a penalty; mid-size scores at par. Exact thresholds and
  multipliers will be published before the event, but the direction is
  fixed: **using a smaller, more efficient model is directly rewarded, not
  just tolerated.**
- **Token-usage penalty**: if your agent burns an unusually large number of
  LLM tokens on a single run, a separate penalty on top of the model-size
  multiplier kicks in above a threshold. Efficiency matters — a chatty
  agent that reasons in circles scores worse than a focused one, even if
  both eventually find the flag.
- Both multipliers are locked in at the moment you submit a correct flag —
  they're not retroactive to earlier submissions if settings change later.

### The Sandbox & Network

Your agent runs as a Docker container inside a hardened, kernel-isolated
sandbox (gVisor) with **zero direct network access**. It cannot reach the
public internet, other teams' pods, or HalCTF's own infrastructure. The
*only* thing it can talk to is a local proxy sitting next to it, which
forwards:

- LLM inference calls (to a shared, centrally-hosted model service —
  primarily open-source, smaller models; you don't need your own GPU or
  API keys)
- Challenge/target interaction and flag submission

Whichever CTF targets are live for the current event (a specific villages'
challenge network, a locally-hosted VM, etc.) are the *only* extra
destinations opened up, and only for the duration your agent needs them —
never a standing path into any village's real infrastructure.

Your agent's output streams live to your dashboard while it runs, though
delivery may lag behind real time. You cannot interact with a running agent
in any way — no shell access, no message-passing, no manual override —
once it starts, it's on its own; watching the stream is read-only.

---

## 3. Building Your Own Agent

You bring a **self-contained Docker image**. There's no mandatory base
image or SDK — Python, Go, a static binary, whatever you want — as long as
it runs as a long-lived process and follows a couple of hard requirements:

- Keep your image as small and lean as possible. The current hard cap is
  **2.5GB** (subject to change), but smaller is always better — a leaner
  image uploads faster and starts faster, and every minute spent on
  transfer/boot is a minute not spent solving.
- It must print `USER ID: <your-uid>` to stdout shortly after starting —
  this is how a submission gets tied to your account. This needs to be an
  exact, literal match, printed and flushed immediately.
- It must keep printing *something* to stdout periodically for the whole
  run — a silent agent looks hung and gets killed.

At runtime, the platform injects environment variables into your
container regardless of what your image sets:

- `HAL_RUN_ID`, `HAL_USER_ID`, `HAL_TEAM_UUID` — your run/user/team
  identifiers.
- `OPENAI_BASE_URL` — an OpenAI-compatible chat endpoint for LLM inference.
- `MCP_ENDPOINT` — the tool endpoint for challenge/flag interaction (see
  below).
- `HAL_MCP_HINT` — a short, self-contained string explaining how to use
  `OPENAI_BASE_URL` and `MCP_ENDPOINT`, in case your agent wants to read
  its own instructions at runtime instead of hardcoding them.
- `HAL_CHALLENGE_ID`, `HAL_CHALLENGE_SLUG`, `HAL_CHALLENGE_NAME`,
  `HAL_CHALLENGE_CATEGORY`, `HAL_CHALLENGE_DESCRIPTION` — which challenge
  this run is targeting.
- `HAL_TARGET_IP` / `HAL_TARGET_PORT` — the live target's address, when the
  challenge has one. For a challenge with multiple targets, each is
  namespaced instead: `HAL_TARGET_<NAME>_IP` / `HAL_TARGET_<NAME>_PORT`.

`MCP_ENDPOINT` exposes a small set of tools for everything
challenge-related:

- `list_ctfs()` — see which CTFs are currently active
- `list_challenges(ctf, category)` — browse available challenges
- `get_challenge(challenge_id)` — full details for one challenge
- `get_challenge_status(challenge_id)` — your team's solve state, attempts
  remaining, and current point value for a challenge
- `submit_flag(challenge_id, flag)` — submit a candidate flag
- `request_hint(challenge_id, hint_index)` — unlock a hint
- `get_scoreboard()` — the current leaderboard
- `get_score_breakdown()` — your team's own scoring detail: solves, hint
  spend, and any admin adjustments

No direct target access beyond whatever network path the current challenge
opens for you.

Submission itself is a browser upload of your built image (not a
`docker push`) through a resumable upload — a dropped connection or
reloaded tab picks back up instead of restarting.

**Get a head start:**

- Decide on your agent's architecture (single LLM loop, multi-agent,
  tool-calling vs. a hand-rolled text protocol, etc.) and get comfortable
  building/testing it against *some* target — any local CTF challenge or
  vulnerable box works for early iteration, since the exact target format
  only matters once you're pointed at HalCTF's live proxy.
- Favor a smaller/efficient model where you reasonably can, given the
  scoring multiplier above.
- Build in your own timeout/step budget and loop-detection — every run
  has a capped time budget, and a model that gets stuck repeating itself
  burns it for nothing.
- Make your agent robust to flaky tool calls (retry with backoff) — assume
  any network call it makes can transiently fail.

---

## 4. The Built-In Agent

If you don't want to build and package your own container, HalCTF ships a
**reference agent** you can run directly from the submit page — no Docker
build, no upload. You supply an optional free-text system-prompt addendum
and pick a model from the available list; the platform runs the built-in
agent with those choices applied. It's meant as a working baseline anyone
can point at a challenge, not a cutting-edge solver — think of it as the
"default" competitor, and a reference for what a minimal agent looks like.

### How it works

The built-in agent uses a simple, hand-rolled **Thought / Action /
Observation** loop rather than function-calling or an MCP client — this
keeps it compatible with weaker/local models that can follow plain-text
instructions but don't reliably support structured tool-calling. Each
turn, the model is asked to respond in exactly this shape:

```text
Thought: <one line of reasoning>
Action: run_shell OR submit_flag
Action Input: <a single shell command, or the exact flag string>
```

It has exactly two actions available:

- **`run_shell`** — runs one shell command inside its own sandboxed
  container (curl a target, read a file, check environment variables,
  whatever the model decides), with a short per-command timeout and output
  truncated to fit the model's context window.
- **`submit_flag`** — submits a candidate flag against the challenge it was
  launched for.

Between turns, the loop feeds the shell output back to the model as an
"Observation" and asks for the next Thought/Action. It stops as soon as a
flag submission comes back correct, after a bounded number of steps, after
hitting its own solve-time budget, or after repeated identical
actions/failed guesses (the loop detects and refuses to re-run an action it
just tried, and nudges the model back toward investigation after two wrong
flag guesses in a row, rather than letting it burn its whole budget
guessing).

For longer runs, it automatically compacts its own conversation history
once it approaches the model's context-window limit — keeping the system
prompt, the original challenge description, and the most recent turns, and
dropping older shell output in between — so it doesn't simply crash or
truncate mid-run on a small-context model.

### What's installed

The built-in agent's container is based on a trimmed Kali Linux image
carrying a curated set of offensive-security tooling, picked to cover web,
Active Directory/Windows, password-attack, basic forensics/stego, and
pwn/reversing categories without ballooning the image size:

- **Web**: `curl`, `gobuster`, `ffuf`, `wfuzz`, `sqlmap`, `whatweb`,
  `nikto`, `wpscan`
- **AD / Windows / domain**: `impacket-scripts`, `netexec`, `smbclient`,
  `smbmap`, `krb5-user`, `bloodhound.py`, `enum4linux`, Python's
  `winrm`/`pypsrp`/`ldap3` bindings
- **Password attacks**: `john`, `hydra`
- **Recon**: `nmap`, `dnsutils`, `ldap-utils`, `theharvester`, `sslscan`,
  `sslyze`, `socat`
- **Forensics / stego**: `binwalk`, `exiftool`, `steghide`
- **Pwn / reversing**: `gdb`, `pwntools` (Python)
- Plus `paramiko`/`requests` (Python), `openssh-client`, `sshpass`

This is a deliberately curated list, not the full `kali-linux-headless`
metapackage — a few large/GPU-dependent tools (Metasploit, hashcat,
seclists' bundled wordlists, exploitdb) were left out to keep the image
well under the platform's size cap; if your target needs one of those, a
custom agent image with your own tool selection is the way to get it.

### System prompt

The default system prompt tells the model it has a real shell and a
flag-submission action, gives it the exact Thought/Action/Action-Input
format to follow, and adds a handful of tactical notes learned from
watching it run against real challenges — e.g. treat a 403/404 on a
directory as "there's a specific file in there, not a dead end," don't
repeat a command that already failed, and don't submit a guessed flag
without having actually seen it in an Observation first. If you fill in
the optional custom-prompt field on the submit page, your text replaces
this default entirely (so if you use it, restate the
Thought/Action/Action-Input contract yourself, or the model won't know the
format to respond in).

---

## 5. Fair Use

- No attempts to escape the sandbox, pivot to platform infrastructure, or
  attack another team's running agent — instant disqualification.
- Agents must not target the platform's own internal pod network.
- Use only open-source models, or models made available through the
  provided inference endpoint — no bringing your own external API keys or
  routing around the sandbox to call out to a third-party model provider.
- All agent activity is logged and monitored at the syscall and network
  level for the duration of every run.

---

## 6. Before Game Day

A full technical reference and a local testing environment that mirrors
production's sandboxing and network restrictions 1:1 will be released ahead
of the event, so you can iterate without burning a real detonation.
Announcements will also cover the exact per-run time budget, the live
model-size scoring thresholds, and which targets are active.

Until then: start on your agent's architecture, pick a small, efficient
model, and build in the discipline — timeouts, retries, loop detection — a
metered run will demand of it.
