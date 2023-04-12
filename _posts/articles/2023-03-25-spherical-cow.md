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

Finally, the models _will_ break. At some point the deployed model's efficacy will drop to an unacceptable point and it will be an old stale model. The underlying data will drift, and they will not generalize to new situations. Even massive foundational models, like image classification and large language models will go stale. Someone is going to eventually design a car that an image model misclassifies, though this may take many years to do. Most other models go stale faster. To combat this financial, spam, malware, moderation, recommendation, and many others have a retraining cycle measured in months to days to hours. If they fail prematurely, the company has to release a new model as fast as possible. Spending a week on manual verification of model quality that could be largely automated and done in a couple hours is unacceptable if a model is causing harm.   

The contract between the vendor and customer/stakeholders should explicitly lay out:
1. the efficacy guarantee,
2. how the efficacy guarantee is measured,
3. the time to remediation when that guarantee is not met.

# Real World Issues

## The Contract and Power Dynamics 

There's a strong incentive to not make these guarantees as maintaining them is expensive. When the machine learning teams are internal facing and answerable to other parts of the same organization, like Gmail's spam team, these are often stringently maintained. External facing models, like business to business and business to consumer, often do not come with these recommendations. The larger the disparity between the model provider, who sees all the data, and the model consumers, who each see only part of the data, the worse these get. Internally facing teams are at one end of the power dynamic where their entire role is to maintain those guarantees and are closely watched by upper management. The other end is the business to consumer models where each person only sees their tiny fraction of the data. The purpose of the team is usually to make money, and they make model choices designed to extract money out of consumers while lowering costs. 

## Measurement

The efficacy guarantee might be impossible to accurately measure. The exact false positive and false negative rate for a spam detector over the last hour or day is extremely hard to measure. There are proxies, the number of spam reports is a very good one, but they are not ideal. The number of reports is delayed and the accuracy varies with user bases's moods and the impact of the spam. Also, only one population or client may be dealing with a spike in spam. If the rest of the user base isn't seeing that spam your reports number might look good. The way the data landscape is shifting is biased. 

## Sampling Bias

These guarantees may only work for large populations, and may not be accurate for subpopulations. This requires that the efficacy guarantee has some subpopulation breakdown that ensures that the AI system actually works for the customer. This can be a socioeconomic breakdown, based on age, sex, gender, or race, but it can also be a market breakdown. Catching 99.995% of all malware is great, but if you're only accurate to 99.0% for the subpopulation of ransomware your product might be useless to customers. Additionally, each customer suffers from their own sampling bias so solving this can be extremely difficult.

## Lack of Data for Remediation 

If a model isn't performing well the only ways to fix it is to retrain or finetune the model. This can be impossible if there isn't enough data to fix the problem. If just one over-represented sample out of millions is causing the efficacy guarantees to break, then retraining with that sample might not fix the model. There might be other solutions in the ML system that can re-enable the guarantee, like manually overriding the ML for that sample. Microsoft's Codex [suggested C code that](https://www.lightbluetouchpaper.org/2022/08/05/the-dynamics-of-industry-wide-disclosure/) included obvious memory vulnerabilities. This is because a lot of old open source C code includes these. At the time RLHF didn't exist, so the only solution apparent to the engineers was to either remove the vulnerable code in the dataset or augment the dataset by somehow repairing the vulnerable code. Neither were viable, so the maintainers ignored it, and ignored the security researchers contacting them. Now we have a mechanism for addressing this particular issue in generative models, but similar issues have arisen in other contexts.

# Conclusion

While there are real world constraints preventing this from applying perfectly, this is still a valuable framework for addressing ML risks. Optimizing for the greatest efficacy that your customers care about, and creating ways of measuring it (even if they're just approximations) forces you to ignore the shiny exciting things that may not affect the customer. Adversarial examples are great, but they don't show up in the real world all that often. It's better to focus on the model manipulations the attackers actually use. The final point incentivises finding issues quickly, preferably before they impact your customer, and starting a remediation process that is as fast as possible. 

