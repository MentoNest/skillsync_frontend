# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Production authentication context with `useReducer` and localStorage persistence
- Role-based access control for mentors and mentees
- Login and registration forms with React Hook Form + Zod validation
- Protected route component for authentication-aware routing
- Navigation bar with user session management
- Full open source contributor documentation (README, CONTRIBUTING, CODE_OF_CONDUCT)
- GitHub issue templates for bugs, feature requests, and good first issues
- CI/CD pipeline with GitHub Actions (linting, type checking, testing, building)

### Changed
- Standardized all components to use the single production AuthContext (removed duplicate mock context)
- Cleaned up login page to remove legacy code and mock dependencies
- Unified state management across the application

### Fixed
- Resolved authentication state duplication issue
- Fixed race conditions in auth state initialization
- Addressed localStorage persistence bugs

## [0.1.0] - 2026-08-04
### Added
- Initial project setup with Next.js 14
- Basic project structure and configuration
- First commit of core authentication system