# Contributing to SkillSync
First off, thanks for taking the time to contribute! 🎉 All contributions are welcome, whether you're fixing bugs, adding features, or improving documentation.

## Code of Conduct
This project adheres to the [MentoNest Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## How to Contribute
### 1. Find an Issue
Check out our [good first issues](https://github.com/MentoNest/skillsync_frontend/labels/good%20first%20issue) or [help wanted](https://github.com/MentoNest/skillsync_frontend/labels/help%20wanted) to find tasks that are perfect for new contributors.
- Comment on the issue to let maintainers know you're working on it
- Ask questions if anything is unclear!

### 2. Set Up Your Development Environment
Follow the setup steps in the [README](README.md) to get the project running locally.

### 3. Create a Branch
Create a descriptive branch name for your work:
```bash
git checkout -b feature/add-session-reminders
# or
git checkout -b fix/login-form-validation
```

### 4. Make Your Changes
- Follow the project's code style (we use ESLint + Prettier)
- Write tests for new features
- Ensure all existing tests pass: `npm run test`

### 5. Submit a Pull Request
- Push your branch to your fork
- Open a PR against the main repository's `main` branch
- Link your PR to the issue it addresses (e.g., "Fixes #123")
- Fill out the PR template to help maintainers review your work quickly

## Pull Request Process
1. A maintainer will review your PR within 7 days
2. Address any feedback or requested changes
3. Once approved, your PR will be merged

## Development Guidelines
### Code Style
- We use ESLint for linting and Prettier for formatting
- Run `npm run lint` to check for linting errors
- Run `npm run format` to automatically format code

### Testing
- Write unit tests for all new features
- Ensure existing tests pass before submitting a PR
- We use Jest and React Testing Library for testing