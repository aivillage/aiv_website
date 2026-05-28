---
layout: post
title: Dimensionality and Adversarial Examples
author: Sven Cattell
date: 2018-05-01 09:00:00 +0900
category: "adversarial ml"
toc: true
canonicalSlug: dimensionality-and-adversarial
legacyUrls:
  - /adversarial%20ml/2018/05/01/dimensionality-and-adversarial.html

---

Welcome to AI Village’s series on adversarial examples. This will focus on image classification attacks as they are simpler to work with and this series is meant to explain the attacks to hackers who have an interest in data science. The underlying principles are the same for attacks against malware/spam/security classifiers, though the implementation varies. This post focuses on the core reason why adversarial examples work, the high dimensional space our data occupies.

## Introduction
Adversarial examples are minor modifications made to a piece of data such that when it’s feed into a machine learning model it incorrectly handles the data. This might be a problem in self driving cars. Someone who disliked self driving trucks could release a large adversarial bumper sticker that confused the vision system and leads to self driving trucks crashing. This is also a problem in malware detection, trivial modifications to the raw bytes of a malware file, like changing the header, could lead to a deep learning system misclassifying the malware sample as benign. Providing a proper defense is crucial for a safe deployment of machine learning in our lives. We define it mathematically as:

**Definition:** Let $$f: \mathbb{R}^N \to \{L_1,L_2, \dots L_n\}$$ be a function whose range is a discrete set of labels, let $$x$$ such that $$f(x) = L_i$$, and let $$\hat{x}$$ such that $$% <![CDATA[
\lVert x-\hat{x} \rVert_p < \epsilon %]]>$$ such that $$f(\hat{x}) = L_j$$ and $$i \neq j$$. Then $$\hat{x}$$ is an adversarial example with threshold $$\epsilon$$.

