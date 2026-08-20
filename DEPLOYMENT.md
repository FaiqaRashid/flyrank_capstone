# Deployment Checklist & Rollback Plan

**Project:** Faiqa Rashid Portfolio (FlyRank Capstone)
**Live URL:** https://flyrank-capstone-one.vercel.app/
**Host:** Vercel (auto-deploy from GitHub)
**Branch:** `main`

---

## Deployment Checklist

Completed before this submission:

- [x] **All tests pass locally** — `npm run test:coverage` → 53/53 tests passing, 81.32% statement coverage
- [x] **Production build succeeds with no errors** — `npm run build` compiles cleanly, 0 TypeScript errors
- [x] **Environment variables are set in Vercel**, not just locally — `GROQ_API_KEY` configured in Vercel's project settings (Environment Variables), not committed to the repo
- [x] **`.env.local` is gitignored** — confirmed secrets are never pushed to GitHub
- [x] **No console errors on the happy path** — verified manually in DevTools on the live URL
- [x] **Error states verified on the live deployment**, not just localhost — network failure, mid-stream failure, rate limiting, and malformed response all tested via DevTools throttling and route-handler sabotage (Checkpoint 1)
- [x] **Mobile responsiveness checked on a real device**, not just DevTools responsive mode
- [x] **Lighthouse scores meet the bar** — Performance 94, Accessibility 100, Best Practices 100, SEO 100 (mobile)
- [x] **Accessibility audit passed** — axe DevTools, 0 issues at WCAG 2.1 AA
- [x] **Git history is clean and pushed** — latest `main` branch matches what's live on Vercel

---

## How It Fails Safely

- **Chat API failures** (network loss, mid-stream interruption, rate limiting, malformed responses) are caught by the `useChat` error object and shown as a designed error state with a working Retry button, rather than a blank screen or unhandled crash.
- **Unexpected route-level failures** are caught by `app/error.tsx`, a Next.js error boundary that shows a recovery UI instead of the app crashing entirely.
- **Retry is double-click-protected** via a synchronous ref-lock, so rapid clicking can't fire duplicate requests.

---

## Rollback Plan

Since deployment is Vercel's automatic GitHub integration (every push to `main` triggers a new deployment), rollback is straightforward:

1. **Fastest option — Vercel dashboard:** Open the project on vercel.com → Deployments tab → find the last known-good deployment → click "..." → **Promote to Production**. This reverts the live URL instantly without touching Git history, and takes under a minute.
2. **Git-based rollback:** If the dashboard isn't accessible, revert the bad commit locally and push:
   ```
   git revert <bad-commit-hash>
   git push
   ```
   This creates a new commit that undoes the change, triggering a fresh (safe) deployment automatically — safer than `git reset --force` since it doesn't rewrite shared history.
3. **Verify after rollback:** Re-check the live URL loads correctly and re-run the happy-path chat flow to confirm the rollback actually fixed the issue before considering it resolved.

No manual server restart or redeploy trigger is needed in either case — Vercel handles the redeploy automatically once the correct commit is in place.
