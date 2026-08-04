# Security Policy

## Supported Versions
The MentoNest SkillSync team actively supports the following versions with security updates:

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | :white_check_mark:  |
| < 1.0   | :x:                |

## Reporting a Vulnerability
We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly by:

1. **Emailing our security team**: security@mentonest.org with a detailed description of the vulnerability
2. **Do NOT open a public GitHub issue** - this could expose the vulnerability before it's patched
3. **Include steps to reproduce** and any potential impact assessments
4. **Allow 48 hours** for our team to acknowledge your report

We will:
- Acknowledge receipt of your report within 48 hours
- Provide a timeline for fixing the issue
- Credit you in the security advisory if you wish
- Work with you to coordinate the public disclosure

## Security Best Practices for Contributors
- Never commit secrets, API keys, or credentials to the repository
- Use the provided .env.example for environment variable configuration
- Keep dependencies updated (Renovate bot will automate this)
- Follow OWASP guidelines when contributing to authentication or data handling features
- Run npm run lint and npm run test before submitting any PRs

## Security-Related Code
All authentication and security-critical code is located in:
- `/contexts/AuthContext.tsx` - Core authentication state management
- `/components/auth/` - Login, registration, and password reset forms
- `/lib/auth/` - JWT handling, session management, and security utilities

## Vulnerability Disclosure Process
1. Report received and triaged
2. Fix developed and tested internally
3. Security advisory published
4. Patch released to the main branch
5. Public disclosure after 7 days to allow users to update