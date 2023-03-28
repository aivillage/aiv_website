---
layout: post
title: The Spherical Cow of ML Security
author: Sven Cattell
date: 2023-03-25 09:00:00 +0900
category: "adversarial ml"
---

# The Spherical Cow of Machine Learning Security

First of all, these are my opinions and there are people at AI Village who may disagree with me. I want to present the simplest version of managing risk of a ML model as I believe the conversation quickly gets distracted by technical details or social implications that are more exciting to think about. I want to focus on the simplest version of the problem where you do not worry about particular vulnerabilities in the machine learning algorithm. I also want to postpone the social & ethical issues until after the basic model has been established. In physics terms I want to talk about a [spherical cow](https://en.wikipedia.org/wiki/Spherical_cow), but I believe in ML Security's case this cow exists and is ignored by the authors of NIST's AI Risk Management Framework and the EU AI Act.

## The Social Contract of ML 

One of the first lessons people learn about ML systems is that they are fallible. All of them are sold, whether implicitly or explicitly, with an efficacy measure. No ML classifier is 100% accurate, no LLM is guaranteed to not generate problematic text. Vendors and customers understand this. Though, dubious marketing often tries to muddy this. The ML is allowed to make mistakes, missing some spam is OK for a spam model. Even safety critical systems, like self driving cars, allow for this. We can quickly get back into the technical & ethical reality.  

The ML's efficacy guarantees need to be measurable and externally auditable, which is where things get tricky. Companies do not want to tell you when there's a problem, or enable a customer to audit them. They would prefer ML to be "black magic". Each mistake can be called a one off error blamed on the error rate the ML is allowed to have, if there's no way for the public to verify the efficacy of the ML. In the case of a business to business vendor-customer relationship the customer should have tools to audit this. This already kind-of happens in some industries, a SIEM gives enterprise anti-virus customers some idea of the malware model's efficacy. If the ML model is being used in a model sold to the public, like a image filter, then it needs to be externally auditable. 

Finally, the models _will_ break. The underlying data will drift, and they will not generalize to new situations. 

The contract between the vendor and customer/stakeholders should explicitly lay out:
1. the efficacy guarantee,
2. how the efficacy guarantee is measured,
2. the remediation when that guarantee is not met.

ML Companies are bad at points 2 and 3, and do not want to publicaly do 1. 