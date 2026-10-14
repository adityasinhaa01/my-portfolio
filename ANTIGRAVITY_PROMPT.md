# Antigravity Task: Turn This Portfolio Into a Complete Full-Stack GitHub Project

You are working inside this folder. Read `source/portfolio-original.tsx` completely before making changes. Treat it as the source of truth for the current portfolio UI, animations, content, and behavior.

## Goal
Build a complete, maintainable, production-minded full-stack portfolio project from the supplied single-file React/TSX portfolio. I want to open this folder in VS Code/Antigravity and have you do the implementation end-to-end. Do not stop after giving me instructions: create and edit the actual files, install dependencies if terminal access permits, run checks/builds, fix errors, and report what remains.

## Non-negotiable design requirements
- Preserve the existing cinematic, dark, editorial/cosmic design.
- Preserve the realistic custom Three.js Jupiter shader/rotation, rings/moons, animated night-sky/starfield, scroll reveals, typography, responsive layout, section order, and portfolio assistant drawer.
- Do not redesign, simplify, replace with a generic template, remove animations, or substitute a cartoon planet.
- Keep the name exactly `ADITYA SINHA`.
- Preserve the portfolio content from the supplied source. Do not invent jobs, internships, awards, links, metrics, or project deployment URLs. Keep unconfigured links clearly marked or render them as disabled/placeholder links.
- Keep reduced-motion accessibility support and responsive behavior.
- Do not add unnecessary libraries or introduce a second CSS framework if the current implementation can be retained with Tailwind.

## High-priority UI requirement: make “ASK AI” unmistakably visible
The current portfolio assistant is an important feature, but its desktop trigger is too subtle: it currently appears as a thin line/dot interaction with a label that is hidden until hover. This is not acceptable for the finished site.

- Make the assistant entry point a clearly visible, persistent CTA in the desktop navigation, with the exact label `ASK AI` (or `ASK THE PORTFOLIO AI`). It must be visible without hovering, immediately understandable as clickable, and have strong contrast against the dark background.
- Use a tasteful warm-gold/cream outline or filled treatment that matches the existing cosmic/editorial palette. Add a small sparkle/chat icon if appropriate, a visible hover/focus state, and a comfortable click target. Keep it elegant; do not make it look like a generic chatbot widget.
- Keep the CTA visible at common laptop and desktop widths. On mobile, retain a clearly visible `ASK AI` button near the menu control and ensure it does not disappear behind the mobile navigation overlay.
- Wire the CTA to open the existing portfolio assistant drawer/modal. Verify opening, closing, keyboard focus visibility, Escape-to-close if appropriate, and sensible focus/ARIA behavior.
- Do not rely on hover-only labels, a tiny dot, an invisible hit area, or color alone to communicate the action. Check the actual rendered layout at desktop, tablet, and mobile widths.
- Preserve the current design language, hero composition, Jupiter shader, animations, typography, and section layout while improving this one interaction.

## Production-quality bar
Treat this as a real public portfolio, not just a demo or code-generation exercise. Make practical, verifiable decisions and do not claim production readiness merely because the code compiles.

- **Reliability:** Handle loading, empty, success, timeout, network, provider, and validation-error states. Prevent duplicate assistant submissions and show a useful message when the backend or AI key is unavailable.
- **Security:** Keep all secrets server-side; validate and bound all request bodies; configure restrictive CORS, Helmet, rate limiting, and safe error responses; never expose stack traces or provider keys to clients. Sanitize/validate contact form input and do not claim a message was delivered unless delivery is actually configured and confirmed.
- **Accessibility:** Semantic landmarks, keyboard navigation, visible focus rings, adequate contrast, accessible labels, modal focus management, reduced-motion support, and mobile usability.
- **Performance:** Clean up Three.js resources, observers, listeners, and animation frames; avoid unnecessary re-renders; pause expensive animation when off-screen; optimize bundle/assets where reasonable; retain graceful fallback if WebGL is unavailable.
- **Maintainability:** Small cohesive components, typed API contracts, centralized config and error handling, consistent naming, no giant files, no dead code, no placeholder links that falsely look live.
- **Configuration:** Provide `.env.example` files, safe defaults for local development, a clear distinction between optional and required services, and documented production environment variables. Do not make MongoDB mandatory unless the feature truly requires it.
- **Testing and verification:** Run the production build, type checks, and backend tests where practical. Verify health/chat/contact API behavior and the visible ASK AI CTA. Fix errors instead of only reporting them. If browser automation is unavailable, say exactly what was and was not verified.
- **Deployment readiness:** Document frontend/backend deployment, environment variables, CORS configuration, health checks, and how to confirm the deployed assistant works. Do not claim deployment happened unless it was actually performed.
- **Privacy:** Collect only data needed for the features. Do not persist assistant conversations or contact messages unless clearly implemented and documented. Add a concise privacy note if data is collected.

