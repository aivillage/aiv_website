---
title: "AI Village @ DEF CON China 1"
date: 2018-05-01 
description: "Join AI Village at DEF CON China 1."
location: "Beijing, China"
layout: single
---

 Time | 12 May (Sat)                                                                                 | 13 May (Sun)
:----:|:--------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------:
 1000 | Village Exhibits                                                                             | Machine Learning as a Tool for Societal Exploitation: A Summary on the Current and Future State of Affairs <br/>- F1F1cin
 1100 | StuxNNet: Practical Live Memory Attacks on Machine Learning Systems <br/>- Raphael Norwitz   | Scrutinizing the Weakness and Strength of AI Systems <br/>- Dr Xinyu Xing, Dr Jimmy Su, Wenbo Guo
 1200 | Machine learning model hardening for fun and profit <br/>- Ariel Herbert-Voss                | StuxNNet: Practical Live Memory Attacks on Machine Learning Systems <br/>- Raphael Norwitz
 1300 | AI vs AI: Undercover the Billions of Black Market in e-Commerce <br/>- Dr Bin Zhao, Jin Yang | Facilitating Postmortem Program Analysis with Deep Learning <br/>- Dr Xinyu Xing, Dr Jimmy Su, Wenbo Guo
 1400 | WORKSHOP: Pwning Machine Learning Systems <br/>- Clarence Chio                               | Closing
 1700 | Village Exhibits                                                                             | -

---
# Abstracts

### StuxNNet: Practical Live Memory Attacks on Machine Learning Systems
[slides](material/cn18-norwitz/slides.pdf), [video 1](material/cn18-norwitz/pdf_naieve.mp4), [video 2](material/cn18-norwitz/pdf_trojan.mp4)

Like all software systems, the execution of machine learning models is dictated by logic represented as data in memory. Unlike traditional software, machine learning systems' behavior depends less on precise machine opcodes and more on weight vectors and bias parameters. In terms of possible threat models this makes a huge difference: an attacker cannot arbitrarily perturb the program code of a typical executable and have it run error free, however these weight and bias values can be scrambled arbitrarily without any risk of causing a crash. With selective retraining and backpropagation, we demonstrate how one can easily retrain networks to behave completely differently or respond predictably to certain triggers. Thus an attacker looking to compromise an ML system can simply patch these values in live memory, thereby taking control of system with minimal risk of system malfunctions or other detectable side-effects. In this talk, we demonstrate proof of concept malware to attack Neural Networks on Windows 7 and discuss different training paradigms we've used. In particular, we focus on minimizing the size of the patch needed to change the model's behavior to prove an attack with realistic bounds on network communication. We hope that seeing our malware run against various different frameworks - and showcasing devastating potential of a patched network - will provide valuable insight into the mechanisms tomorrow's hackers could use, and spark a discussion around systems level AI security.
#### Speaker Bio
**Raphael Norwitz** is a recent graduate from Columbia University with a BA in Computer Science and MS in Machine Learning, and an incoming engineer on the Acropolis Hypervisor team at Nutanix. He has experience with Linux Kernel development, data science and malware analysis. He has interned at Google, Drawbridge, and Nimbledroid, and has published research with Columbia's Wireless and Mobile Networking lab. For fun, he likes to be outdoors and train Brazilian Ju-Jitsu.

---

### Machine learning model hardening for fun and profit
[slides](material/cn18-voss/slides.pdf)

Machine learning has been widely and enthusiastically applied to a variety of problems to great success and is increasingly used to develop systems that handle sensitive data - despite having seen that for out-of-the-box applications, determined adversaries can extract the training data set and other sensitive information. Suggested techniques for improving the privacy and security of these systems include differential privacy, homomorphic encryption, and secure multi-party computation. In this talk, we’ll take a look at the modern machine learning pipeline and identify the threat models that are solved using these techniques. We’ll evaluate the possible costs to accuracy and time complexity and present practical application tips for model hardening.
#### Speaker Bio
**Ariel Herbert-Voss** is a PhD student at Harvard University, where she specializes in deep learning, cybersecurity, and mathematical optimization. Like many machine learning researchers, she spent plenty of time thinking about deep learning from a computational neuroscience point of view without realizing that skulls make biological neural networks a lot less hackable than artificial ones. Now she thinks about securing deep learning algorithms and offensive applications.

---

### AI vs AI: Undercover the Billions of Black Market in e-Commerce
[slides](material/cn18-zhao/slides.pdf)

