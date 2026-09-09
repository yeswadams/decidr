# Contributing to Decidr

> Thank you for taking the time to contribute. This document explains how to get involved, what to expect, and how to make the process smooth for everyone.

Decidr is an open-source decision journal and decision intelligence platform. Contributions of all kinds are welcome — not just code.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Before You Start](#before-you-start)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Branching and Commits](#branching-and-commits)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Database Migrations](#database-migrations)
- [AI Features](#ai-features)
- [Documentation](#documentation)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Good First Issues](#good-first-issues)
- [Getting Help](#getting-help)

---

## Code of Conduct

Decidr is committed to a welcoming and respectful environment. By participating, you agree to:

- Be respectful and constructive in all interactions
- Accept feedback without defensiveness
- Give credit where it is due
- Prioritize the health of the project over individual preferences

Harassment, discrimination, and deliberately harmful behaviour will not be tolerated. Issues of conduct can be reported privately to the maintainers.

---

## Ways to Contribute

You do not need to be an expert in every part of the stack. There are meaningful contributions across:

| Area | Examples |
|---|---|
| Product design | Wireframes, UX flows, accessibility improvements |
| Frontend | React components, pages, hooks, UI polish |
| Backend | API routes, services, business logic |
| Database | Migrations, query optimisation, schema improvements |
| AI engineering | Provider integrations, prompt improvements, output evaluation |
| Testing | Unit tests, API tests, integration tests |
| Documentation | README, guides, inline code comments |
| Developer experience | Tooling, CI improvements, local setup |
| Bug reports | Reproducing and clearly describing issues |
| Feature feedback | Challenging assumptions, validating product decisions |

---

## Before You Start

### Check existing work first

Before opening a pull request or starting significant work:

1. Search [open issues](../../issues) to see if the problem or feature is already being discussed.
2. Search [open pull requests](../../pulls) to avoid duplicate effort.
3. For **large architectural changes**, open an issue first and discuss it before writing code.

### For large changes

Opening an issue before writing code:

- Saves you time if the direction isn't right
- Gives maintainers a chance to provide context
- Avoids merge conflicts with work already in progress
- Creates a record of intent before the implementation

---

## Development Setup

See the [Getting Started section in the README](./README.md#getting-started) for the full setup guide.

Quick summary:

```bash
git clone https://github.com/YOUR_USERNAME/decidr.git
cd decidr
npm install
cp .env.example .env
# configure DATABASE_URL and other variables
npm run db:migrate
npm run db:seed
npm run dev:api   # in one terminal
npm run dev:web   # in another
```

You will need:

- Node.js 20+
- PostgreSQL 16+ running locally
- pgAdmin 4 (recommended)
- An AI provider API key (only needed if working on AI features)

---

## Project Structure

Decidr uses a feature-oriented architecture. Before contributing, it is worth understanding how the codebase is organised:

```
apps/web/        → Next.js frontend
apps/api/        → Node.js backend
database/        → Migrations, seeds, scripts
packages/        → Shared types, UI, config
docs/            → Architecture and product documentation
```

Each feature is a vertical slice that owns its own routes, validation, business logic, database access, and tests. Read the [Feature Isolation section of the README](./README.md#feature-isolation) before contributing to a feature.

---

## Branching and Commits

### Branch naming

```bash
feat/decision-retrospectives
fix/unauthorized-decision-access
docs/self-hosting-guide
test/decision-service-unit-tests
refactor/ai-provider-adapter
chore/update-dependencies
```

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|---|---|
| `feat:` | Adding a new feature |
| `fix:` | Fixing a bug |
| `docs:` | Documentation only |
| `test:` | Adding or updating tests |
| `refactor:` | Restructuring code without changing behaviour |
| `chore:` | Tooling, dependency updates, config changes |
| `perf:` | Performance improvements |
| `ci:` | CI/CD pipeline changes |

**Examples:**

```
feat: add decision retrospective workflow
fix: prevent unauthorized decision access via request body id
docs: improve self-hosting guide for Render deployments
test: add unit tests for decision service review eligibility
refactor: isolate AI provider behind shared interface
```

Keep the subject line under 72 characters. Add a body if the change needs explanation.

---

## Pull Request Guidelines

Keep pull requests **focused**. One problem per PR.

### Before opening a PR

- [ ] The code runs locally without errors
- [ ] All existing tests pass (`npm test`)
- [ ] New tests are included for new behaviour
- [ ] Database migrations are included if the schema changed
- [ ] Documentation is updated if behaviour changed
- [ ] The PR description explains what changed and why

### PR description format

```markdown
## What changed

Brief description of the change.

## Why

Why this change was made. Link to the relevant issue if one exists.

## How to test

Steps to verify the change works as expected.

## Screenshots (if UI change)

Before / after screenshots.
```

### What reviewers look for

- Does the change solve the problem it claims to solve?
- Are there missing edge cases?
- Are there missing tests?
- Does the change introduce unnecessary coupling between features?
- Are error paths handled?
- Does the change expose any sensitive information in logs or responses?

---

## Code Standards

### TypeScript

- Use TypeScript throughout. Avoid `any` unless there is a clear reason.
- Prefer explicit types over inference where it aids readability.
- Use interfaces for object shapes, types for unions and aliases.

### Naming

| Thing | Convention |
|---|---|
| Files | `kebab-case.ts` |
| React components | `PascalCase.tsx` |
| Functions and variables | `camelCase` |
| Constants | `SCREAMING_SNAKE_CASE` |
| Database tables | `snake_case` |
| Database columns | `snake_case` |

### Backend

- Controllers handle HTTP concerns only (reading the request, calling the service, returning the response).
- Services contain business logic.
- Repositories contain database access.
- Validate all input at the boundary. Never trust user-supplied data inside the service or repository layer.
- Never expose raw database errors, stack traces, or internal paths in API responses.

### Frontend

- Feature-specific components live inside `features/<name>/components/`, not in the global `components/` directory.
- Hooks that fetch data from the API live inside `features/<name>/hooks/` or `features/<name>/api/`.
- Avoid prop drilling through more than two levels. Use context or state management where appropriate.

### Error handling

The API should return consistent, predictable error responses:

```json
{
  "error": {
    "code": "DECISION_NOT_FOUND",
    "message": "The requested decision could not be found."
  }
}
```

Never leak:

- SQL error messages
- Stack traces
- Internal file paths
- Secrets or credentials
- Database constraint names

---

## Testing

Tests are expected for all non-trivial behaviour. Decidr tests at three levels:

| Level | What it covers | Location |
|---|---|---|
| Unit | Business logic, validation, calculations | `apps/api/tests/unit/` |
| API | HTTP responses, auth, request validation | `apps/api/tests/api/` |
| Integration | Backend + database interactions | `apps/api/tests/integration/` |

### Running tests

```bash
npm test              # run all tests
npm run test:unit     # unit tests only
npm run test:api      # API tests only
npm run test:watch    # watch mode
```

### What to test

- Happy paths
- Failure paths — these are often more important
- Authorization boundaries (can user A access user B's data?)
- Edge cases for inputs and states
- AI output parsing and error handling

A feature should not be considered complete until failure paths are covered.

---

## Database Migrations

If your change modifies the database schema:

1. Create a migration file in `database/migrations/`.
2. Follow the existing naming convention: `YYYYMMDD_short_description.sql` or as defined by the project's migration tool.
3. Write both an `up` migration and a `down` migration where possible.
4. Test the migration locally against a clean database.
5. Include the migration in your pull request.

**Do not:**

- Modify existing committed migration files.
- Apply schema changes manually without a migration.
- Seed production data through a migration.

---

## AI Features

Decidr abstracts AI provider access behind a shared interface. When working on AI features:

- Do not call AI providers directly from controllers, services, or frontend components.
- Use the shared AI provider interface in `modules/ai/`.
- Treat AI output as advisory — it may be incorrect or incomplete.
- Always validate and sanitise AI output before using it in the application.
- Do not expose raw AI provider errors or model names in API responses.
- If adding a new provider, implement the shared interface — do not add provider-specific logic to existing features.

---

## Documentation

Documentation is part of the product.

- Update the README if you change setup steps, architecture, or environment variables.
- Update inline comments if you change non-obvious logic.
- Add or update docs in `docs/` for architectural changes.
- If you add a new environment variable, add it to `.env.example` with a safe placeholder.

---

## Reporting Bugs

If you find a bug, open an issue and include:

- **What you expected to happen**
- **What actually happened**
- **Steps to reproduce**
- Browser and operating system (for frontend issues)
- Relevant console or server errors
- Screenshots where useful

Before posting, please:

- Remove API keys, passwords, tokens, and personal data from logs
- Check if the issue has already been reported
- Confirm you are on the latest version

---

## Suggesting Features

Open an issue with the label `enhancement` and include:

- The problem you are trying to solve
- How you currently work around it (if applicable)
- What you would expect Decidr to do instead
- Any prior art or examples from other tools

Feature requests are evaluated against the product roadmap and architectural principles. Not all requests will be accepted, but all will be read.

---

## Good First Issues

Issues marked [`good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) are suitable for contributors who are new to the codebase. They are:

- Clearly scoped
- Self-contained
- Well documented in the issue description
- Not blocking other work

If you plan to pick one up, leave a comment on the issue so others know it is being worked on.

---

## Getting Help

If you are stuck:

- Re-read the relevant section of the README
- Check existing issues and pull requests
- Open a discussion or comment on the relevant issue

Please do not open a bug report to ask a question. Use discussions or comments on existing issues where possible.

---

*Decidr — Remember why. Learn what worked. Decide better.*
