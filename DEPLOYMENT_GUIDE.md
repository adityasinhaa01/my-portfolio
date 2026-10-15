# Render Deployment Guide: Full-Stack Portfolio

This step-by-step guide walks you through deploying the **Aditya Sinha Full-Stack Portfolio** on [Render](https://render.com).

---

## Table of Contents

1. [Deployment Options Overview](#1-deployment-options-overview)
2. [Prerequisites](#2-prerequisites)
3. [Method 1: Two Services (Recommended)](#3-method-1-two-services-recommended)
   - [Part A: Deploy the Express Backend Web Service](#part-a-deploy-the-express-backend-web-service)
   - [Part B: Deploy the React Frontend Static Site](#part-b-deploy-the-react-frontend-static-site)
   - [Part C: Configure CORS Cross-Origin Sharing](#part-c-configure-cors-cross-origin-sharing)
4. [Method 2: Single Unified Web Service (Free Tier Saver)](#4-method-2-single-unified-web-service-free-tier-saver)
5. [Method 3: One-Click Render Blueprint (`render.yaml`)](#5-method-3-one-click-render-blueprint-renderyaml)
6. [Post-Deployment Verification Checklist](#6-post-deployment-verification-checklist)
7. [Troubleshooting & FAQs](#7-troubleshooting--faqs)

---

## 1. Deployment Options Overview

You can deploy this full-stack monorepo on Render in two ways:

| Option | Architecture | Advantages | Free Tier Considerations |
| :--- | :--- | :--- | :--- |
| **Option A (Recommended)** | **Render Web Service** (Backend) + **Render Static Site** (Frontend) | Clean separation of concerns; static site gets global CDN and unlimited bandwidth; frontend updates deploy independently. | Static Site is 100% free with no sleep. Backend Web Service sleeps after 15 min of inactivity (wakes on request). |
| **Option B** | **Single Render Web Service** (Express serves built client assets) | Only 1 service to manage; no CORS configuration required between domains. | Single web service sleeps after 15 min of inactivity on free tier. |
| **Option C** | **Render Blueprint** (`render.yaml`) | Automated Infrastructure-as-Code; sets up Option A automatically from the config file. | Same as Option A. |

---

## 2. Prerequisites

1. A [GitHub](https://github.com) account.
2. A [Render](https://render.com) account (free to sign up).
3. (Optional) A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/) if you want live AI responses. If omitted, the assistant operates seamlessly using verified local resume facts.
4. Your code pushed to a GitHub repository:
   ```bash
   git add .
   git commit -m "Initialize full-stack portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

---

## 3. Method 1: Two Services (Recommended)

### Part A: Deploy the Express Backend Web Service

1. Log into your **Render Dashboard** (`https://dashboard.render.com`).
2. Click **New +** in the top navigation and select **Web Service**.
3. Choose **Build and deploy from a Git repository** and connect your portfolio repository.
4. Fill in the deployment settings:
   - **Name:** `aditya-portfolio-api` *(or any unique name)*
   - **Region:** Choose the region closest to your audience (e.g., `Singapore`, `Oregon`, `Frankfurt`)
   - **Branch:** `main`
   - **Root Directory:** `server` *(Important!)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js`
   - **Instance Type:** `Free`
5. Expand **Advanced** and configure **Health Check Path**:
   - **Health Check Path:** `/api/health`
6. Add the following **Environment Variables**:
   | Key | Value | Notes |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production caching & secure error handling |
   | `PORT` | `5000` | Render manages port routing |
   | `CLIENT_URL` | `*` *(or your frontend URL)* | Set to `*` to allow any frontend domain, or your specific frontend URL |
   | `GEMINI_API_KEY` | *(your Gemini API key)* | From Google AI Studio |
   | `GEMINI_MODEL` | `gemini-3.5-flash-lite` | Default Gemini model |
   | `MONGODB_URI` | *(optional connection string)* | Leave empty for stateless mode |
7. Click **Create Web Service**.
8. Wait for the build and deployment to complete. Once finished, Render will display your service URL at the top:
   ```
   https://aditya-portfolio-api.onrender.com
   ```
9. **Verify the backend:** Open `https://aditya-portfolio-api.onrender.com/api/health` in your browser. You should see:
   ```json
   {
     "status": "ok",
     "timestamp": "...",
     "uptime": 12,
     "environment": "production",
     "services": {
       "geminiConfigured": true,
       "geminiModel": "gemini-3.5-flash-lite",
       "database": {
         "configured": false,
         "connected": false
       }
     }
   }
   ```

---

### Part B: Deploy the React Frontend Static Site

1. In the **Render Dashboard**, click **New +** and select **Static Site**.
2. Select the same GitHub repository.
3. Fill in the deployment settings:
   - **Name:** `aditya-sinha-portfolio` *(or any preferred name)*
   - **Branch:** `main`
   - **Root Directory:** `client` *(Important!)*
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist` *(Important!)*
4. Configure SPA Routing (under **Redirects/Rewrites**):
   - Click **Add Rule**
   - **Type:** `Rewrite`
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - *(This prevents 404 errors when refreshing sections or deep-linking).*
5. Add the following **Environment Variable**:
   | Key | Value | Notes |
   | :--- | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://aditya-portfolio-api.onrender.com` | Point to your backend URL from Part A (can be with or without `/api`) |

> [!IMPORTANT]
> **Vite Environment Variables are inlined at BUILD TIME.**
> If you add or modify `VITE_API_BASE_URL` in the Render dashboard after creating your Static Site, you MUST click **Manual Deploy** -> **Clear build cache & deploy** for Vite to re-compile with the new backend URL.

6. Click **Create Static Site**.
7. Render will build the Vite assets and deploy them globally to its CDN. Once deployed, note your frontend URL:
   ```
   https://aditya-sinha-portfolio.onrender.com
   ```

---

### Part C: Configure CORS Cross-Origin Sharing

The backend automatically accepts requests from `*.onrender.com`, `*.vercel.app`, and `localhost`. If you set `CLIENT_URL=*` in Part A, no further action is required!

If you prefer to restrict CORS strictly to your exact domain:
1. In the Render Dashboard, go to your backend web service (`aditya-portfolio-api`).
2. Click **Environment** in the left sidebar.
3. Update `CLIENT_URL` with your frontend URL (e.g. `https://aditya-sinha-portfolio.onrender.com`).
4. Click **Save Changes**. Render will redeploy the backend with the updated configuration.

---

## 4. Method 2: Single Unified Web Service (Free Tier Saver)

If you only want a single active service on Render to conserve free tier hours:

1. Click **New +** -> **Web Service**.
2. Select your repository.
3. Configure settings:
   - **Name:** `aditya-sinha-portfolio-fullstack`
   - **Root Directory:** Leave blank *(operates from project root)*
   - **Runtime:** `Node`
   - **Build Command:** `npm run build:all`
   - **Start Command:** `npm run start:unified`
   - **Instance Type:** `Free`
4. Add **Environment Variables**:
   | Key | Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `SERVE_STATIC` | `true` |
   | `GEMINI_API_KEY` | *(your Gemini key, optional)* |
   | `GEMINI_MODEL` | `gemini-2.5-flash` |
5. Click **Create Web Service**.
6. When deployment finishes, the root URL will serve the built React application, and all `/api/*` endpoints will be handled by the same Express server without cross-origin configuration.

---

## 5. Method 3: One-Click Render Blueprint (`render.yaml`)

The repository includes a ready-to-use [render.yaml](file:///mnt/storage/My%20Projects/Portfolio/render.yaml) file.

1. Go to **Render Dashboard** -> **Blueprints**.
2. Click **New Blueprint Instance**.
3. Select this repository.
4. Render will inspect `render.yaml` and configure both the API service and the Static Site automatically.
5. Provide your optional `GEMINI_API_KEY` when prompted in the UI.
6. Click **Apply**. Both services will build and link to each other automatically.

---

## 6. Post-Deployment Verification Checklist

Once deployed, perform these quick verifications in your live browser:

- [ ] **Celestial Hero:** Verify the Three.js Jupiter planet renders with procedural cloud bands, the Great Red Spot, axial rotation, and orbiting moons.
- [ ] **Starfield:** Confirm the animated Canvas night sky with the Milky Way and twinkling stars displays smoothly.
- [ ] **ASK AI Button:** Confirm the gold `ASK AI` button is visibly persistent in the desktop header without requiring hover.
- [ ] **Assistant Concierge:** Click `ASK AI`, click a suggestion chip (*"Tell me about Aditya's projects..."*), and verify that a grounded answer streams into the drawer.
- [ ] **Contact Inquiries:** Submit a test message through the contact form and verify the receipt confirmation dialog.
- [ ] **Mobile Responsiveness:** View on mobile device or inspect at 375px width; verify the mobile `ASK AI` pill and hamburger menu function as expected.
- [ ] **Console Cleanliness:** Open Browser DevTools (`F12`) -> **Console**; ensure there are no CORS or 404 network errors.

---

## 7. Troubleshooting & FAQs

### Q1: Why does the first request to the assistant or contact form take 40-50 seconds?
> **Answer:** Render's free tier spins down Web Services after 15 minutes of inactivity. When a new visitor triggers an API request, Render initiates a "cold start," which takes ~40-50 seconds to wake the instance. Subsequent requests respond instantly (<100ms).
> *Tip:* If you want zero cold starts, you can upgrade the backend instance to Render's **Starter** plan ($7/mo) or use a free monitoring service like [UptimeRobot](https://uptimerobot.com) to ping `https://your-api.onrender.com/api/health` every 10 minutes.

### Q2: Why am I seeing `CORS policy: No 'Access-Control-Allow-Origin' header` in the browser console?
> **Answer:** Ensure that `CLIENT_URL` in the backend Web Service environment variables matches your frontend URL exactly (including `https://` and without a trailing slash). Example: `https://aditya-sinha-portfolio.onrender.com`.

### Q3: Why does refreshing a sub-route on the frontend return a 404?
> **Answer:** On Render Static Sites, single-page applications require a rewrite rule. In your Static Site settings under **Redirects/Rewrites**, ensure you have:
> - **Type:** `Rewrite`
> - **Source:** `/*`
> - **Destination:** `/index.html`

### Q4: How do I know if my Gemini AI key is active?
> **Answer:** Visit `https://your-backend-api.onrender.com/api/health`. Under `services.geminiConfigured`, it will display `true` if your key is recognized. If it shows `false`, check for typos in `GEMINI_API_KEY` under the Render Environment tab.

### Q5: Why does the chatbot say: "The portfolio backend is currently unreachable..."?
> **Answer:** This occurs for two common reasons:
> 1. **Vite Static Site Rebuild Needed:** Environment variables in Vite (`VITE_API_BASE_URL`) are baked into the JavaScript bundle **during build time**, not at runtime. If you configured `VITE_API_BASE_URL` on Render *after* creating the static site, you must trigger a rebuild: in your Static Site dashboard, click **Manual Deploy** -> **Clear build cache & deploy**.
> 2. **Render Free Tier Cold Start:** If the backend hasn't received traffic in 15 minutes, Render spins down the container. The first request takes 30-50 seconds to wake the server up. Subsequent requests respond in milliseconds.
> 3. **Verify the backend directly:** Open `https://your-backend-api.onrender.com/api/health` in your browser. If it responds with `{"status":"ok"}`, your backend is fully operational!
