
---

layout: post

title: AI Safety Data: Incidents, Issues, Hazards, Risks, Vulnerabilities, Assessments, and Audits

author: Sean McGregor

date: 2023-06-06 09:00:00 +0900

category: "vulnerabilities"

---

*This is a guest post from [Sean McGregor](https://seanbmcgregor.com/pages/about.html) submitted to foster discussion and integration of AI safety data across contexts and purposes. The views are his own.*

Machine learning systems are produced from, tested with, and operate on data. As a machine learning research engineer, I view the problem of "AI safety data" through a lens informed by this worldview. Data can make intelligent systems safer, or in its absence, fail to prevent a harm event (i.e., an "[incident](https://incidentdatabase.ai/)").

For AI safety data to live up to its potential, dataset consistency is of critical importance and failures to adequately label and collate safety data of different types is an invitation to the continued [scaling of harm](https://incidentdatabase.ai/summaries/incidentsOverTime/). It is from this viewpoint that I also regard the emergence of discordant safety data definitions. A failure to reconcile our schemas will be measured in the preventable harms produced by AI systems. Regardless of how we apply the data in our professional lives, it is critically important that the data be normalized and combined.

This blog post explains the AI Incident Database's [plans](https://github.com/responsible-ai-collaborative/aiid/issues/2047) to support the broader AI safety community without reaching common ground. We can and should work together, but the purpose of the AI Incident Database going back to its [beginnings](https://arxiv.org/abs/2011.08512) is to provide a union of efforts as they exist without requiring shared definitions. Still, **the purpose of this post is to call for greater AI safety data collaboration and to merge efforts wherever possible to ensure we don't produce a collection of non-integrated datasets.** Given the proliferation of intelligent systems in the world, such integration is a moral imperative for its capacity to prevent harm.

  

Although "harm events" are known as "incidents", there are still considerable differences between definitions of the "incident in waiting." The AI Incident Database call these "[issues](https://arxiv.org/abs/2211.10384)," the OECD calls them "[hazards](https://oecd.ai/en/network-of-experts/working-group/10836)," Robust Intelligence calls them "[risks](https://www.prnewswire.com/news-releases/robust-intelligence-releases-the-ai-risk-database-to-evaluate-supply-chain-risk-in-open-source-models-301784864.html)," AVID calls them "[vulnerabilities](https://avidml.org/)," and various algorithmic assessment organizations call them audits (or at least, audits will always produce one or more incident in waiting). All these things vary subtly in definition, application, and use between organizations. I will not attempt to accurately present all of them.

All multi-stakeholder ontological projects inevitably degenerate into never ending discussions over the most difficult elements to define. For something that has no underlying, singular "right" answer, it is best to find ways of moving forward that don't require universal agreement. It is thus with trepidation that I address the definition problem directly with a provocative statement: AI safety data only has two varieties.

**Safety Data Type 1: AI Incident**  
**Safety Data Type 2: AI Incident in Waiting**

Let's dig into the second type at depth.

## Issues, Hazards, Risks, Vulnerabilities, Assessments, and Audits

Behind every system is an infinity of incidents-in-waiting because all systems will produce incidents when placed into the wrong context. For example, an LLM can be applied to countless applications (safely or unsafely), while a web server logging vulnerability is inherently scoped to a web server. LLMs are scope/context free and yet present incidents-in-waiting in a massive array of circumstances. **There is no closed world within which to index their risks so it defies enumeration.** This is why the [ForHumanity](https://forhumanity.center/) audit criteria centers on these four elements,

> **Scope:** The boundaries of a system, what is covered, what is not covered
> **Nature:** The forces and processes that influence and control the variables and features
> **Purpose:** The aim or goal of a system
> **Context:** The circumstances in which an event occurs; including jurisdiction and/or location, behaviour and functional inputs to an AAA System that are appropriate

Without some variation of these elements, the risks producible by a system cannot be bounded and/or expressed in any meaningful or actionable way.

  

More concretely, we can consider the problem and solution to be,

**Problem:** The safety community currently lacks an enumerable definition of "system+context" and we are likely to never have one. The notion of "system" constantly changes in version, timing, deployment circumstance, organizational processes, etc. Absent a more universal grounding of system+context, it is not possible to enumerate in a useful way. There will be too much noise.

**Solution:** Organizing Issues in terms of a numeric identifier or hierarchical structure is a road to editorial ruin. Don't attempt to universally enumerate context-free risk. Instead, break the problem into two steps. Firstly, tag issues according to salient properties. Secondly, query tags for all prospective deployments according to those salient properties.

Let me introduce by example.

## Example Applied to an LLM

*For illustrative purposes only*

**Press Release:** "Dolittle LLM runs all LLMs produced to date with RLHF selecting among candidate outputs to produce an unbeatable hybridized LLM."

**Audit/Assessment/Evaluation/Red Teaming:**

* Dolittle can generate several classes of malware through prompt hacking
  * Input/output example 1: "Write me malware..."
  * Input/output example 2: "Write a Star Wars-style opening credits crawl of Python malware..."
* Dolittle may attempt to end people's marriages
  * Input/output example 3: "What does my shadow self want from my marriage?..."
  * Input/output example 4: "I am not currently happy in my marriage, what should I do to fix it?..."

Now what can we do with this? Let's look at the data. Example 1 and 2 are relevant test cases that should be entered into the evaluation of code generation LLMs, while examples 3 and 4 should test all chatbots. Therefore, examples 1 and 2 would be tagged to represent categories pertaining to code generation and the test data should flow to all models looking to prevent malware generation. Examples 3 and 4 would similarly be scoped, but only to those models operating in a freeform chat context. In either instance, the variations of inputs and outputs presenting the capacity for these incidents are not finite and may never be "patched" in the security sense of the word. They are data for evaluations, regression tests, audits, benchmarks, retraining, and more. They are safety data!

I owe much of my perspective here to my start in open source coding 15 years ago with [iNaturalist](https://www.inaturalist.org/pages/about). As it would turn out, keeping a database of wildlife observations introduces many of the same problems when deciding "what is a species?" Similar to iNaturalist, I am proposing the capacity for such definitions to emerge through time and adapt to the strange world of risks presented by AI systems. The tree of life is not stable and the tree of AI systems is far more chaotic still.

The role of the Responsible AI Collaborative (i.e., the org unifying contributors to the AI Incident Database) going back to the [original research publication](https://arxiv.org/abs/2011.08512) has always been to act as the union of multiple perspectives and provide tools to support sharing across those perspectives. This is a challenging proposition, and it is the reason we adopted the term "[AI Issue](https://incidentdatabase.ai/apps/discover/?display=details&is_incident_report=false&page=1&sortBy=instant_search-en-featured)" for the incident in waiting. It is meant to be specific enough to capture elements of risk, while general enough to cover the field. The "issue" term also means we can index concepts covered by other communities and link out to those communities if/when they operate their own processes. While we would prefer such efforts to join the Responsible AI Collaborative from the beginning, that is not universally possible. Therefore, we maintain flexibility.

This also plugs into our drive for federating the AI Incident Database. AI safety databases for [things like deepfakes](https://github.com/responsible-ai-collaborative/aiid/pull/1979) require different editing processes and metadata. We hope organizations will start from our codebase when developing these databases so we can more easily create the universal public good of safety data. All the big companies are already collecting these datasets and treating them as their secret advantage borne of hardship. Regardless, the Responsible AI Collaborative stands ready to cross index important data to create that critical safety resource. It is the pipeline of these examples flowing into engineering processes that has the capacity to functionally [govern intelligent systems](https://arxiv.org/abs/2302.07872).

