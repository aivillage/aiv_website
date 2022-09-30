---
layout: post
title: The AI RMF Does not Address Common Needs
author: Sven Cattell
date: 2022-09-30 09:00:00 +0900
category: "AI Security"
---

**Disclaimer: This does not reflect the AIV as a whole, these are my opinions and this was my response.**

I believe that the Risk Management Framework is lacking in actionable recommendations for model governance, and ignores the long history of model risk management that is employed by companies and organizations that deploy models in adversarial settings. It does address large expensive models well, but the majority of models are disposable models trained on shifting datasets. 

Additionally, the report recommends that models resist adversarial attacks and have some form of explainability. There is a trade off between model security and these two recommendations. A model that resists adversarial attacks is often less secure from an organizational perspective than a model that was designed without this consideration. Explainability gives attackers information that they can use to attack the model. Managing risk has tradeoffs, which is likely understood by the reports audience, but by not mentioning them an org may treat these as requirements for a secure model. 

## Background

The oldest attack against a production AI was likely a word packing attack against Sophos’ spam filter in 2003 (Graham-Cumming). This was against the original bag of words spam model, and the attack is classic (Graham). This started the oldest arms race in machine learning security, with attackers innovating to bypass models and defenders innovating new models. It moved to social media when facebook became prominent and is a required component of those platforms. The bypasses are inevitable, there are too many variables for spammers to tweak and the spam systems have to have an extremely low rate of false positives. Blocking users is very bad for businesses that rely on daily active user metrics. The response to these constant attacks is to constantly retrain & redeploy while developing new features for the model. The features need to be hard to manipulate. The content of a message on Facebook is easy to alter while the user behavior is not, therefore, in 2018, Facebook’s spam model relied on user behavior and ignored content. 

