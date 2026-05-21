---
layout: "single"
permalink: /events/2024_talks
toc: true
toc_label: "Talks"
toc_icon: "calendar"
toc_sticky: true
title: "Talks"
---

# August 9

## Opening Remarks

August 9; 1000-1030

**Abstract**

**Authors**

1. Sven Cattell
2. Lauren Putvin
3. Ravin Kumar

## Generative Red Team 2 Kickoff

August 9; 1030-1130

**Abstract**

Come ask us anything about the [GRT2](https://grt.aivillage.org/)! There will be a short presentation about how to participate and the objectives of the event and then you can ask us anything about it and ML flaws and vulnerabilities. 

**Authors**

1. Sven Cattell
2. Will Pearce
3. Jerome Wynne
4. Sean McGregor
5. Nicole DeCario
6. Kent Wilson
 
## BOLABuster: Harnessing LLMs for Automating BOLA Detection

August 9; 1130-1230


**Abstract**

Broken Object Level Authorization (BOLA) is a prevalent vulnerability in modern APIs and web
applications, ranked as the top risk in the OWASP API top 10 and the fourth most reported vulnerability type in HackerOne Global Top 10. The consequences of BOLA can be severe, from sensitive data exposure to a total loss of system control. 

While manually verifying or triggering known BOLAs is typically straightforward, automatically identifying the correct execution sequences and generating viable input values for testing BOLAs is challenging. The complexities of application and business logic, the wide range of input parameters, and the stateful nature of modern web applications all hinder existing static analysis tools from detecting unknown BOLAs.         

To overcome these challenges, we leverage LLM's reasoning and generative capabilities to automate tasks that were previously done manually. These tasks include understanding application logic, uncovering endpoint dependency relationships, generating test cases, and interpreting test results. When combined with heuristics, this AI-backed method enables fully automated BOLA detection at scale. We dub this research BOLABuster.

Although BOLABuster is still in its early stages, it has already discovered multiple new vulnerabilities in open-source projects. In one instance, we submitted 15 CVEs for one project, some leading to critical privilege escalation. Our most recent disclosed vulnerability was CVE-2024-1313, a BOLA vulnerability in Grafana, an open-source project used by over 20 million users.

When benchmarked against other state-of-the-art fuzzing tools using applications with known BOLAs, BOLABuster, on average, sends less than 1% of the API requests to a target server to uncover a BOLA.

In this talk, we will share our methodology and the lessons learned from our research. We invite you to join us to learn about our journey with AI and explore a new approach to conducting vulnerability research.


**Authors**

1. Ravid Mazon (Palo Alto Networks)
2. Jay Chen (Palo Alto Networks)


## AI’ll be watching you. Greybox Attacks against an Embedded AI

August 9; 1330-1430


**Abstract**

AI’ll be watching you will cover attacking an embedded AI on a family of popular security cameras with over 100,000 combined reviews on Amazon. The camera’s embedded AI system is used for on-device person detection, a system that filters notifications based on whether a person is detected. Traditionally the camera would alert the owner if any motion was detected, meaning that an attacker would have to have no motion be detected, but now with the embedded AI making decisions, an attacker needs to only appear not to be human. While this may seem a simple task, dressing up as a giant bush would be noticeable by the people around the attacker, meaning that a successful attack against this system requires the on-camera AI to be tricked while not alerting nearby people to any suspicious disguises.

In this talk we will cover the steps we took to research and gain access to the device in order to perform greybox attacks against its embedded AI. We will demonstrate how we rooted an older version of the device to gain access to how the models were brought to the camera. We will show how the knowledge we gained while reverse engineering let us download the models for any arbitrary device or firmware and, eventually, how we were able to exploit and gain root on the newer, more secure device. We will show the audience our process in which we discovered and reverse-engineered a proprietary model format that we had never seen before. Finally, we will show how, once we understood the model, we were able to perform attacks against both it and the camera.

The purpose of this talk is to raise awareness about the insecurity of embedded AI as well as to demonstrate how known attack techniques can be used on never-before-seen models, showcasing that AI/ML research has truly passed the infant stage and has reached a point where developed methods can be broadly applied.


**Authors**

1. Ryan Tracey (HiddenLayer)
2. Kasimir Schulz (HiddenLayer)
3. Tom Boner (HiddenLayer)


## Removing the Ring of Gyges: Lessons from Securing AI Systems Against File Format Abuse

August 9; 1430-1500


**Abstract**

This talk will focus on the implications of our work defending AI based cybersecurity systems against file format abuse for the design of AI systems for cyber. The audience will learn how the interface between traditional cybersecurity systems and the AI models being integrated into them impacts security. File format abuse enables polyglot files to bypass state-of-the-art malware detection systems (EDR tools) that utilize machine learning in an attempt to catch novel forms of malware. The polyglot file is sent to the wrong model because the embedded file type is not detected. Existing file type, file carving, and polyglot detection tools are insufficient to detect polyglots used by threat actors in the wild. However, we trained a machine learning model capable of detecting all polyglot types in our dataset, which is based on threat actor usage of polyglots in the wild, with over 99.9% accuracy. Content disarm and reconstruct (CDR) tools can also be used to disarm polyglots, but are not effective on all file types. 


**Authors**

1. Sean Oesch (Oak Ridge National Laboratory)
2. Luke Koch (Oak Ridge National Laboratory)
3. Brian Weber (Oak Ridge National Laboratory)
4. Amul Chaulagain (Oak Ridge National Laboratory)
5. Matthew Dixson (Oak Ridge National Laboratory)
6. Jared Dixon (Oak Ridge National Laboratory)
7. Cory Watson (Oak Ridge National Laboratory)


## On Your Ocean's 11 Team, I'm the AI Guy (technically Girl)

August 9; 1500-1600


**Abstract**

One of the best parts of DEF CON is the glitz and glam of Vegas, the gambling capital of the world. Many have explored hacking casinos (on and off stage). Unfortunately, it’s just not like it is portrayed in the Oceans franchise.. in real life there’s much less action, no George Clooney, and it’s a lot harder to pull off a heist than it seems. 

Well fortunately I’m not your typical hacker, I’m an AI hacker. I use adversarial machine learning techniques to disrupt, deceive and disclose information from Artificial Intelligence systems. 
I chose my target carefully: Canberra Casino. It’s the best casino in my city.. It’s also the only casino but that’s not the point. 

The casino industry is at an interesting inflection point. Many large casinos have already adopted AI for surveillance and gameplay monitoring, smaller casinos are starting to make the transition, and there’s only a couple of companies in the world that provide this software. It’s ripe for exploitation. 

In this talk I’m going to show you how I bypassed casino AI systems - facial recognition, surveillance systems and game monitoring. AI Security is the new cyber security threat, and attacks on AI systems could have broad implications including misdiagnoses in medical imaging, navigation errors in autonomous vehicles.. and successful casino heists.


**Author**

1. Harriet Farlow (Mileva Security Labs)

## Day 1 Keynote -- Poison, injection, evasion, oh my! Grounding AI security threats in data driven reality 

August 9; 1600-1700

**Abstracy**

Christina will speak to the latest MITRE ATLAS community efforts focused on
capturing and sharing cross community data on real world AI incidents, expanding the
community's data on vulnerabilities that can arise when using open-source AI models or
data, especially for vulnerabilities that fall outside of the scope of CVE/CWE, and
developing mitigations to defend against these AI security threats and vulnerabilities.

MITRE ATLAS (<atlas.mitre.org>) is a public knowledge base of adversary tactics and
techniques based on real-world attack observations and realistic demonstrations from
artificial intelligence (AI) red teams and security groups. There are a growing number of
vulnerabilities in AI-enabled systems as the incorporation of AI increases the attack
surfaces of existing systems beyond those of traditional cyberattacks. We developed ATLAS
to raise community awareness and readiness for these unique threats, vulnerabilities, and
risks in the broader AI assurance landscape.

# August 10

## Day 2 Keynote - AI-Powered Cybersecurity: The Importance of Red Teamers

August 10; 1000-1100

**Abstract**

As artificial intelligence and machine learning increasingly become the backbone of our cybersecurity infrastructure, we face a new set of ethical challenges that go beyond traditional security concerns. This keynote dives into the critical issues of fairness, transparency, and accountability in AI-driven security systems. We'll explore the relevance of AI ethics to safety and security testing, especially red teaming efforts. Finally, we'll discuss the importance of ethical AI development in cybersecurity, emphasizing the need for diverse development teams, rigorous testing for biases, and ongoing audits of AI systems in production. This keynote aims to spark a crucial conversation in the hacker community about our responsibility to ensure that as we push the boundaries of AI in security, we don't lose sight of the human values and ethical principles that should guide our work.

**Authors**

1. Nikki Pope (NVIDIA)


## garak : A Framework for Large Language Model Red Teaming

August 10; 1130-1230


**Abstract**

Large Language Model (LLM) deployment and integration comes with a need for scalable evaluation of how these models respond to adversarial attacks. However, LLM security is a moving target: models produce unpredictable output, are constantly updated, and the potential adversary is highly diverse: anyone with access to the internet and a decent command of natural language. Further, what constitutes a weakness in one context may not be an issue in a different context; one-fits-all guardrails remain theoretical. It is time to rethink what constitutes ``LLM security'', and pursue a holistic approach to LLM security evaluation, where exploration and discovery of issues are central. To this end, this paper introduces garak (Generative AI Red-teaming and Assessment Kit), a framework which can be used to discover and identify vulnerabilities in a target LLM or dialog system. garak probes an LLM in a structured fashion to discover potential vulnerabilities. The outputs of the framework describe a target model's weaknesses, contribute to an informed discussion of what composes vulnerabilities in unique contexts, and can inform alignment and policy discussions for LLM deployment.


**Authors**

1. Leon Derczynski (NVIDIA Corp)
2. Erick Galinkin (NVIDIA Corp)
3. Jeffrey Martin (NVIDIA Corp)
4. Subho Majumdar (vijil)


## ConfusedPilot: Data Corruption and Leakage by Misusing Copilot for Microsoft 365

August 10; 1330-1430


**Abstract**

The hype for integrating artificial intelligence into an enterprise's daily work has become more prevalent after introducing AI-driven systems that use Retrieval Augmented Generation (RAG), such as Copilot for Microsoft 365. But is the trust in such systems and their control over decision-making processes within enterprises rational? Copilot and other RAG-based systems can be misused to cause dissemination of misinformation that negatively impacts decision-making processes without proper auditing and safeguarding of data available to large language models in RAG-based systems.

This talk will demonstrate such an attack that we have termed ConfusedPilot because of its ability to turn Copilot into a confused deputy. The attack occurs when a malicious document is introduced to the data pool (documents, presentations, other relevant files, etc.) related to a topic affecting the enterprise's decision-making process. The malicious document contains a combination of corrupt data and malicious strings that suppress the correct documents related to the topic and respond to the user's query with only the information present within the malicious document. Furthermore, the talk highlights how this attack can persist after deleting content within the malicious document or the document itself. The talk also points to the larger implications of such attacks, highlighting their cascading effect and existing security measures that can be used to reduce the attack's effectiveness. Our talk sheds light on the current attacks and potential security measures that can shield enterprises from the adverse effects of such attacks on their AI-driven systems.


**Authors**
1. Ayush RoyChowdhury (The University of Texas at Austin)
2. Mulong Luo (The University of Texas at Austin)
3. Mohit Tiwari (The University of Texas at Austin)

## Bridging the Experience Gap in Machine Learning Security

August 10; 1500-1600

**Abstract**

This panel will explore the critical challenges and opportunities in developing a robust workforce for AI and machine learning (ML) security. As AI systems become increasingly prevalent across industries, the need for skilled professionals who can safeguard these technologies against adversarial attacks and vulnerabilities has never been greater.

A key focus of the discussion will be addressing the significant shortage of practitioners with hands-on experience in securing ML models deployed in real-world adversarial environments. Panelists will examine how this lack of battle-tested expertise impacts the industry's ability to defend against sophisticated attacks and discuss strategies for cultivating this essential skill set.

**Authors**
Moderated by Kellee Wicker (Wilson Center)

1. Christine Lai (CISA)
2. David Lo (SMU)
3. Austin Carson (Seed AI)
4. Nick Landers (Dreadnode)


## Evaluations and Guardrails against Prompt Injection attacks on LLM powered-applications

August 10; 1430-1500


**Abstract**

Prompt injections are a class of attacks against LLM-powered applications that exploit the inclusion of untrusted user inputs in LLM prompts. We give an overview of two open source frameworks developed by Meta related to understanding and mitigating prompt injection risks:

- our *CyberSecEval Prompt Injection benchmarks* (evaluations of the propensity of popular LLMs to succumb to prompt injection when used without guardrails), 
- as well as *PromptGuard* (an open-source model for identifying risky inputs to LLM-powered applications, both direct jailbreaks and indirect injections).

Findings of interest:

- *Evaluating foundation model vulnerability to indirect prompt injection:* LLMs can be trained to have contextual awareness of which parts of the input prompt are coming from a trusted user versus an untrusted third party - in particular via inclusion of a system prompt. We share our benchmark for direct and indirect prompt injection susceptibility of foundational LLMs (across a wide variety of attack strategies)  introduced as part of CyberSecEval (an open-source suite of benchmarks for measuring the cybersecurity risks of foundational models). We present the results of these evaluations for currently-popular foundational LLMs. We conclude that model conditioning is not enough to defend against indirect prompt injection risks in most contexts, even with the usage of a system prompt.

- *Guardrailing against prompt injection attacks in real applications:* We present PromptGuard, a model designed for both the detection of direct jailbreak and indirect injection attacks. We highlight the differences between our models and existing malicious prompt detectors (which largely only address direct prompt injection or jailbreaking risks), and the specific risks that can be prevented by utilizing our guardrail in LLM-powered applications. We also show how the model can be fine-tuned to improve application-specific performance.


**Authors**
1. Cyrus Nikolaidis (Meta Platforms, Inc)
2. Faizan Ahmad (Meta Platforms, Inc)


## Photoshop Fantasies

August 11; 1000-1100


**Abstract**

The possibility of an altered photo revising history in a convincing way highlights a salient threat of imaging technology. After all, seeing is believing. Or is it? The examples history has preserved make it clear that the observer is more often than not meant to understand that something has changed. Surprisingly, the objectives of photographic manipulation have remained largely the same since the camera first appeared in the 19th century. The old battleworn techniques have simply evolved to keep pace with technological developments. In this talk, we will learn about the history of photographic manipulation, from the invention of the camera to the advent of generative AI. Importantly, we will consider the reception of photo editing and its relationship to the notion of reality, which is more significant than the technologies themselves. Surprisingly, we will discover that creative myth making has found a new medium to embed itself in. This talk is based on Walter Scheirer's recent book A History of Fake Things on the Internet (Stanford University Press 2023). 


**Author**

1. Walter Scheirer (University of Notre Dame)


## My Conversations with a GenAI-Powered Virtual Kidnapper

August 11; 1100-1130


**Abstract**

For the past few months, I've been seeing how far I can push several commercially available GenAI systems past their ethical boundaries. ... hint: it's way too far.

In this talk, I'll demonstrate how I was able to turn LLMs into a powerful backend for realtime, interactive voice enabled cyber scams. I'll share my prompting strategy, social engineering tactics, the backend systems used, and show how each of these are working innocently in their own right, but enable massive possibilities for deception and harm when combined (in their current form). I’ll also cover a few key insights gained from this research, including unexpected lessons from both successful and unsuccessful attempts.

Note: this session includes demos of a violent and profane chatbot. Please do not attend if that will be offensive to you. 


**Author**

1. Perry Carpenter (KnowBe4, Inc.)

## Generative Red Team 2 Readout & Acknowledgments  

August 11; 12:00-1:00pm

**Abstract**

We're going over the results of the GRT and giving out some awards for our favorite reports. We want to hear from you about how it went and what you liked. 

**Author**

1. Sven Cattell
2. Will Pearce
3. Jerome Wynne
4. Sean McGregor
5. Nicole DeCario
6. Kent Wilson