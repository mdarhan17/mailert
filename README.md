<div align="center">

# 🛡️ Mailert

### Think Before You Click.

**An email scam-awareness and phishing-analysis platform designed for creators, freelancers, and businesses.**

React · TypeScript · Vite · FastAPI · Clerk

[Explore Features](#features) · [Run Locally](#getting-started) · [Project Status](#current-status) · [Roadmap](#development-roadmap)

</div>

---

## Overview

**Mailert** is a full-stack cybersecurity project focused on helping people make safer decisions about suspicious emails—particularly fake brand collaborations, influencer sponsorship offers, phishing links, impersonation, and fraudulent payment requests.

The current application includes a responsive landing page, email-input interface, **clearly labeled example** risk results, a creator safety hub, and Clerk-based sign-in/sign-up integration. A Python FastAPI service runs separately and currently exposes basic health endpoints.

> [!IMPORTANT]
> **Development project:** Mailert does **not** currently provide validated, production-ready phishing detection. Any risk scores or risk labels shown in UI demonstrations are fictional examples, **not** live AI predictions or proof an email is safe. Authentication and email verification must be tested with your Clerk application before being considered production-ready.

## Features

| Area | Current experience | Status |
| --- | --- | --- |
| Marketing website | Responsive light-themed landing page, glassmorphism, feature cards, smooth motion | UI implemented |
| Theme controls | Light/dark theme switch and visual refinements | UI implemented |
| Email scanner | Sender, subject, body and URL fields; paste-email mode; validation; example input | Frontend UI only |
| Risk analysis | Example severity categories, explanation cards and recommended actions | **Illustrative demo data** |
| Safety hub | Scam scenarios, security checklist and educational FAQs | Educational UI |
| Authentication | Clerk React integration, sign-in/sign-up pages and account navigation | Integration added; end-to-end verification needed |
| Account dashboard | Example activity and account previews | Demo UI; no persisted scan history |
| FastAPI backend | Health check and application information endpoints | Running locally |
| Backend authorization | Verified Clerk JWT/session checks for protected endpoints | Planned |
| Database | PostgreSQL persistence and migrations | Planned |
| Detection engine | Rules, URL/domain checks, trained ML model and evaluation | Planned |

### What Mailert is designed to identify

- **Fake sponsorships:** Unexpected brand deals, payment-to-join requests and unrealistic offers.
- **Brand impersonation:** Messages that claim to represent a company without a verifiable identity.
- **Phishing:** Credential collection, suspicious sign-in requests and deceptive links.
- **Pressure tactics:** Artificial urgency, threats, or instructions to bypass verification.
- **Fraudulent collaboration flows:** Requests to pay fees, download untrusted files or share OTPs.

These are product goals; live detection and accuracy evaluation are future development tasks.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Styling | CSS, responsive layouts, glassmorphism |
| Animations and icons | Framer Motion, Lucide React |
| Authentication | Clerk React SDK |
| API | Python 3.12, FastAPI, Uvicorn |
| Database (planned) | PostgreSQL, SQLAlchemy, Alembic |
| ML (planned) | Python, scikit-learn, text features and model evaluation |
| Version control | Git and GitHub |

## Project Structure

```text
Mailert/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py                 # FastAPI app + health endpoint
│   ├── requirements.txt
│   └── .venv/                      # Local-only; ignored by Git
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/            # Scanner, demo results, account and UI sections
│   │   ├── styles/                # Shared visual upgrades
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── ClerkEntry.tsx          # Clerk pages and account navigation
│   │   ├── ClerkEntry.css
│   │   └── main.tsx                # React entry point + ClerkProvider
│   ├── .env.local                 # Local-only; DO NOT commit
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

*The tree highlights primary files; additional UI components and styles may be present depending on the phase completed. The `.venv` and `.env.local` files are local and must not be committed.*

## Getting Started

Prerequisites: **Git**, a recent **Node.js + npm** version compatible with the installed Vite release, **Python 3.12**, and a **Clerk application** for authentication.

Commands below are written for **Windows PowerShell**, the primary local development environment.

### 1. Clone the repository

```powershell
git clone https://github.com/mdarhan17/mailert.git
cd mailert
```

If your project already exists at `D:\Mailert`, use `cd D:\Mailert` instead—there is no need to clone again.

### 2. Start the frontend

```powershell
cd D:\Mailert\frontend
npm.cmd install
```

Create `frontend/.env.local`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_REPLACE_WITH_YOUR_PUBLISHABLE_KEY
```

Get this **publishable** key from the [Clerk Dashboard](https://dashboard.clerk.com/). Use `VITE_` (not `NEXT_PUBLIC_`) because Mailert uses **Vite, not Next.js**.

Run the development server:

```powershell
npm.cmd run dev
```

Visit the **Local** URL printed by Vite, typically `http://localhost:5173/`. If the port is in use, Vite may choose another one—always use the printed URL.

### 3. Start the backend in a separate terminal

```powershell
cd D:\Mailert\backend
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Backend URLs:

- Health check: `http://127.0.0.1:8000/api/health`
- FastAPI docs: `http://127.0.0.1:8000/docs`
- Service root: `http://127.0.0.1:8000/`

Expected health response from the current implementation:

```json
{"status":"success","backend":"running"}
```

The frontend and API run independently at this stage. The scanner is **not** yet connected to a real phishing-detection endpoint.

### 4. Build the frontend

```powershell
cd D:\Mailert\frontend
npm.cmd run build
```

Run this before committing changes. A passing frontend build does not by itself verify Clerk registration, OTP delivery or runtime behavior.

## Authentication Routes

| Route | Purpose |
| --- | --- |
| `/` | Mailert landing page and interactive demos |
| `/sign-up` | Clerk registration and configured email verification |
| `/sign-in` | Clerk sign-in |
| `/account` | User account page (requires sign-in to display user details) |

**Clerk configuration:** enable your preferred sign-up methods and **email verification code** in the Clerk Dashboard. Actual availability of email OTP depends on those dashboard settings.

## API — Current Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/` | Basic Mailert API metadata |
| `GET` | `/api/health` | API health indicator |

**Not implemented yet:** authenticated `/api/me`, email scan submission, ML prediction, sender/URL reputation services, database-backed scan history.

## Privacy and Security

- Never commit `.env.local`, `backend/.env`, Clerk secret keys, access tokens, passwords or OTP codes.
- Only the Clerk **publishable key** belongs in frontend environment variables.
- Keep any server-side secrets in backend-only environment configuration.
- If a secret has been disclosed, **rotate/revoke it** in the provider dashboard.
- Avoid storing raw email contents by default; introduce explicit user controls before adding history.
- Do not open suspicious URLs merely to inspect them. Future link inspection should apply strict URL-validation and network-access safeguards.
- Never treat a low risk score as a guarantee of legitimacy.

> [!WARNING]
> The current frontend provides educational/demo results, not a security verdict. Do not rely on it for incident response or high-stakes security decisions.

## Development Roadmap

- [x] **Phase 1 — Setup:** Vite frontend, Python/FastAPI service, Git repository.
- [x] **Phase 2.1 — Landing UI:** Responsive cybersecurity-inspired homepage.
- [x] **Phase 2.2 — Scanner UI:** Email inputs, validation and form preview.
- [x] **Phase 2.3 — Results UI:** Interactive **example** risk reports.
- [x] **Phase 2.4 — Account UI:** Authentication and dashboard design previews.
- [x] **Phase 2.5 — Design refinement:** Light theme and safety-hub enhancements.
- [ ] **Phase 3 — Authentication verification:** Complete and test Clerk registration, OTP, login/logout and account access on the local app.
- [ ] **Phase 3.2 — API authorization:** Verify Clerk session tokens server-side in FastAPI.
- [ ] **Phase 4 — Scanner API:** Connect validated input to FastAPI endpoints.
- [ ] **Phase 5 — Database:** PostgreSQL, schema migrations and optional scan history.
- [ ] **Phase 6 — Initial detection:** Transparent rule-based warnings with tests.
- [ ] **Phase 7 — ML:** Curated datasets, training, evaluation and calibrated outputs.
- [ ] **Phase 8 — URL/domain checks:** Secure reputation and impersonation signals.
- [ ] **Phase 9 — Reports and dashboard:** User-specific history, explanations and management.
- [ ] **Phase 10 — Hardening and deployment:** QA, privacy/security review, monitoring and hosting.

*Checkmarks indicate UI work created in the development walkthrough, not a claim of full end-to-end production validation.*

## Troubleshooting

**Blank/white browser screen:** run `npm.cmd run build`, inspect the browser developer console (**F12 → Console**), confirm `VITE_CLERK_PUBLISHABLE_KEY` exists in `.env.local`, then restart Vite.

**Multiple localhost ports:** close duplicate Vite processes or use the precise Local URL shown by the active server.

**Clerk import errors:** the project previously used alternate auth experiments (`ClerkGateway.tsx` and `ClerkEntry.tsx`). Remove or archive an obsolete, **unreferenced** component if TypeScript still checks it; first confirm that `src/main.tsx` imports the active one.

**PowerShell parser errors with JSX or CSS:** React/TSX and CSS must be saved in source files. Do not paste raw JSX or CSS declarations directly as shell commands.

## Repository

GitHub: **[mdarhan17/mailert](https://github.com/mdarhan17/mailert)**

This repository is under active development. No open-source license has been specified in this README; do not assume one is granted.

---

<div align="center">

**Mailert — Think Before You Click.**

*Built to make suspicious emails easier to question, understand and verify.*

</div>
