![dodgez.dev logo](https://www.dodgez.dev/favicon.ico)

# dodgez.dev source code

This repository contains the source code for [dodgez.dev](https://www.dodgez.dev), Zachary Dodge's personal website.

## Source overview

- [public/](https://github.com/dodgez/dodgez-dev/tree/main/public) - static files served as-is
- [src/components/](https://github.com/dodgez/dodgez-dev/tree/main/src/components) - reusable client-side React components
- [src/layouts/Layout.astro](https://github.com/dodgez/dodgez-dev/blob/main/src/layouts/Layout.astro) - the common page layout
- [src/pages/](https://github.com/dodgez/dodgez-dev/tree/main/src/pages) - the astro pages for the site
- [src/utils/](https://github.com/dodgez/dodgez-dev/tree/main/src/utils) - utilities like the common route information

## Technologies used

- [Astro](https://astro.build) - the web framework used for the site
- [React](https://react.dev) - client-side components
- [TypeScript](https://www.typescriptlang.org) - superset of JavaScript
- [Bun](https://bun.sh) - package management and execution environment
- [Tailwind CSS](https://tailwindcss.com) - component styling
- [AWS](https://aws.amazon.com) - backend services with source at the [backend repo](https://github.com/dodgez/dodgez-dev-cdk)

## Development

This repository uses [Bun](https://bun.sh) as the package manager and execution environment.
Getting started is as simple as installing Bun and running `bun install` at the project root to install the project's dependencies followed by any of the following:

- `bun start` opens a dev server at http://localhost:4321
- `bun run dev` same as `bun start`
- `bun run check` checks formatting, runs linters, and typechecks the code
- `bun run build` builds the site for production (runs `bun run check` before proper build)
- `bun run preview` previews the local production build (from `bun run build`)
