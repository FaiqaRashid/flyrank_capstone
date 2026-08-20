# Faiqa Rashid — Portfolio (FlyRank Capstone)

Full-stack, AI-enhanced developer portfolio built with Next.js. Features an embedded AI assistant that answers visitor questions about my background, skills, and projects in real time.

**Live site:** https://flyrank-capstone-one.vercel.app/
**Repository:** https://github.com/FaiqaRashid/flyrank_capstone

---

## Project Brief

This portfolio solves the problem of a static resume being a dead end for recruiters and visitors who have specific questions ("what's her tech stack?", "has she built anything with AI?") that a wall of text doesn't answer quickly. It's built for recruiters, hiring managers, and fellow developers evaluating my work. I chose an embedded AI assistant over a traditional FAQ or contact form because it lets visitors get a direct, conversational answer immediately, without waiting on an email reply — while still directing them to my real projects and CV for the full picture.

---

## Setup & Run Instructions

**Requirements:** Node.js 18+, npm

```bash
git clone https://github.com/FaiqaRashid/flyrank_capstone.git
cd flyrank_capstone/portfolio
npm install
```

Create a `.env.local` file in the `portfolio/` folder with your Groq API key:

```
GROQ_API_KEY=your_key_here
```

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Other useful commands:**

```bash
npm run build          # production build
npm test                # run the test suite
npm run test:coverage   # run tests with a coverage report
```

---

## Architecture Overview

Built with **Next.js (App Router)** and **TypeScript**, styled with **Tailwind CSS**, animated with **Framer Motion**.

| Part | What it does |
|---|---|
| `app/page.tsx` | Main portfolio page — assembles all sections (Hero, About, Skills, Projects, Contact, Footer) |
| `app/components/Hero.tsx`, `About.tsx`, `Skills.tsx`, `Projects.tsx`, `Contact.tsx`, `Footer.tsx`, `Navbar.tsx` | Individual portfolio sections |
| `app/components/FloatingChatbot.tsx` | The floating launcher button (bottom-right) and drawer container that opens/closes the AI assistant |
| `app/components/ChatWindow.tsx` | The actual chat UI — message list, input, streaming responses, error/retry states, empty-state suggestions |
| `app/api/chat/route.ts` | API route that receives chat messages and streams a response back from Groq's AI model |
| `app/error.tsx` | Route-level error boundary — catches unexpected rendering failures and shows a recovery UI |
| `app/health/page.tsx` | Simple health-check page |
| `jest.config.js`, `jest.setup.js` | Test configuration (Jest + React Testing Library, jsdom environment) |

**Data flow for the chatbot:** user types a message in `ChatWindow` → `useChat` hook (from `@ai-sdk/react`) sends it to `/api/chat` → the route streams a response from Groq's API back to the client → text is revealed progressively in the UI via a custom pacing effect for a natural typing feel.

**Performance approach:** non-critical client widgets (chatbot, intro animation, back-to-top button) are hydrated only once the browser's main thread is idle, rather than blocking initial page load — this was the single biggest factor in raising the mobile Lighthouse Performance score from 73 to 94.

---

## AI Integration

The portfolio embeds a conversational assistant (bottom-right launcher) powered by **Groq's hosted inference API** (GPT-OSS model), accessed via the **Vercel AI SDK** (`@ai-sdk/react`'s `useChat` hook) for streaming responses.

**Why this approach:** Groq's inference is extremely fast, which matters for a chat widget where perceived responsiveness is the whole point. The AI SDK's `useChat` hook handles streaming, loading state, and error state out of the box, so I could focus effort on the failure-handling and UX layer on top of it rather than re-building state management from scratch.

**Prompting:** the assistant is scoped to answer questions specifically about my background, skills, and projects — not general-purpose chat — so responses stay relevant to what a visitor to a portfolio site would actually want to know.

**What it's not:** this isn't a gimmick chatbot bolted on for novelty. It replaces the need for a visitor to dig through the page or wait on an email to get a direct answer to a specific question.

---

## Known Limitations & Future Improvements

- **No conversation persistence** — refreshing the page clears the chat history. A future version could persist sessions in local storage.
- **No rate limiting on my end** — currently relying on Groq's own rate limits; a production version serving real traffic would benefit from a lightweight rate limiter on the API route itself.
- **Single-turn context window is not summarized** — very long conversations could eventually hit the model's context limit without graceful truncation.
- **No analytics on chatbot usage** — I don't currently track what visitors ask, which would be useful for improving the assistant's scope over time.
- **Framer Motion coverage** — some animation branches (specifically inside `ChatWindow.tsx`'s streaming logic) are harder to unit test in isolation and are currently covered more lightly than the rest of the codebase.

---

## Testing

53 tests across 17 test suites (Jest + React Testing Library), covering the chatbot's happy path, error/retry states, empty-state suggestions, navigation, and all major page sections. Run with `npm run test:coverage` for the full report.

## Performance & Accessibility

- **Lighthouse (mobile):** Performance 94, Accessibility 100, Best Practices 100, SEO 100
- **Accessibility audit (axe DevTools, WCAG 2.1 AA):** 0 issues found (critical, serious, moderate, or minor)
