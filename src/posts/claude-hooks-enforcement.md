---
title: 'CLAUDE.md rules are suggestions. Hooks are enforcement.'
date: '2026-07-06'
excerpt: 'My coding agent respected a project rule right up until it did not. So I turned two of those rules into hooks instead of prose.'
category: 'Tooling'
---

My coding agent respected the rule right up until it didn't.

Project instructions said: never edit the shadcn-vue primitives in `components/ui`. Most days the agent complied. But instructions written in prose are suggestions, and suggestions eventually get ignored under pressure.

So I turned two of those rules into Claude Code hooks:

1. A `PreToolUse` hook that denies any edit to `components/ui/**` before it happens. Not "please don't", but a hard no scoped to Edit and Write tool calls.

2. A `Stop` hook that runs Laravel Pint and ESLint `--fix` on every modified file at the end of each turn. If ESLint finds errors it can't fix, they're fed back to the agent, which has to fix them before finishing.

> If breaking a rule should be impossible, wire it as a check. Don't write it in prose and hope.

One lesson along the way: the first version of the formatting hook built shell commands from git file names. A security review flagged it as a command injection risk. Even guardrail code needs guardrails. I rewrote it using argument arrays instead of a shell string.

With an mtime cache, the hook costs about 0.6s when nothing changed and around 6.6s on a real run.

The takeaway: treat agent rules like CI. If breaking a rule should be impossible, wire it as a check. Don't write it in prose and hope.