Black market in e-Commerce is an industry of billions of dollars drawing thousands of scalpers and hackers. Traditionally, this black market is full of manual labor and low technology. The booming development of AI has also seen a vast abuse of AI technologies in this black market. This evolving black market costs billions of losses to e-Commerce companies, like Alibaba and Amazon. It also undermines the reputation of them. How to fight this black market and win back customers? We undercover the industrial chain of this black market and the detailed social division of labor, as well as various advanced tools. We also developed an AI-based defense system to intercept and block the malicious or suspicious transactions. Our evaluation on the system shows that we have lower than 0.5% false positives on malicious or scalping transactions and orders.
#### Speaker Bio
**Dr. Bin Zhao** (SOLO PRESENTER) graduated from the Cyber Security Lab at the Pennsylvania State University in 2015. His primary interests are network security, software security, mobile data leakage, and network protocol analysis. After graduating, he worked for Palo Alto Networks and was responsible for the core products Application Identification (AppID) and IPS. As a senior staff engineer, he led the development of SSL-based Clientless VPN. Currently he is working in JD.com Silicon Valley R&D Center as a security architect. He is mainly responsible for anti-leakage on mobile app data and financial information, black market information mining.

**Jin Yang** got her master’s degree from Carnegie Mellon University in 2014. She joined FireEye as a software engineer. She worked on distributed system, developed and tested the Java-based APIs. She developed Python based software infrastructure and components for automatic rule generation. Later she joined Google as a SE and working on the big data platform. She joined JD.com Silicon Valley R&D center in June 2017 and is primarily responsible for scalping order interception.

---

