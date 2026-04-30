# Branching Strategy

This repository uses a controlled branching model to protect the approved Step 1 baseline and support safe future development.

## Core Branches

### `main`

Purpose:

- stable, approved code only
- production-safe branch
- milestone releases and tags

Rules:

- do not commit directly to `main`
- all changes should reach `main` through pull requests
- only merge tested work from `develop`

### `develop`

Purpose:

- integration branch for active work
- staging area for combining feature branches
- pre-merge testing branch before `main`

Rules:

- new feature branches start from `develop`
- reviewed changes merge into `develop`
- `develop` merges into `main` when approved

## Supporting Branch Types

### `feature/*`

Used for:

- new app functionality
- UI improvements
- future service page work
- SEO setup
- CI/CD additions

Examples:

- `feature/ui-panache`
- `feature/step-2-service-pages`
- `feature/seo-foundation`

### `docs/*`

Used for:

- README updates
- project documentation
- process notes
- roadmap changes

Examples:

- `docs/project-documentation`
- `docs/step-1-docs-refresh`

### `chore/*`

Used for:

- repository housekeeping
- `.github` templates
- config cleanup
- automation setup
- non-feature maintenance work

Examples:

- `chore/repo-setup`
- `chore/github-templates`

### `fix/*`

Used for:

- bug fixes
- broken styles
- patch-level corrections

### `refactor/*`

Used for:

- internal cleanup
- reorganization without changing visible behavior

## Branch Workflow

Standard flow:

```text
feature/docs/chore branch → develop → main
```
