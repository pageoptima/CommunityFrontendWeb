# CommunityFrontendWeb

Next.js frontend scaffold for the community platform.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- TanStack Query
- Axios
- React Hook Form + Zod
- shadcn/ui-ready structure

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm format`
- `pnpm lint-staged`
- `pnpm commitlint`

## Project Structure

```text
src
├─ app
│  ├─ (public)
│  ├─ favicon.ico
│  ├─ globals.css
│  └─ layout.tsx
├─ components
│  ├─ layout
│  ├─ shared
│  └─ ui
├─ config
├─ constants
├─ features
│  ├─ auth
│  ├─ community
│  └─ home
├─ hooks
├─ lib
├─ providers
├─ services
│  └─ http
├─ styles
└─ types
```

## Notes

- `src/components/ui` is reserved for design-system and shadcn-based primitives.
- `src/features/*` is where domain-specific components, schemas, and API logic should live.
- `src/services/http` contains low-level API client utilities shared across features.
- `src/config` is for environment and site-level configuration.

## Git Workflow

- Pre-commit runs `lint-staged` on staged files only.
- JavaScript and TypeScript files run `eslint --fix` and `prettier --write`.
- Markdown, JSON, CSS, HTML, and YAML files run `prettier --write`.
- Commit messages must follow conventional commit format.

Examples:

- `feat(auth): add register form shell`
- `fix(ui): correct mobile header spacing`
- `docs: update setup instructions`
