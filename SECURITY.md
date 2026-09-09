# Security Policy

Decidr takes security seriously. This document explains how to report vulnerabilities, what is in scope, and what contributors should know about security-sensitive areas of the codebase.

---

## Table of Contents

- [Reporting a Vulnerability](#reporting-a-vulnerability)
- [What to Include](#what-to-include)
- [What Not to Do](#what-not-to-do)
- [Response Timeline](#response-timeline)
- [Scope](#scope)
- [Out of Scope](#out-of-scope)
- [Security-Sensitive Areas](#security-sensitive-areas)
- [Supported Versions](#supported-versions)
- [Security Best Practices for Contributors](#security-best-practices-for-contributors)
- [Disclosure Policy](#disclosure-policy)

---

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub issues.**

Use GitHub's private vulnerability reporting feature instead:

1. Go to the [Security tab](../../security) of this repository.
2. Click **"Report a vulnerability"**.
3. Fill in the details described below.

This keeps the report private until a fix is in place and a coordinated disclosure can happen.

If you are unsure whether something is a security issue, err on the side of reporting it privately. We would rather review something that turns out to be a non-issue than have a real vulnerability disclosed publicly.

---

## What to Include

A useful vulnerability report includes:

| Field | Details |
|---|---|
| **Type** | e.g. SQL injection, auth bypass, IDOR, XSS, data exposure |
| **Component** | Which part of the application is affected (API, frontend, database layer, auth) |
| **Steps to reproduce** | A clear, minimal sequence of steps that demonstrates the vulnerability |
| **Expected behaviour** | What should have happened |
| **Actual behaviour** | What actually happened |
| **Impact** | What an attacker could achieve by exploiting this |
| **Environment** | Version, deployment type, any relevant configuration |
| **Proof of concept** | Code, screenshots, or HTTP request/response examples (if available) |

The more clearly you can demonstrate the issue, the faster we can verify and fix it.

---

## What Not to Do

- Do not publicly disclose a vulnerability before a fix has been released.
- Do not test against production systems or accounts that are not your own.
- Do not access, modify, or delete data that belongs to other users.
- Do not perform denial-of-service testing.
- Do not use automated scanning tools against systems you do not own.
- Do not post vulnerability details in public issues, pull requests, discussions, or social media.

---

## Response Timeline

We aim to respond according to the following timeline:

| Stage | Target |
|---|---|
| Initial acknowledgement | Within 72 hours |
| Confirmed or closed | Within 7 days |
| Fix in progress (for confirmed issues) | Communicated in the report thread |
| Public disclosure | After a fix is released, coordinated with the reporter |

Timelines may vary depending on severity and complexity. We will keep you updated in the private report thread.

---

## Scope

The following are in scope for vulnerability reports:

**Decidr API (backend)**
- Authentication and session management vulnerabilities
- Authorization bypasses (accessing another user's decisions, workspaces, or data)
- Insecure direct object references (IDOR)
- SQL injection or unsafe database queries
- Sensitive data exposure in API responses
- Business logic vulnerabilities with security impact
- Injection vulnerabilities in AI prompt construction that could expose user data

**Decidr Web (frontend)**
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Sensitive data exposed in client-side storage or network responses
- Authentication token handling issues

**Database**
- Misconfigured permissions that allow unauthorized access
- Data leakage between workspaces or users

**Authentication**
- Session fixation or hijacking
- Credential exposure
- Broken password reset or account verification flows

**Self-hosted deployments**
- Vulnerabilities in the default configuration that create risks for self-hosters

---

## Out of Scope

The following are generally not in scope:

| Issue | Reason |
|---|---|
| Missing security headers on a local development build | Development builds are not hardened by design |
| Rate limiting on non-sensitive endpoints | May be intentionally deferred |
| Theoretical vulnerabilities with no practical exploit path | Must be demonstrably exploitable |
| Vulnerabilities requiring physical access to a user's device | Out of application scope |
| Social engineering attacks | Not a software vulnerability |
| Denial of service via resource exhaustion | Not in scope unless it reveals a logic flaw |
| Third-party dependencies with known CVEs | Report these through the dependency's own channel; open a regular issue here if an upgrade is blocked |
| Security issues in AI provider APIs | Report to the provider directly |
| Self-hosted deployments with a deliberately weakened configuration | Operator responsibility |

---

## Security-Sensitive Areas

The following parts of the codebase are particularly security-sensitive. Contributors working in these areas should take extra care.

### Authentication

- All authentication logic lives in the backend. The frontend must never make trust decisions based solely on client-side state.
- Session tokens and authentication secrets must never be logged, included in error responses, or exposed in the frontend.
- Password reset and email verification flows must be resistant to token enumeration.

### Authorization

- The authenticated user identity must always be derived from the verified session or token — never from a user-supplied value in the request body, query string, or headers.
- Every database query that accesses user or workspace data must scope that query to the authenticated user's identity.
- Never trust a `user_id`, `workspace_id`, or `decision_id` in a request without verifying the authenticated user has access to that resource.

### Database access

- Use parameterised queries or ORM methods. Never construct SQL strings by concatenating user input.
- Database error messages must not reach the API response. Catch and log them server-side; return a generic error to the client.
- Migrations must not drop or truncate data without an explicit down migration and documented reason.

### AI prompt construction

- User-supplied content included in AI prompts must be treated as untrusted input.
- Prompt construction must not expose one user's data to a context associated with another user.
- Raw AI provider errors must not be forwarded to the client.

### Environment variables and secrets

- Secrets must only ever be accessed via environment variables.
- No secret, credential, or API key should appear in source code, comments, logs, or migration files.
- `.env` files must never be committed. Only `.env.example` with placeholder values.

### Error handling

API error responses must never include:

- SQL error text
- Stack traces
- Internal file paths
- Authentication secrets
- Database credential details
- Provider-specific sensitive information

---

## Supported Versions

Decidr is in early-stage active development. Security fixes are applied to the latest version only.

| Version | Supported |
|---|---|
| Latest (`main`) | ✅ Yes |
| Older releases | ❌ No |

If you are self-hosting, keep your installation up to date.

---

## Security Best Practices for Contributors

If you are contributing to Decidr, follow these practices:

**Never commit secrets.** Before pushing, check that your diff does not contain API keys, passwords, tokens, or database credentials. Use a tool like [`git-secrets`](https://github.com/awslabs/git-secrets) or [`gitleaks`](https://github.com/gitleaks/gitleaks) locally.

**Validate all input at the boundary.** Treat everything from the request — body, query string, headers, path parameters — as untrusted. Validate before it reaches your service or repository layer.

**Scope every query to the authenticated user.** If you write a repository method that retrieves records, make sure it filters by the authenticated user's identity, not an ID passed in the request.

**Return generic errors to the client.** Log detailed errors server-side. Return controlled, predictable error codes to the client.

**Be careful with logging.** Do not log request bodies that may contain passwords, tokens, or sensitive user content. Do not log full AI prompts that may contain user decision context.

**Avoid hardcoded configuration.** Anything that varies between environments (URLs, feature flags, API endpoints) belongs in environment variables, not in source code.

**Check your dependencies.** When adding a new dependency, consider its maintenance status and known vulnerabilities. Run `npm audit` periodically.

---

## Disclosure Policy

Decidr follows a **coordinated disclosure** model:

1. A vulnerability is reported privately.
2. The maintainers acknowledge receipt and begin investigation.
3. A fix is developed and tested.
4. The fix is released.
5. A security advisory is published on this repository.
6. The reporter is credited (unless they prefer to remain anonymous).

We ask reporters to keep the vulnerability private until step 5 is complete. In return, we commit to timely communication, credit for the report, and a transparent public disclosure once the fix is available.

---

*For general questions about the project, open a GitHub Discussion or issue. Security reports go through private reporting only.*

*Decidr — Remember why. Learn what worked. Decide better.*
