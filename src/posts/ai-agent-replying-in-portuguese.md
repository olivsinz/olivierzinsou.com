---
title: 'Why My AI Coding Agent Started Replying in Portuguese'
date: '2026-07-28'
excerpt: 'Mid-conversation in French, Claude Code answered in Portuguese. Twice. Both slips landed right after a long block of English.'
category: 'Tooling'
---

Deep in a WordPress build, pair-programming in French with Claude Code, the reply came back in Portuguese. Not a word or two, a full response. I asked for French, we kept going, and twenty minutes later it happened again.

Nothing was broken. No error, no odd setting, and the code and task state stayed intact. Just the wrong Romance language, twice, in one session.

### The seam

Both slips landed at the same moment: right after the agent had processed a long, dense block of English (a technical report from a background task), and right before it had to answer in French. The Portuguese showed up at the handoff.

That timing is the useful part. It hints at why, not just that.

A model has no "French mode" and "Portuguese mode" switches. It predicts one token at a time over a single blended space of every language it has seen. Usually the conversation pins that prediction firmly in one language. But French, Spanish and Portuguese are close neighbours: similar syntax, overlapping vocabulary, near-identical function words. After a long stretch of English, the snap back into a Romance language doesn't always land on the one you were using. It can land on whichever neighbour pulls hardest at that moment.

### What I saw versus what I'm guessing

I can't see the model's attention weights, so I can't claim that's mechanistically what happened. What I observed is a repeatable pattern tied to a specific context transition, and it fits what's generally understood about how multilingual models represent related languages. That's an observation, not a proof, and the "why" is my best guess.

> These tools are statistical predictors, not rule-based translators. At a sharp context transition, you get to see the seams.

### What to do about it

Nothing dramatic. Say "in French, please" and it corrects immediately. No restart, no settings dig.

If you build multilingual workflows on top of these models, expect occasional language drift right after heavy single-language context. Treat it as a one-line correction, not a deeper failure. These tools are statistical predictors, not rule-based translators, and most of the time you'd never notice.
