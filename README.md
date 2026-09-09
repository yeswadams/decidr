# Decidr

> **Remember why. Learn what worked. Decide better.**

Decidr is an open-source **decision journal** and **decision intelligence platform** built for high-velocity software engineering, product, and leadership teams. 

Teams make hundreds of critical decisions every year—architectural choices, vendor selections, product pivots, and strategic trade-offs—but rarely capture the full context behind them. When circumstances change or outcomes falter, teams often forget *why* a decision was originally made, what assumptions influenced it, or what alternatives were considered.

Decidr bridges this context gap by transforming transient discussions into persistent, searchable, and actionable **organizational memory**.

---

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Docker Image](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](#-quick-start--self-hosting)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)

---

## Table of Contents

- [Why Decidr?](#-why-decidr)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start \& Self-Hosting](#-quick-start--self-hosting)
- [Configuration \& BYO-AI](#-configuration--byo-ai)
- [Development Setup](#-development-setup)
- [Project Roadmap](#-project-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## Why Decidr?

Most modern software tools help teams track **what** happened (Jira tickets, Git commits, Slack logs, Notion pages). 

**Decidr helps teams remember *why*.**

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE DECISION CONTEXT GAP                        │
├───────────────────────────────────┬────────────────────────────────────┤
│ Traditional Documentation          │ Decidr Decision Intelligence       │
├───────────────────────────────────┼────────────────────────────────────┤
│ ❌ Decisions hidden in Slack threads │ ✅ Centralized decision timeline   │
│ ❌ Unstated or forgotten assumptions│ ✅ Explicit assumption tracking    │
│ ❌ No follow-up on actual outcomes │ ✅ Scheduled retrospective triggers│
│ ❌ Repeat mistakes across teams   │ ✅ AI blind-spot & pattern analysis│
│ ❌ Locked in proprietary SaaS     │ ✅ 100% Open Source & Self-Hosted  │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## Key Features

### 1. Structured Decision Journaling
Capture decision records with rich metadata: problem statements, options evaluated, chosen alternative, rationale, drivers, approvers, and confidence ratings ($1-100\%$).

### 2. Interactive Decision Timeline
Filter and visualize decisions across team workspaces by domain, owner, urgency, or status (Proposed, Decided, Under Review, Superseded).

### 3. Bring-Your-Own-AI (BYO-AI) Analysis
Connect OpenAI, Anthropic, or local Ollama instances to run automated risk assessments, identify logical fallacies, test underlying assumptions, and highlight potential blind spots before finalizing a decision.

### 4. Assumption & Outcome Tracking
Link concrete assumptions to every decision and attach expected success metrics. Set automated review dates to compare projected outcomes against reality.

### 5. Structured Retrospectives
Conduct post-decision retrospectives to evaluate *decision quality* independently from *outcome quality*, fostering a blameless, learning-driven team culture.

### 6. Decision Pattern & Bias Detection
Aggregate analytics identify recurring team patterns, systematic over-confidence, cognitive biases, or recurring technical debt drivers.

### 7. Enterprise-Grade Workspace Isolation
Multi-tenant logical workspace isolation ensuring strict data security and role-based access control (RBAC).

---

## System Architecture

Decidr is designed around the **4 Primary Colors of Computer Science** (Compute, Memory, Storage, Network) and guided by strict software reliability principles for maximum predictability and minimal operational overhead.

```
                  ┌──────────────────────────────────────────┐
                  │          NETWORK: Edge Reverse Proxy     │
                  │   (Caddy/NGINX - TLS 1.3, Rate Limits)   │
                  └─────────────────────┬────────────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌───────────────────────────┐                       ┌────────────────────────────┐
│      COMPUTE: Web API     │                       │  COMPUTE: Async Workers    │
│  (Node.js App Nodes)      │                       │  (BullMQ Event Processors) │
└────────────┬──────────────┘                       └──────────────┬─────────────┘
             │                                                     │
             ├──────────────────────────┬──────────────────────────┤
             ▼                          ▼                          ▼
┌───────────────────────────┐┌───────────────────────────┐┌───────────────────────────┐
│       MEMORY: Cache       ││     STORAGE: Relational   ││     STORAGE: Object Store │
│ (Redis L2 + In-Process L1)││ (PostgreSQL + JSONB Engine││   (MinIO / S3 - Attachments)│
└───────────────────────────┘└───────────────────────────┘└───────────────────────────┘
```

### Resource Allocation Matrix

| Dimension | Technology | Role \& Rationale |
| :--- | :--- | :--- |
| **Compute** | Next.js Standalone + BullMQ | Stateless UI/API nodes for instant response; isolated worker processes for background AI analysis. |
| **Memory** | Redis + In-Memory LRU | Ephemeral caching for sessions, rate limits, job queues, and hot lookup tables. |
| **Storage** | PostgreSQL (JSONB) + MinIO | Relational integrity for decision trees + JSONB for evolving AI schema attributes + object store for attachments. |
| **Network** | Caddy / NGINX | TLS 1.3 edge termination, reverse proxy isolation, and outbound AI request proxying. |

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/)
- **Queues & Caching:** [Redis](https://redis.io/) + [BullMQ](https://docs.bullmq.io/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/docs) (Supporting OpenAI, Anthropic, Ollama)
- **Validation:** [Zod](https://zod.dev/) runtime schema checking
- **Packaging:** Docker & Docker Compose

---

## Quick Start & Self-Hosting

The fastest way to get Decidr running is via Docker Compose.

### Prerequisites
- Docker Engine $\ge 24.0$
- Docker Compose $\ge v2.20$

### 1. Clone the Repository
```bash
git clone https://github.com/yeswadams/your-org/decidr.git
cd decidr
```

### 2. Configure Environment Variables
Copy the sample environment file:
```bash
cp .env.example .env
```

Edit `.env` to set your secret keys and database passwords:
```env
# Core Application
PORT=3000
NEXTAUTH_SECRET=change-this-to-a-secure-random-secret
NEXTAUTH_URL=http://localhost:3000

# Database & Redis
DATABASE_URL=postgresql://decidr:decidr_secret@postgres:5432/decidr?schema=public
REDIS_URL=redis://redis:6379

# BYO-AI Provider Configuration
AI_PROVIDER=openai # Options: openai | anthropic | ollama
OPENAI_API_KEY=sk-proj-your-key-here
# OLLAMA_BASE_URL=http://host.docker.internal:11434 # Un-comment for local AI
```

### 3. Launch the Stack
```bash
docker compose up -d
```

### 4. Access Decidr
Open your browser and navigate to:
```
http://localhost:3000
```
Follow the on-screen setup wizard to create your primary administrator account and initial workspace.

---

## Configuration & BYO-AI

Decidr is designed around a **Bring-Your-Own-AI (BYO-AI)** model, putting you in control of cost, privacy, and performance.

### Supported AI Providers

#### 1. OpenAI
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-key
AI_MODEL=gpt-4o-mini
```

#### 2. Anthropic
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-key
AI_MODEL=claude-3-5-sonnet-20241022
```

#### 3. Local Ollama (100% Air-Gapped / Private)
Run local LLMs with zero external network transmission:
```env
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
AI_MODEL=llama3.1:8b
```

---

## Development Setup

If you wish to contribute to Decidr or build custom integrations locally:

### Prerequisites
- Node.js $\ge 20.0.0$
- pnpm $\ge 9.0.0$
- Local PostgreSQL and Redis instances (or run `docker compose up postgres redis -d`)

### Local Setup Instructions

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Run Database Migrations & Generate Prisma Client:**
   ```bash
   pnpm prisma migrate dev
   pnpm prisma generate
   ```

3. **Seed Development Database (Optional):**
   ```bash
   pnpm db:seed
   ```

4. **Start the Development Server:**
   ```bash
   pnpm dev
   ```
   The application will start on `http://localhost:3000`.

5. **Run Test Suite:**
   ```bash
   pnpm test         # Unit & Integration Tests
   pnpm test:e2e     # Playwright E2E Tests
   pnpm lint         # Typecheck & ESLint
   ```

---

## Project Roadmap

- [x] Core Decision Journaling & Context Capture
- [x] Multi-tenant Workspace Infrastructure
- [x] BYO-AI Provider Integration (OpenAI, Anthropic, Ollama)
- [x] Assumption & Outcome Tracking Engine
- [ ] Slack & Microsoft Teams Webhook Integrations
- [ ] Custom Architectural Decision Record (ADR) Export Formats (Markdown, PDF)
- [ ] Vector Memory (pgvector) for Semantic Decision Search
- [ ] Automated Bias Identification in Retrospectives

---

## Contributing

We actively welcome contributions from the open-source community! Whether you are interested in UX design, AI prompting, database optimization, backend engineering, or documentation, there are many ways to get involved.

### How to Contribute
1. **Explore Open Issues:** Check out our [Good First Issues](https://github.com/your-org/decidr/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).
2. **Submit a Proposal:** For major feature changes, please open a Discussion or Issue first to coordinate with maintainers.
3. **Follow Coding Standards:**
   - Strict TypeScript checks (`noImplicitAny`).
   - Clean, modular functions under 60 lines where possible.
   - High assertion density and explicit error handling.
   - Comprehensive unit tests for new features.

Please review our [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before submitting pull requests.

---

## License

Decidr is open-source software licensed under the **[GNU Affero General Public License v3.0 (AGPL-3.0)](./LICENSE)**.

Under this license, you are free to inspect, modify, and self-host Decidr. Any network-accessible derivative works or enhancements must also be open-sourced under the AGPL-3.0 license.

---

<p center>
  Built with ❤️ for teams that value clear thinking and organizational memory.
</p>
