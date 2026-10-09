---
title: 'Why My AI Coding Agent Started Replying in Portuguese'
date: '2026-07-28'
excerpt: 'Mid-conversation in French, Claude Code answered in Portuguese. Twice. Both slips landed right after a long block of English.'
category: 'Tooling'
---

I was deep in a WordPress build, pair-programming in French with Claude Code, when it happened: mid-conversation, the agent replied in Portuguese. Not a word or two, a full response. I switched back to French, we kept working, and twenty minutes later it happened again.

Nothing was broken. No error, no crash, no weird setting. Just the wrong Romance language, twice, in the same session.

## The pattern behind the glitch

Both times, the slip landed right after the same kind of moment: the agent had just finished processing a long, dense block of English text (a technical report from a background task) and then had to produce its next reply in French. The Portuguese showed up exactly at that seam, the handoff from a long stretch of English back into French.

That timing is the useful part. It points at *why* this happens, not just *that* it happens.

Large language models don't store separate "French mode" or "Portuguese mode" switches. They predict text one token at a time, over a single blended probability space that covers every language they've been trained on. Most of the time, the surrounding conversation pins that prediction firmly in one language, so it stays put. But French, Spanish, and Portuguese aren't just "different languages" to a model like this, they're close neighbors: similar syntax, overlapping vocabulary, near-identical function words. When the model has just spent a lot of tokens deep in a different language entirely (English, in my case) and then needs to snap back into a Romance language, the snap doesn't always land on the exact one you were using. It can land on whichever close neighbor has the strongest pull at that moment.

I want to be precise about what I actually know here versus what I'm guessing. I don't have access to the model's internal attention weights, so I can't say with certainty "this is mechanistically what happened." What I can say is what I observed: a repeatable pattern, tied to a specific kind of context transition, that lines up with what's generally understood about how multilingual language models represent related languages. That's an observation, not a proof.

## Why this is worth knowing, not just funny

If you work with AI coding tools across languages, this is worth filing away for two reasons.

First, it's harmless and easy to fix. You don't need to restart a session or dig into settings, you just say "in French, please" and the model corrects immediately. It's a surface-level slip, not a sign the tool lost track of the actual work (the code, the task, the state all stayed perfectly intact through both incidents).

Second, and more useful long-term: it's a good, concrete reminder of what these tools actually are. Not rule-based translators with a hard-coded language switch. Statistical predictors, extremely good ones, that are shaped by whatever context they just processed. Most of the time that's invisible, because most of the time the prediction lands exactly where you'd expect. Every so often, especially at a sharp context transition, you get to see the mechanism show through.

> A language slip is a one-line correction, not a deeper failure.

If you're building multilingual workflows on top of these models, that's the practical takeaway: expect occasional language drift right after heavy single-language context, treat it as a one-line correction, and don't over-interpret it as a deeper failure. It isn't one.
