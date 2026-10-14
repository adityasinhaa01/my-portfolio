# Aditya Sinha — Full-Stack Portfolio & AI Assistant

A production-minded, cinematic dark editorial portfolio for **Aditya Sinha**, built with **React**, **TypeScript**, **Three.js** custom GLSL planetary shaders, **Tailwind CSS**, and an **Express.js** API backend featuring a grounded **Gemini AI** assistant.

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?logo=three.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

---

## Table of Contents

- [Overview & Visual Design](#overview--visual-design)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Verification & Testing](#verification--testing)
- [Deployment Guide](#deployment-guide)
  - [Frontend (Vercel)](#frontend-vercel)
  - [Backend (Render)](#backend-render)
- [Security & Privacy](#security--privacy)
- [Troubleshooting](#troubleshooting)
- [License & Attribution](#license--attribution)

---

## Overview & Visual Design

This project showcases Aditya Sinha's computer science background, academic credentials, and software projects:
- **Atmospheric Celestial Hero:** A procedurally shaded Jupiter sphere with multi-octave domain warping, atmospheric terminator scattering, Great Red Spot anticyclone simulation, lighting, dust rings with shadowing, and orbiting moons.
- **Dynamic Starfield:** An HTML5 Canvas backdrop featuring a deterministic Milky Way dust stream, twinkling stars, and corner solar flare.
- **Unmistakably Visible "ASK AI" Entry Point:** A persistent, high-contrast warm-gold CTA button situated in desktop and mobile navigation that opens an interactive editorial assistant drawer.
- **Grounded Anti-Hallucination AI:** A portfolio concierge powered by Google Gemini (or a verified local fallback when unconfigured) strictly bounded by Aditya's verified resume data.
- **Zero Hallucinated Credentials:** Strictly reflects verified coursework at Netaji Subhas Engineering College (Kolkata), Class X/XII achievements, SIH 2025, INSPIRE Awards – MANAK, and verified projects (*Nagar Sudhar* and *ChotuLink*).

---

## Key Features

1. **Procedural Three.js Jupiter Shaders:** 6-octave fractal Brownian motion (fBm), ridged multifractal storm eddies, differential latitude rotation, and custom ring shadowing.
2. **Dedicated Backend API:** Express.js service with Helmet security headers, restrictive CORS, rate limiting, and centralized error handling.
3. **Dual-Mode AI Assistant:**
   - **Gemini AI Mode:** Connects to Google Gemini API (`gemini-2.5-flash`) with server-side API keys and strict system instructions.
   - **Local Grounded Fallback Mode:** Operates out of the box without requiring external API keys or paid services.
4. **Resilient Contact System:** Handles message validation, rate limiting, and optional persistent storage with Mongoose if MongoDB is configured.
5. **Accessibility & Reduced Motion:** Full compliance with `prefers-reduced-motion: reduce`, ARIA landmarks, focus trapping, and keyboard navigation (Escape to close modals).

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client (Vite)                         │
│  React 19 + TypeScript + Three.js + Tailwind CSS            │
│  Port: 5173 (Dev Proxy /api -> http://localhost:5000)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Backend                       │
│  Port: 5000                                                 │
│  - Helmet + Restrictive CORS + Rate Limiting               │
│  - Centralized Error Handling                               │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│   Google Gemini API (opt.)   │ │    MongoDB Atlas (opt.)    │
│   Grounded System Prompt     │ │    Contact Logging         │
└──────────────────────────────┘ └────────────────────────────┘
```

---

## Project Structure

```
.
├── client/                     # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── hero/           # Three.js Jupiter, Night Sky, Navbar, Hero copy
│   │   │   ├── sections/       # About, Projects, Skills, Journey, Contact
│   │   │   └── assistant/      # Accessible Portfolio Concierge drawer
│   │   ├── data/               # Typed portfolio content
│   │   ├── services/           # Typed API client
│   │   ├── App.tsx             # Root layout & scroll observer
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Tailwind directives & motion system
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .env.example
├── server/                     # Node.js + Express backend (CommonJS)
│   ├── src/
│   │   ├── config/             # Environment & resilient database config
│   │   ├── controllers/        # Health, assistant, and contact controllers
│   │   ├── data/               # Grounded facts & local fallback generator
│   │   ├── middleware/         # Rate limiting, validation, error handler
│   │   ├── models/             # Mongoose schemas (optional)
│   │   ├── routes/             # Express route definitions
│   │   ├── services/           # AI and contact services
│   │   ├── app.js              # Express app definition
│   │   └── server.js           # Server entry point
│   ├── test/                   # Automated API tests (node:test + supertest)
│   ├── package.json
│   └── .env.example
├── source/
│   └── portfolio-original.tsx  # Unmodified source reference file
├── .gitignore
├── package.json                # Root package for coordinated scripts
└── README.md
```

---

## Prerequisites

- **Node.js**: v18.0.0 or later (v20+ recommended)
- **npm**: v9.0.0 or later

Verify your environment:
```bash
node -v
npm -v
```

---

## Quick Start

### 1. Install All Dependencies

From the repository root:
```bash
npm run install:all
```
*(Or install each workspace individually: `npm install && cd client && npm install && cd ../server && npm install`)*

### 2. Configure Environment Files (Optional)

Both client and server have safe defaults for local development:
```bash
# Server setup
cp server/.env.example server/.env

# Client setup
cp client/.env.example client/.env
```

If you wish to enable Google Gemini AI, add your API key to `server/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```
*Note: If no key is set, the server seamlessly serves verified responses from its grounded local knowledge base.*

### 3. Run Development Servers Concurrently

From the repository root:
```bash
npm run dev
```

This starts:
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

Open `http://localhost:5173` in your browser.

---

## Environment Variables

### Server (`server/.env`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port for Express API server |
| `NODE_ENV` | `development` | Runtime environment (`development` / `production`) |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origins (comma-separated for multiple) |
| `GEMINI_API_KEY` | *empty* | (Optional) Google Gemini API key |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Gemini model identifier |
| `MONGODB_URI` | *empty* | (Optional) MongoDB connection string |
| `CONTACT_RECEIVER_EMAIL` | `adityasinhaa001@gmail.com` | Contact recipient email |

### Client (`client/.env`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `/api` | Base URL for backend API requests |

---

## API Endpoints

### 1. Health Check
- **`GET /api/health`**
  - **Returns:** Server status, timestamp, uptime, and service readiness (Gemini, Database).
  ```json
  {
    "status": "ok",
    "timestamp": "2026-10-14T10:40:00.000Z",
    "uptime": 124,
    "environment": "development",
    "services": {
      "geminiConfigured": true,
      "geminiModel": "gemini-2.5-flash",
      "database": {
        "configured": false,
        "connected": false
      }
    }
  }
  ```

### 2. Portfolio Assistant
- **`POST /api/assistant/chat`**
  - **Rate Limit:** 25 requests / 15 minutes / IP
  - **Payload:**
    ```json
    {
      "message": "What projects has Aditya worked on?",
      "history": []
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "reply": "Aditya's portfolio features two verified projects: Nagar Sudhar and ChotuLink...",
      "provider": "gemini",
      "isFallback": false
    }
    ```

### 3. Contact Submission
- **`POST /api/contact`**
  - **Rate Limit:** 10 requests / 15 minutes / IP
  - **Payload:**
    ```json
    {
      "name": "Alex Mercer",
      "email": "alex@example.com",
      "message": "Interested in discussing a software engineering opportunity."
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Your message has been received and logged...",
      "stored": false,
      "emailed": false,
      "directEmail": "adityasinhaa001@gmail.com"
    }
    ```

---

## Verification & Testing

### Running Backend Unit & Integration Tests

The server includes automated tests for all endpoints:
```bash
npm test --prefix server
```
Expected output:
```
✔ GET /api/health returns 200 with status ok
✔ POST /api/assistant/chat returns 200 and grounded reply for valid message
✔ POST /api/assistant/chat rejects empty message with 400
✔ POST /api/contact accepts valid submission with 200
✔ POST /api/contact rejects invalid email with 400
Pass: 6, Fail: 0
```

### Running Frontend Production Build

Verify TypeScript compilation and Vite asset bundling:
```bash
npm run build --prefix client
```

---

## Deployment Guide

### Frontend (Vercel)

1. Connect your repository to **Vercel**.
2. Set **Root Directory** to `client`.
3. Build Settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-api.onrender.com/api`
5. Deploy.

### Backend (Render)

1. Create a **New Web Service** on Render connected to this repository.
2. Set **Root Directory** to `server`.
3. Environment: `Node`.
4. Build Command: `npm install`.
5. Start Command: `node src/server.js`.
6. Environment Variables:
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: `https://your-portfolio.vercel.app`
   - `GEMINI_API_KEY`: *(your Gemini API key)*
   - `GEMINI_MODEL`: `gemini-2.5-flash`
   - `MONGODB_URI`: *(optional connection string)*
7. Verify deployment with `curl https://your-backend-api.onrender.com/api/health`.

---

## Security & Privacy

- **No Secrets in Frontend:** API keys are never bundled into client code. All external AI calls occur server-side.
- **Strict Headers:** `helmet` applies defensive HTTP headers against clickjacking, MIME sniffing, and XSS.
- **Rate Limiting:** Prevents brute force and API quota exhaustion on assistant and contact routes.
- **Centralized Error Handling:** Stack traces are stripped from production responses.
- **Privacy:** Assistant chats are stateless and not persisted to disk or database. Contact submissions are only stored if MongoDB is explicitly configured.

---

## Troubleshooting

- **WebGL Warning / Fallback:** If testing on a headless server or machine without GPU acceleration, the hero automatically displays an elegant radial gradient planetary fallback without crashing.
- **CORS Error in Dev:** Ensure `CLIENT_URL` in `server/.env` matches your browser URL (default `http://localhost:5173`). In development, the Vite dev proxy redirects `/api` automatically.
- **Assistant Returns Local Fallback:** Verify that `GEMINI_API_KEY` is present in `server/.env` and restart the backend server. If unconfigured or quota is exceeded, the assistant gracefully falls back to verified resume data.

---