Malware detection used signatures and other brittle mechanisms that required constant maintenance, until the tide of malware got too large for those systems to work (Saxe and Sanders). Now they use machine learning models, and the same old cat and mouse game from spam is still being played. This time, a miss for the defenders could mean a hospital gets ransomed and patients die. To manage this risk the AI is constantly updated. A production malware model requires 99.99% accuracy to be deployable. Below that, the number of false positives becomes too large for security analysts and the model does more harm than good. The low false positives are maintained through the life of the model as benign data doesn’t drift as much as malicious data, but the false negatives spike a [few months after deployment](https://sites.google.com/connect.hku.hk/robustml-2021/accepted-papers/paper-091) indicating a bypass has been found and is widespread.

Most data is dynamic and constantly changing. That’s why a lot of companies originally turn to machine learning. Aside from security models we’ve detailed above, there are many ML systems that drift:
- Recommendations systems drift as user preferences change.
- Financial models drift as markets change with new regulations and products.
- Business forecast models drift with new packaging, competition, and the weather.

Even large language models drift as new slang is introduced and facts change. BeRT thinks Trump is still the President of the US. Image models used in self driving cars drift as new cars and traffic patterns are introduced. Even changes in lenses and camera technology can introduce dataset drift. The only difference is the speed. Malware models require retraining on a monthly basis, but spam models may need a weekly cadence. A model’s dataset may move slowly enough . In all likelihood the majority of data scientists today are employed managing drift by retraining and improving existing models. 

## Issues

### Issue 1: The Lifecycle Recommendations Ignore Known Best Practices

The metrics needed to manage the risks shared by models deployed in adversarial settings like spam and malware are time-to-bypass, and response time. A longer time-to-bypass means a lower likelihood of bypass occurring before the next scheduled retraining and redeployment. A short response time means that when a bypass does occur, the model vendor can respond quickly. This extends beyond models in adversarial settings, Microsoft and OpenAI’s Codex recommended insecure code, and those companies [took months to even respond](https://www.lightbluetouchpaper.org/2022/08/05/the-dynamics-of-industry-wide-disclosure/) to the notification that their model was behaving poorly (Anderson). This is unacceptable in the security industry, and should be unacceptable to the machine learning industry.

Other industries may have their own metrics that rely on drift. Recommendation systems may just track the model’s performance and retrain when it falls below a certain level. Financial firms can do something similar. The response is usually to retrain and redeploy, either proactively, or with minimal delay. This affects all aspects of the model as metrics often rely on the assumption that the model is trained on data that is distributed identically to the test set. Models used to select which candidate to hire will perform worse when they are outdated. The closest mention of the oldest and most understood model risk management that we have is a on page 30: 

> Datasets used to train AI systems may become detached from their original and intended context, or may become stale or outdated relative to deployment context.

For many orgs this isn’t true, the dataset is continually updated because they know it drifts or they just want more data. 

There are several places in the playbook where the report mentions monitoring the AI system for potential issues, but they are general requests for monitoring. There are few suggestions about addressing the problem. 

### Issue 2: Adversarial Robustness Has Significant Drawbacks in Current Models

Adversarial robustness as defined in the academic literature [lowers](https://arxiv.org/abs/2206.10550) [accuracy](https://arxiv.org/abs/1706.06083). This is well known to data scientists, but the report needs to make this clear to the executives and policy makers it targets. In malware, employing techniques that increase model resilience to this not only hamstrings the model, it can lower time-to-bypass for models in adversarial settings. Nearly all security models and data scientists have rejected this definition of robustness as they have found it counter productive. In medical situations, I would not like to have a mis-diagnosis due to a “secure” model. This report may say it is just voluntary recommendations, but it will be seen as best practices. Medical device manufacturers are already employing adversarial robustness to comply with this report and the EU law that is under development. There is a tradeoff and the model’s manufacturer will choose to comply with this report rather than do what’s best for patients if this trade off is not made clear.

## Recommendations

The AI RMF is a good starting point for the development of large one off models, like GPT-3 and StableDiffusion. These are extremely significant models that have a wide socio-economic impact. However, most organizations implement small disposable models trained off of a continuously updating dataset. 

It should include the known best practices from security that apply to AI. Scheduled regular patches, and short response times to critical vulnerabilities are common in the software industry. Microsoft's Patch Tuesday has become an industry standard, but when there's a critical vulnerability they release a patch immediately. Contracts often include response times for critical software patches. External evaluations of security postures has become an industry in of itself.

The RMF should also include known best practices that have been developed in the ML Security community over the last 20 years. The primary failure mode of most AI systems is performance drop over time due to drift, and this is almost missing from the RMF. Drift and monitoring is almost non-existent in part 1 of the document, and vague in part 2. 

For the playbook:
- `GOVERN` should include suggest org establish minium response times for model issues. 
- `MAP` should explicitly call out the drift issue and suggest that the org have minimum performance requirements.
- `MEASURE` should explicitly require continuous monitoring of performance. Orgs will do one off performance evaluations as continuous monitoring can be expensive.
- `MANAGE` should include a suggestion for a scheduled model lifecycle, or performance based triggered redeployments.

Additionally, the `GOVERN` suggestion for an external audit should be more forceful. Internal audits will include the bias of the company and team developing it. I believe that the emergence of AI Red Teams at Microsoft, Nvidia, and Meta will lead to independent AI Red teams that will also specialize in attacking models. These external auditors have fresh eyes that are not as influenced by the business decisions, and will be specialized in model attacks and evaluation. Standards will develop, and the RMF could be a great starting point for this future industry. 


## Works Cited

Graham, Paul. “A Plan for Spam.” Paul Graham, 2002, http://www.paulgraham.com/spam.html. Accessed 29 September 2022.

Graham-Cumming, Paul. How to beat an adaptive spam filter. MIT Spam Conference, 2004.

Saxe, Joshua, and Hillary Sanders. Malware Data Science: Attack Detection and Attribution. No Starch Press, 2018.