This mathematical definition is inadequate to cover everything we’d like to call an adversarial example. It doesn’t cover per-pixel classification or segmentation and most NLP situations. However, much of the literature is focused on this mathematical definition. The definition will look familiar to all former calculus students, it is based on the idea of continuity and it relates adversarial examples to discontinuities. Most machine learning systems are continuous (specifically, almost differentiable) by construction, so them showing discontinuous behavior is alarming. It’s not that the math is wrong, it’s just that these systems are demonstrating something related to [chaos](https://en.wikipedia.org/wiki/Chaos_theory). It’s not the same, but to explain why and why it’s likely intractable, we have to make sense of the curse of dimensionality.

## The Shape of Data

For MNIST, the images lie in 784 dimensional space, one dimension per pixel. These dimensions have some spatial relation to each other, we like to think of them as a grid. This spatial relationship is important to some machine learning models, like convolutional layers. For us, we will largely ignore the spatial relations when constructing adversarial examples.

These spatial relations of image vectors can be incorporated into the actual data, an 8 translated around the 28x28 grid remains an 8. This means that “eightness” has at least 2 degrees of freedom, or dimensions. There are more dimensions, small rotations and scaling the 8 up and down a little leave it an 8. These can be incorporated into our training with data-augmentation. But, there are also less obvious ways to modify our chosen 8 and keep it’s “eightness”. For example we can scale the top and bottom holes independently.

Locally to our chosen eight there may be 7 to 10 directions to manipulate it and keep the inherent “eightness”, without doing something outside of what we’d call obvious. These can be combined, so there’s actually many more than just 10 ways to change it in the direction of “eightness”. It’s just that these are combinations of the 7 to 10 inherent ways. This forms a little k-dimensional disk near our favorite 8. This disk is all ways to manipulate the eight and retain “eightness”. This disk lives in the 784 dimensional space, so thinking of a frisbie doesn’t quite hit the mark. It’s really hard to imagine how small this disk is.

So, an 8 has a local set of other, valid 8s, near it that looks like a 7 to 10 dimensional disk in $$\mathbb{R}^{784}$$. These glue together to define a surface of eightness, called a manifold, and mathematicians like to say that “eightness” is a low dimensional manifold embedded in $$\mathbb{R}^{784}$$. This can knot in on itself, and generally be a mess to work with and visualize (this is what tSNE and spectral embeddings try to solve). This manifold has no volume in $$\mathbb{R}^{784}$$, just like a line doesn’t have volume in $$\mathbb{R}^{2}$$ or $$\mathbb{R}^{3}$$. From a mathematician’s perspective this manifold is a nice smooth set and is identified with “eightness”. We say that the dataset of about 5000 eights is sampled from this manifold, with noise. We hope that our model learns to distinguish between this and other manifolds that represent “oneness”, “twoness” and so on.

### Toroidal Example 

<iframe src="/public/material/dimensionality_pointcloud.html" frameborder="0" marginwidth="0" marginheight="0" width="100%" height="500" scrolling="no"></iframe>

In the above example we've sampled our data from a torus with relatively little noise. This is a 2 dimensional surface embedded in 3 dimensions. So, locally we have 2 degrees of freedom to manipulate, giving us a 2 dimensional disk around our chosen point. If you hide the main torus you can see the little area around the disk approximates a plane, it's pretty flat. What we can do to figure out the disk associated to the point is a local principal component analysis. That is we do a PCA on the nearest few hundred points. This will tell us which directions the local neighborhood varies most in.

## The Curse of Dimensionality

The data set is sampled from human drawn eights and is nice and clean. What, traditionally, wasn’t done, was to manipulate the just the top left pixel. This has nothing to do with “eightness” to humans, but the ML system doesn’t “think” like us. To account for this we should throw in even more generated examples where we add random noise to each element of our training set. We know that adversarial examples are close to our image. How many extra generated samples would we need?

Our images lie in 784 dimensional space, but they are only encoded, per pixel, by 8 bits. Suppose we just wanted to 100% guarantee protection against least significant bit twiddling. We can flip the least significant bit of all 784 dimensions, giving us $$\mathbb{2}^{784}$$ combinations! There is no way to test even a decent fraction of these. This is the essence of the [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality). Even if we add many thousands of points uniformly sampled from this space to each of our dataset we wouldn’t be able to guarantee protection. To train these models perfectly would be like cracking thousands of completely random 20 character passwords. 

From the literature it seems that the adversarial examples might form their own [subspace](https://openreview.net/pdf?id=B1gJ1L2aW). Say we have an adversarial area close by that is inherently 20 dimensional. This is just like the the local eight-space described above, but comes about from the model, not the data. Because we needed much more data than we could possibly generate there are areas where the machine learning model was not trained to handle. We would like the ML model to generalize to these areas, but if you go off in specific weird directions the models seem to break.

It’s basically impossible to visualize how these low dimensional spaces look, but think of the 20 adversarial directions as $$2^{20}$$ “bad” combinations in the above combinatorial example. So the chance of hitting a bad combination is $$\frac{2^{20}}{2^{784}} = 2^{-764}$$, or basically 0. The probability of randomly hitting these is incredibly low, but there are many adversarial generation techniques that could unveil them to an attacker. You don’t know what technique will be used to generate the adversarial sample and you don’t know if they have a new one that you don’t know about. So, the challenge is to train a deep learning system that doesn’t have any adversarial examples close to good data.

### Another Toroidal Example 
<iframe src="/public/material/adversarial_pointcloud.html" frameborder="0" marginwidth="0" marginheight="0" width="100%" height="500" scrolling="no"></iframe>

This time if we look at a low dimensional example where we have 2 point clouds for 2 classes, a green class and a blue class. These two point clouds are all that the classifier ever saw while training. We'd hope that the classifier learns two tori, but that's not what happens. Even in perfect [conditions](https://arxiv.org/abs/1801.02774) the classifiers we use just don't pay attention to the shape of the data very well. The adversarial examples (in red) near the point we're interested in (indicated by the disk) form a 1 dimensional line, with a bit of noise. This could have been caused by many different artifacts in the interaction between the data and the classifier. Since there's no data sampled from this area for training, there's noting to correct the classifier when we input them. This is the low dimensional case, the data in the high dimensional case is far more sparse and there's many more nooks and cranies for these adversarial examples to live. 

## Work Around?
We have techniques to generate adversarial examples, so why don’t we generate them and add them to the training set? This is the core idea of adversarial training, first tried [here](https://arxiv.org/abs/1412.6572). Goodfellow, Shlens and Szegedy used a fast means of generating adversarial examples to augment the data set, the Fast Gradient Sign Method (FGSM), to augment the dataset. This ought to fix the model slowly by removing adversarial directions from the model. This, however is not what happens. The model learns to artificially create a steep gradient in a non-adversarial direction ([see the ensemble paper](https://arxiv.org/abs/1705.07204)). This leads the FGSM to jump in a safe direction and not an adversarial direction. Thus all this training technique accomplishes is training the neural network to mask it’s gradient. This is easy for it to do as it’s usually heavily over parameterized. The ensemble paper also outlines a defense where you trade off the attacks between many models. This seems to work, but the result may be susceptible to non-traditional adversarial attacks.

## Conclusion
To properly defend from adversarial attacks in all forms, not just the strict mathematical definition, is probably going to require some major changes to deep learning (and other forms of machine learning). This is probably the most interesting field to work in as it’s at the heart of why deep learning works. It also has major implications for security applications of deep learning, malware signatures will probably be replaced by deep learning models. The cat and mouse game of bypassing virus scanners will eventually be a question of the security of your model against adversarial examples.