### WORKSHOP: Pwning Machine Learning Systems
[docker container](https://hub.docker.com/r/cchio/dccn18/)

Pwning machine learning systems is an offensive-focused workshop that gives attendees a whirlwind introduction to the world of adversarial machine learning. This two-hour workshop will not be your run-of-the-mill introduction to machine learning course, (are you kidding? you can get that from a thousand different places online!) but will focus on hands-on examples, and actually attacking these systems. Every concept covered in this workshop will be backed-up with either a worked example or a challenge activity, with minimal lecturing and maximum "doing". By the end of the workshop, students will be able to start pwning machine-learning-powered malware classifiers, intrusion detectors, and WAFs. We will cover two major kinds of attacks on machine learning and deep learning systems - model poisoning and adversarial generation. As a bonus, attendees will emerge from the session with a fully-upgraded machine learning B.S. detector, giving them the ability to call B.S. on any "next-generation system" that claims to be impenetrable because of machine learning. This is an intermediate technical class suitable for attendees with some ability to read and write basic Python code. To get the most out of this workshop, surface-level understanding of machine learning is good. (be able to give a one-line answer to the question - "What is machine learning?")

#### Speaker Bio
**Clarence Chio** is an engineer and entrepreneur who has given talks, workshops, and trainings on machine learning and security at DEF CON, BLACK HAT, and other security/software engineering conferences/meetups across more than a dozen countries. He is a co-author of the new O'Reilly Book "Machine Learning & Security: Protecting Systems with Data and Algorithms". He was previously a member of the security research team at Shape Security, a community speaker with Intel, and a security consultant for Oracle. Clarence advises a handful of startups on security data science, and is the founder and organizer of the “Data Mining for Cyber Security” meetup group, the largest gathering of security data scientists in the San Francisco Bay Area. He holds a B.S. and M.S. in Computer Science from Stanford University, specializing in data mining and artificial intelligence.

---

### Machine Learning as a Tool for Societal Exploitation: A Summary on the Current and Future State of Affairs
[slides](material/cn18-f1f1cin/slides.pdf)

Starting with a short analysis on the current state of ML-related security, ranging from location mapping through ambient sounds to Quantum Black's sports-related work and various endpoint detection systems in different states of development, we move towards discussion on the adoption of machine learning to escalate cyber warfare. We end with the concept of 'tricking' machine learning software in order to lessen its impact on actors regardless of their affiliation and show a simple instance of the effect this 'tricking' can have on human profiling (such as that done by the advertising giants).

#### Speaker Bio
**F1F1cin** is a computer science student and researcher at Columbia University who definitely does (not) suffer from an unhealthy malware obsession. You can usually find F1F1cin strolling in the land of VirusBay, where this interest has been continuously fed, placing F1F1cin among the top contributors of the platform. Their interest in cyberwarfare and societal policy was initiated by S. Bellovin through his Computers and Society course at the university. This talk is fairly out of the ordinary for F1F1cin, but that's okay. (We will soon be dealing with human-targeted malware anyway.)

---

### Scrutinizing the Weakness and Strength of AI Systems
[slides](material/cn18-guo/slides1.pdf)

Simpler machine learning (ML) methods like decision tree and K-nearest neighbor have limited classification capability but provide better transparency. As a result, they can provide end users with an explanation of individual decisions and even allow them to scrutinize model strengths and weaknesses.

In comparison with those simple learning techniques above, complex learning models (e.g., deep neural networks) typically exhibit tremendous improvement in classification performance. However, they are almost completely opaque, even to the engineers that build them. Presumably as such, they have not yet been widely adopted in critical problem domains, such as defending against cyber attacks, diagnosing deadly diseases and making million-dollar trading decisions.

In this talk, my colleague and I will introduce a series of techniques that can yield explanations for the individual decision of a machine learning model and, more importantly, facilitate one to scrutinize a model's overall strengths and weaknesses. We will demonstrate how we could potentially utilize these techniques to examine and patch the weakness of our machine learning products.

#### Speaker Bio

**Wenbo Guo** (SOLO PRESENTER) is a Ph.D. student in the College of information Science and Technology at Pennsylvania State University. Currently, he is a research intern at JD security research center in Silicon Valley. Before joining the Penn State, he got his Master degree from Shanghai Jiao Tong University in 2017. His research mainly focuses on deep learning as well as its applications in program analysis and security. More specifically, He specializes in interpreting and scrutinizing deep learning models and designing novel deep learning models for binary and malware analysis. He has published several research papers in the high quality journals and conferences, including the top-tier conference in data mining: ACM SIGKDD Conference on Knowledge Discovery and Data Mining.

**Dr. Jimmy Su** leads the JD security research center in Silicon Valley. He joined JD in January 2017. Before joining JD, he was the director of advanced threat research at FireEye Labs. He led the research and development of multiple world leading security products at FireEye, including network security, email security, mobile security, fraud detection, and end-point security. He led a global team including members from the United States, Pakistan, and Singapore from research to product releases on the FireEye's first machine learning based malware similarity analysis Cloud platform. This key technology advance was released on all core FireEye products including network security, email security, and mobile security. He won the Q2 2016 FireEye innovation award for his seminal work on similarity analysis. He earned his PhD degree in Computer Science at the University of California, Berkeley in 2010. After his graduation, he joined Professor Dawn Song's team as a post doc focusing on similarity analysis of x86 and Android applications. In 2011, he joined Professor Song in the mobile security startup Ensighta, leading the research and development of the automatic malware analysis platform. Ensighta was acquired by FireEye in December of 2012. He joined FireEye through the acquisition. JD security research center in Silicon Valley focuses on these seven areas: account security, APT detection, bot detection, data security, AI applications in security, Big Data applications in security, and IoT security.

**Dr. Xinyu Xing** is an Assistant Professor at the Pennsylvania State University. Currently, he is a visiting professor at JD security research center in Silicon Valley. His research interest includes exploring, designing and developing tools to automate vulnerability discovery, failure reproduction, vulnerability diagnosis (and triage), exploit and security patch generation. Recently, he is also interested in developing deep learning techniques to perform highly accurate binary and malware analysis. His past research has been featured by many mainstream medium, such as Technology Review, New Scientists and NYTimes etc. He was also the organizer of NSA memory corruption forensics competition.​

---

### Facilitating Postmortem Program Analysis with Deep Learning
[slides](material/cn18-guo/slides2.pdf)

In many postmortem program analysis tasks, a security analyst is forced to track down the root cause of a software crash at the binary level without the source code at hand. To do that, the analyst typically needs to analyze a crash dump, identify the execution path leading to the crash, and perform data flow analysis against the identified path. Since data flow analysis requires the support of points-to analysis, the effectiveness of the postmortem program analysis heavily relies upon the capability of distinguishing memory alias.

To address this issue, value-set analysis techniques are typically used. However, they are unsatisfactory for alias analysis particularly in the context of software failure diagnosis. In this talk, my colleague and I will introduce a recurrent neural network architecture to enhance the capability of memory alias analysis, especially in the context of software failure diagnosis. Along with this talk, we will demonstrate our neural network can significantly improve value-set analysis with respect to its capability in analyzing memory aliases and, more importantly, escalate the capability of a security analyst in tracking down the root cause of software failure.

#### Speaker Bio

See above