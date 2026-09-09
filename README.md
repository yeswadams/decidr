# Decidr

> **Remember why. Learn what worked. Decide better.**
---

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Docker Image](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](#-quick-start--self-hosting)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)

---

Decidr is an open-source **decision journal** and **decision intelligence platform** built for high-velocity software engineering, product, and leadership teams. 

Teams make important decisions every day, but the context behind those decisions is often scattered across Slack messages, meetings, documents, tickets, and people's memory. Decidr brings that context into one place.

Capture a decision, document the assumptions behind it, record what you expected to happen, revisit the outcome, and use AI to uncover blind spots and patterns in how decisions are made.

**The goal is simple: turn decisions into organizational memory.**

---

## Table of Contents

- [Why Decidr](#why-decidr)
- [The Decision Context Gap](#the-decision-context-gap)
- [Core Workflow](#core-workflow)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Feature Isolation](#feature-isolation)
- [Database Architecture](#database-architecture)
- [PostgreSQL Anywhere](#postgresql-anywhere)
- [Local Database Development](#local-database-development)
- [Authentication and Authorization](#authentication-and-authorization)
- [AI Architecture](#ai-architecture)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Contributing](#contributing)
- [Reporting Bugs](#reporting-bugs)
- [Security](#security)
- [Roadmap](#roadmap)
- [Self-Hosting](#self-hosting)
- [Design Philosophy](#design-philosophy)
- [Decision Framework](#decision-framework)
- [Project Status](#project-status)
- [License](#license)

---

## Why Decidr

A decision without context becomes difficult to evaluate later.

Imagine a product team deciding to launch a free tier. At the time, they believed:

- Free users would increase product adoption.
- Conversion to paid plans would remain healthy.
- Support costs would remain manageable.

Six months later, adoption has increased, but conversion has fallen and support costs have doubled.

Without the original context, the team can only look at the result. With Decidr, the team can ask:

> **What did we believe when we made this decision?**

And then:

> **Which assumptions were right, which were wrong, and what can we learn from this?**

That feedback loop is the foundation of Decidr.

---

## The Decision Context Gap

Teams are good at recording **what** happened. They're much worse at preserving **why**.

| Today | With Decidr |
|---|---|
| Decisions buried across Slack, meetings, and documents | One searchable decision timeline |
| Assumptions live in people's heads | Assumptions captured alongside each decision |
| Decisions are rarely revisited | Scheduled prompts for structured retrospectives |
| Teams repeat mistakes without seeing the pattern | AI surfaces blind spots and recurring patterns |
| Decision history lives inside closed platforms | Open source, self-hosted, and under your control |

> **Capture the context. Track the outcome. Learn what works.**

---

## Core Workflow

Decidr follows a simple decision lifecycle:

```
Context → Problem → Alternatives → Assumptions → Decision
  → Expected Outcome → Review → Actual Outcome → Retrospective → Learning
```

The important part is the final step. Decidr is not just a place to store decisions — it is designed to create a **learning loop**.

---

## Features

### Decision Journal

Create structured decision records containing:

- Decision title and context
- Problem statement
- Alternatives considered
- Decision owner and confidence level
- Assumptions and expected outcomes
- Success metrics and review date

### Decision Timeline

View decisions chronologically instead of searching through old conversations and documents.

```
Decision → Assumptions → Expected Outcome → Actual Outcome → Learning
```

### Assumption Tracking

Every important decision is based on assumptions. Decidr makes those assumptions explicit so they can later be evaluated.

| | |
|---|---|
| **Assumption** | Users will prefer a free plan over a 14-day trial. |
| **Expected** | Higher activation and increased product adoption. |
| **Actual** | Activation increased, but paid conversion decreased. |
| **Learning** | The assumption was partially correct. |

### AI Decision Analysis

Before committing a decision, Decidr can analyze the available context and surface:

- Potential risks
- Missing considerations
- Blind spots
- Contradictory assumptions
- Suggested success metrics
- Questions worth answering before proceeding

AI is used as a **thinking partner**, not as the decision-maker.

### Outcome Tracking

A decision isn't complete when someone clicks "Decide." Decidr allows teams to record what actually happened and compare it against the original expectation.

| Expected | Actual |
|---|---|
| 20% increase in activation | 14% increase |
| 10% paid conversion | 7.8% |
| 2-week implementation | 5 weeks |

The difference between expectation and reality becomes useful data.

### Decision Retrospectives

When a decision reaches its review date, Decidr prompts the team to revisit it. A retrospective captures:

- What happened?
- What went well? What went wrong?
- Which assumptions were correct? Which failed?
- Would we make the same decision again?
- What should we do differently next time?

### Decision Intelligence

Over time, individual decisions become a dataset. Decidr can identify patterns such as:

- *Engineering estimates are consistently more optimistic than actual delivery times.*
- *Decisions made with low confidence have a higher rate of reversal.*
- *Customer research appears more frequently in successful product decisions.*

The long-term vision is to help teams understand **how** they make decisions, not just **what** they decided.

---

## Architecture

```
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Next.js Web     │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │ HTTP / JSON
                                    ▼
                         ┌─────────────────────┐
                         │    Decidr API       │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
        ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
        │   PostgreSQL   │ │   AI Provider  │ │    Analytics   │
        │ Any PostgreSQL │ │ OpenAI/Gemini/ │ │   (Optional)   │
        │   deployment   │ │ Anthropic/etc. │ │                │
        └────────────────┘ └────────────────┘ └────────────────┘
```

**Architectural Principle:** Decidr does not depend on a Backend-as-a-Service database. The frontend never communicates with the database directly — all access goes through the Decidr backend.

```
Frontend → (HTTP) → Backend → (SQL/ORM) → PostgreSQL
```

This separation provides a clear security boundary, centralized business logic, database independence, easier testing, and less coupling to any particular cloud provider.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Frontend Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Backend | Node.js + TypeScript |
| API | REST |
| Database | PostgreSQL |
| Database Development | pgAdmin |
| Authentication | Backend-managed |
| AI | Provider abstraction |
| Frontend Deployment | Vercel or equivalent |
| Backend Deployment | Any Node.js-compatible host |
| Database Hosting | Any PostgreSQL-compatible provider |

---

## Project Structure

```
decidr/
│
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── types/
│   │   └── public/
│   │
│   └── api/
│       ├── src/
│       │   ├── config/
│       │   ├── database/
│       │   ├── middleware/
│       │   ├── modules/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── shared/
│       │   └── main.ts
│       └── tests/
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── scripts/
│
├── packages/
│   ├── types/
│   ├── ui/
│   └── config/
│
├── docs/
│   ├── architecture/
│   ├── development/
│   └── product/
│
├── .env.example
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── README.md
```

---

## Feature Isolation

One of Decidr's core engineering principles: **a failure in one feature should not bring down the entire product.**

Features are organized as independent vertical slices:

```
modules/
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.repository.ts
│   ├── auth.schema.ts
│   └── auth.routes.ts
│
├── decisions/
│   ├── decision.controller.ts
│   ├── decision.service.ts
│   ├── decision.repository.ts
│   ├── decision.schema.ts
│   └── decision.routes.ts
│
├── assumptions/
├── outcomes/
└── ai/
    ├── ai.controller.ts
    ├── ai.service.ts
    ├── providers/
    └── schemas/
```

Each feature owns its routes, validation, business logic, database access, tests, and feature-specific types. Shared functionality belongs in explicitly shared modules.

**Frontend features follow the same principle:**

```
features/decisions/
├── components/
│   ├── decision-form.tsx
│   ├── decision-card.tsx
│   └── decision-timeline.tsx
├── hooks/
│   └── use-decisions.ts
├── api/
│   └── decisions-api.ts
└── types.ts
```

---

## Database Architecture

PostgreSQL is a first-class part of Decidr — not hidden behind a BaaS abstraction.

```
users
  └── workspace_members
             └── workspaces
                      └── decisions
                               ├── assumptions
                               ├── alternatives
                               ├── metrics
                               └── reviews
                                       └── outcomes
```

**Database Principles:**

- PostgreSQL is the source of truth
- Schema changes are version-controlled
- Migrations are committed to the repository
- Foreign keys enforce relationships
- Transactions are used where multiple writes must succeed or fail together
- Business-critical authorization is enforced by the backend and database design

---

## PostgreSQL Anywhere

Decidr works with any standard PostgreSQL connection. The application only needs a connection string — where PostgreSQL runs is an infrastructure decision, not an application dependency.

Supported providers include: Local PostgreSQL, AWS RDS, Azure Database for PostgreSQL, Google Cloud SQL, Render, Neon, Supabase, and any standard PostgreSQL host.

---

## Local Database Development

Development does not require a cloud database. Install PostgreSQL locally and manage it with pgAdmin.

```
┌──────────────────────┐
│      Decidr API      │
└──────────┬───────────┘
           │ PostgreSQL
           ▼
┌──────────────────────┐
│  Local PostgreSQL    │
│  Database: decidr    │
│  Port: 5432          │
└──────────┬───────────┘
           ▼
       ┌────────┐
       │pgAdmin │
       └────────┘
```

The goal is not to make PostgreSQL disappear — the goal is to make PostgreSQL **understandable**.

---

## Authentication and Authorization

Authentication and authorization are separate concerns:

```
Authentication → Who are you?
Authorization  → What are you allowed to access?
```

The backend owns all authentication-sensitive logic. The authenticated identity is derived from the session/token server-side — never from a user-provided `user_id` in the request body. This prevents users from simply changing an ID and accessing another user's data.

---

## AI Architecture

AI functionality is isolated behind an application-level abstraction:

```
Component
    ↓
Decision Intelligence Service
    ↓
AI Provider Interface
    ├── OpenAI
    ├── Gemini
    ├── Anthropic
    └── Other providers
```

The application does not need to know which model generated the analysis. This makes it possible to change providers, support multiple providers, add local models, and allow self-hosted installations to choose their own provider.

AI output should be treated as **advisory** — it may be incorrect, incomplete, or based on insufficient context. Users remain responsible for evaluating AI-generated insights.

---

## Environment Variables

```bash
cp .env.example .env
```

```env
# Application
NODE_ENV=development
PORT=4000
APP_URL=http://localhost:4000
WEB_URL=http://localhost:3000

# PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/decidr

# Authentication
AUTH_SECRET=

# AI
AI_PROVIDER=
AI_API_KEY=

# Analytics
ANALYTICS_ENABLED=false
```

> **Never commit** `.env`, API keys, database passwords, authentication secrets, or production credentials. Commit `.env.example` with safe placeholder values only.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or another supported package manager
- PostgreSQL 16+ (recommended)
- pgAdmin 4 (recommended for database administration)
- Git
- An AI provider account (if AI features are enabled)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/decidr.git
cd decidr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a PostgreSQL database

```sql
CREATE DATABASE decidr;

CREATE USER decidr_dev WITH PASSWORD 'change_this_password';

GRANT ALL PRIVILEGES ON DATABASE decidr TO decidr_dev;
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Set your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://decidr_dev:change_this_password@localhost:5432/decidr
```

### 5. Run database migrations

```bash
npm run db:migrate
```

### 6. Seed development data

```bash
npm run db:seed
```

> Seed data is for development only. Never seed production with example credentials.

### 7. Start the backend

```bash
npm run dev:api
```

### 8. Start the frontend

```bash
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000).

---

## Development Workflow

```bash
git checkout -b feat/decision-retrospectives

# make changes, then:
git add .
git commit -m "feat: add decision retrospective workflow"
git push origin feat/decision-retrospectives
```

**Commit conventions:**

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `test:` | Adding or updating tests |
| `refactor:` | Code refactoring |
| `chore:` | Dependency updates, tooling |

---

## Testing

Tests should exist at three levels:

| Level | What it tests |
|---|---|
| Unit tests | Isolated business logic (validation, calculations, AI response parsing) |
| API tests | Authentication, authorization, request validation, HTTP responses |
| Integration tests | Interactions between backend, PostgreSQL, auth, and external services |

A feature is not complete because its happy path works. **Test failure paths too.**

API errors should return predictable, structured responses:

```json
{
  "error": {
    "code": "DECISION_NOT_FOUND",
    "message": "The requested decision could not be found."
  }
}
```

Never leak SQL errors, stack traces, internal file paths, secrets, or database credentials in responses.

---

## Contributing

Contributions are welcome. You don't need to be an expert in every part of the stack. There are opportunities across:

Product design · UX research · Frontend · Backend · PostgreSQL · AI engineering · Testing · Documentation · Accessibility · Developer experience

**Before contributing:**

1. Read this README and `CONTRIBUTING.md`
2. Check existing issues and pull requests
3. Look for issues marked `good first issue` if you're new
4. Open an issue before making a large architectural change
5. Keep pull requests focused on one problem

**A good pull request should:**

- Explain what changed and why
- Include screenshots for UI changes
- Include tests where appropriate
- Avoid unrelated refactoring
- Update documentation when behavior changes
- Include database migrations when the schema changes

---

## Reporting Bugs

Open an issue and include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser / OS where relevant
- Console or server errors
- Screenshots where useful

Remove API keys, passwords, tokens, and personal information before posting logs.

---

## Security

Security issues should **not** be reported through public GitHub issues. Use the repository's configured private security reporting channel.

Do not publicly disclose authentication bypasses, authorization bypasses, cross-user data access, SQL injection vulnerabilities, or any exposed credentials or sensitive user data.

See `SECURITY.md` for the full security policy.

---

## Roadmap

### Phase 1 — Decision Journal
- [ ] User authentication
- [ ] Create decisions
- [ ] Capture decision context
- [ ] Record alternatives and assumptions
- [ ] Confidence scoring
- [ ] Decision timeline
- [ ] Search and filtering

### Phase 2 — Decision Review
- [ ] Review dates
- [ ] Outcome tracking
- [ ] Expected vs actual outcomes
- [ ] Retrospectives
- [ ] Decision effectiveness scoring

### Phase 3 — Decision Intelligence
- [ ] AI blind-spot detection
- [ ] AI decision analysis
- [ ] Pattern detection
- [ ] Decision trend analysis
- [ ] Team-level insights

### Phase 4 — Collaboration
- [ ] Team workspaces
- [ ] Decision ownership
- [ ] Comments and participants
- [ ] Decision sharing
- [ ] Notifications

### Phase 5 — Integrations
Slack · Linear · Jira · GitHub · Notion · Microsoft Teams

The roadmap is intentionally flexible. Community feedback influences what gets built next.

---

## Self-Hosting

One of Decidr's core goals is to make decision intelligence available without requiring organizations to surrender control of their data.

A self-hosted installation gives you control over:

- Application hosting
- PostgreSQL database
- Authentication configuration
- AI provider
- Analytics configuration
- Data retention and backups

**Deployment options:**

| Layer | Options |
|---|---|
| Frontend | Vercel, Netlify, Cloudflare, self-hosted |
| Backend | Render, Railway, Fly.io, AWS, Azure, GCP, VPS, Kubernetes |
| PostgreSQL | Local, AWS RDS, Azure Database, Google Cloud SQL, Render, Neon, Supabase, self-hosted |

These are infrastructure options, not application dependencies. The PostgreSQL provider can be changed without changing the application's data model.

---

## Design Philosophy

Decidr should feel like a place where people **think**, not another corporate dashboard.

The interface prioritizes clarity, context, calmness, progressive disclosure, readability, fast workflows, and meaningful information density. A decision should be understandable without opening ten different screens. Good decision hygiene should be easier to practice consistently — not turned into bureaucracy.

---

## Decision Framework

The underlying Decidr framework:

| # | Question |
|---|---|
| 1 | What problem are we solving? |
| 2 | What context do we have? |
| 3 | What alternatives did we consider? |
| 4 | What are we assuming? |
| 5 | What did we decide? |
| 6 | How confident are we? |
| 7 | What do we expect to happen? |
| 8 | How will we measure success? |
| 9 | When should we review it? |
| 10 | What actually happened? |
| 11 | What did we learn? |
| 12 | Would we make the same decision again? |

---

## Open Source Philosophy

Decidr is open source because organizational memory should not have to live inside a proprietary system.

The project aims to give teams control over their code, data, database, infrastructure, and AI provider. That means:

- PostgreSQL remains a standard PostgreSQL database
- Migrations are version-controlled
- Infrastructure is replaceable
- AI providers are abstracted
- Documentation is part of the product
- Contributors can understand the system without access to a private environment

---

## Project Status

**Early-stage / Active Development**

Decidr is currently being developed as an open-source project and hackathon submission. The API, database schema, UI, architecture, and feature set may change significantly while the project matures. Expect breaking changes during early development.

---

## License

Decidr is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

You are free to use, study, modify, self-host, distribute, and contribute improvements to Decidr. See `LICENSE` for the complete license text.

---

*Built with curiosity.*

**Decidr — Remember why. Learn what worked. Decide better.**
