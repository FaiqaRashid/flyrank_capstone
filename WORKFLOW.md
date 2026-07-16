# WORKFLOW.md — Round 1 vs Round 2 Comparison

## Task
Built a sign-up form (name, email, password, confirm password, terms checkbox)
twice: once with a single vague prompt ("make me a signup page"), and once
with a detailed, constraint-based prompt specifying validation rules,
accessibility requirements, and a verification/testing step.

- Round 1: branch `round-1-vague`
- Round 2: branch `round-2-precise`

## Correctness
Round 2 implements stricter, more correct validation: password rules check
uppercase and lowercase separately (round 1 used a looser combined rule),
and the full-name field enforces letters-only in round 2 but not in round 1.
Round 2 also sets `aria-invalid` explicitly on initial render rather than
leaving it implicit. Round 2 shipped with a dedicated test file with
validators exported for Node, which I ran and confirmed passing. Round 1
had no automated tests at all — its correctness rested entirely on me
manually clicking through it.

## Accessibility
Both rounds used inline validation on blur, `aria-describedby` linking
errors to inputs, and screen-reader-friendly success messaging — the base
prompt requirements came through in both. Round 2 added `:focus-visible`
keyboard focus rings explicitly and used a `hidden`-attribute pattern for
the success message that starts genuinely empty until populated. Round 1's
success state relied on a CSS class toggle with pre-populated text, which
is functionally similar but less explicit about the empty/initial state.

## Edge Cases
Round 2 handles the password composition rule (upper + lower + number)
and name format more strictly. Round 1 skipped these and just used a
generic minimum-length check. Neither round explicitly handles
leading/trailing whitespace trimming, which I noticed on review — a gap
worth fixing in both before this ships anywhere real.

## Review Effort
Round 1 took about 1 hour to review and fix — most of that time went into
noticing what was missing (no real password strength rule, no tests) and
manually testing the form by hand since nothing was automated.

Round 2 took about 1.5 hours, but most of that time went into iterating on
the prompt itself (Cursor asked clarifying questions about file structure
and success-state behavior before building) — not fixing broken output.
Once it built the form, the included tests meant I spent far less time
manually re-verifying behavior than I did in round 1.

## AI Mistake Caught
While Cursor's agent mode was building the round 2 signup page, it deleted
(emptied) `.cursor/rules.md` as a side effect of an unrelated task. This
wasn't part of my prompt at all and easily could have gone unnoticed if I
hadn't diffed the branches carefully. I restored it from `round-1-vague`
via `git checkout round-1-vague -- .cursor/rules.md` and committed the fix
separately.

## Takeaway
Round 2 felt slower in the moment because of the up-front prompting effort,
but it required almost no debugging afterward, while round 1's speed was
an illusion — its real cost showed up later during manual review. Precision
up front trades review time for prompting time, and the trade is worth it.