## Architecture
Create a clean monorepo with this structure (adjust only if technically justified and document why):

```
.
├── client/                     # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── hero/            # Jupiter scene and night sky
│   │   │   ├── sections/        # About, Projects, Skills, Journey, Contact
│   │   │   └── assistant/       # Portfolio assistant UI
│   │   ├── data/                # Verified portfolio content
│   │   ├── services/            # Typed API client
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── .env.example
├── server/                     # Node.js + Express backend (CommonJS)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── README.md
└── source/portfolio-original.tsx  # Keep this original reference file unchanged
```

## Frontend requirements
1. Set up React + TypeScript + Vite.
2. Install and configure the dependencies genuinely used by the source, including `three`, `lucide-react`, and Tailwind CSS if needed. Preserve any existing inline styles and custom animation CSS.
3. Split the original file into logical components and data modules without changing visible behavior. Keep shader strings with the Jupiter scene component or a dedicated shader module.
4. Fix imports/types and browser lifecycle cleanup as necessary, without altering the intended visuals.
5. Ensure every nav link/CTA has a valid section target or a clearly marked placeholder.
6. Make the portfolio assistant call the backend API rather than a provider API directly from the browser.
7. Add a typed API service using `VITE_API_BASE_URL`, with a sensible local default or Vite proxy. Show a graceful, honest error when the backend/provider is unavailable.
8. Do not hardcode any secret API keys in frontend source.

## Backend requirements
1. Create a Node.js + Express API with clear separation between routes, controllers, services, middleware, and configuration.
2. Add `GET /api/health` returning JSON health status.
3. Add `POST /api/assistant/chat` accepting validated JSON such as `{ "message": "...", "history": [] }` and returning `{ "success": true, "reply": "..." }`.
4. Keep the portfolio assistant grounded in verified data from the original file. It must not invent experience, projects, credentials, links, or personal facts. Use a concise system instruction based on that data.
5. Integrate a server-side AI provider only if an environment key is configured. Prefer Gemini if straightforward, with `GEMINI_API_KEY` and model configurable through environment variables. Keep provider calls inside the backend service. Never send keys to the client. If no key is configured, return a clear, helpful configuration error or a clearly identified limited local fallback; never pretend a real AI response was generated.
6. Validate inputs, cap message/history length, handle provider/network errors, and add centralized error handling. Use `helmet`, restrictive configurable CORS, and basic rate limiting on the assistant route.
7. Add `POST /api/contact` with validation. If no email provider is configured, return a clear status and do not claim the message was emailed. Do not expose credentials.
8. Keep MongoDB optional for this first version. If adding persistence, use Mongoose only behind a configured `MONGODB_URI`, handle unavailable DB cleanly, and document what is stored. Do not make the entire app fail to start when optional MongoDB is not configured.
9. Add `.env.example` files with placeholders only. Ensure `.env`, `node_modules`, build output, logs, and secrets are ignored by Git.

## Developer experience
- Add root scripts if useful to run client and server concurrently (for example, `npm run dev` from root using `concurrently`).
- Add complete install/run instructions to `README.md`, including Linux terminal commands, ports, environment setup, API endpoints, architecture, deployment notes (Vercel frontend, Render backend), and troubleshooting.
- Add a useful `.gitignore`.
- Include an accurate `README` project overview and feature list, but do not claim tests/deployment succeeded unless you verified them.
- Keep naming consistent and use readable code. Avoid huge files after refactoring.
- Add a basic backend test for the health endpoint if practical, but do not let optional test setup block finishing the application.

## Verification checklist (must actually perform where tools allow)
1. Install dependencies.
2. Run frontend production build and fix TypeScript/build errors.
3. Start backend and verify `/api/health`.
4. Verify frontend can call backend locally.
5. Verify no secret key appears in client source or committed files.
6. Check browser console/runtime issues if browser tools are available.
7. Preserve `source/portfolio-original.tsx` unchanged.
8. Finish with a concise summary of created files, commands to run, env variables needed, checks performed, and anything I must do manually (such as adding my own API key or GitHub URLs).

## Work style
- Proceed autonomously; make sensible defaults rather than asking me about routine implementation decisions.
- Do not overwrite the original reference file.
- Do not stop at a plan. Implement the project.
- If a command or integration is blocked by missing network/permissions, continue with the remaining work and state the exact blocker.
