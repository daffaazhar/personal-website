# Daffa Azhar — personal website

A server-rendered portfolio and writing archive built with Next.js App Router,
React, TypeScript, MDX, Tailwind CSS and custom CSS tokens. Base UI provides
behavioral primitives; native Web Animations and Lenis progressively enhance motion.

## Local development

Use **Node.js 24.x** and npm (the repository includes `package-lock.json`).

```bash
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open <http://127.0.0.1:3000>. No environment file is required for local development.
The default development SEO origin is `http://localhost:3000` even when the server
is reached through `127.0.0.1`.

### Environment

`NEXT_PUBLIC_SITE_URL` is the public absolute HTTP(S) origin used for canonical,
Open Graph, structured-data, sitemap, résumé and RSS URLs. Its production default
is `https://dapu.my.id`; paths, queries and fragments on a configured URL are
removed. URL credentials are rejected in every environment; localhost names,
loopback IPs and unspecified addresses are rejected in production. This is an
SEO configuration guard, not a DNS-based SSRF firewall.

If an override is needed, copy `.env.example` to `.env.local` and edit the value.
For local development without production canonicals, omit that override or set
`NEXT_PUBLIC_SITE_URL=http://localhost:3000` explicitly. Set production origins
**before building**: public Next.js values and prerendered metadata may be embedded
in the artifact; changing a container runtime variable is not a reliable substitute
for rebuilding.

`.env*` files are excluded from Git and Docker context; the root `.env.example`
public template is retained. Never put secrets in `NEXT_PUBLIC_*` variables,
Docker build arguments, committed templates or build logs. Ignore rules do not
remove already tracked files or erase Git history.

## Quality checks

```bash
npm run validate:content
npm run typecheck
npm run lint
npm run format:check
npm test
npm audit --omit=dev --audit-level=moderate
```

`npm test` validates content and runs the existing Node content/SEO regression
tests. `npm run test:seo` runs those tests without the preceding content validation.
`npm run lint:fix` and `npm run format` modify files; inspect their scope first.

The runtime verifier requires an already running application:

```bash
# Existing development server, with its default local metadata origin:
SEO_BASE_URL=http://127.0.0.1:3000 SEO_SITE_URL=http://localhost:3000 \
  node scripts/verify-runtime-seo.mjs

# Existing production server, using the default production origin:
SEO_BASE_URL=http://127.0.0.1:3000 \
  node scripts/verify-runtime-seo.mjs
```

If development uses `.env.local` with the public template origin, set
`SEO_SITE_URL=https://dapu.my.id` instead. `SEO_BASE_URL` is the server to request;
`SEO_SITE_URL` is the expected metadata origin, not permission to accept arbitrary
canonicals. These checks cover representative routes, metadata, redirects,
RSS/sitemap and retired Notes URLs; they are not an accessibility, motion or
full browser test suite. Manually review keyboard navigation, short-landscape
mobile menus, anchor visibility, clipboard failures, reduced-motion changes,
no-JavaScript content and narrow-screen overflow.

Per `AGENTS.md`, task-added testing harnesses/packages must be removed after
verification, and agents must not run production builds as task completion.
Existing tests remain part of the project.

## Content and design

- Projects: `src/content/work/*.mdx`, registered in
  `src/lib/content/registries/work.ts`.
- Articles: `src/content/writing/*.mdx`, registered in
  `src/lib/content/registries/writing.ts`.
- Profile and experience: `src/content/about.ts` and `src/content/experience.ts`.
- Content types, validation and loaders: `src/lib/content/`.
- Shared design tokens: `src/styles/tokens.css`; visual direction and scoped
  motion contracts: `DESIGN.md`; copy and factual integrity: `WRITING_STYLE.md`.
  `AGENTS.md` contains development rules.

To add a project or article, copy a neighboring MDX entry, update its exported
`metadata` object (not YAML frontmatter), register its source path and dynamic
import under the matching slug, and add referenced assets beneath `public/`.
Follow the existing schema for publication/verification flags, calendar dates,
related slugs, image dimensions and alt text. Run content validation and tests;
preview both listing and detail routes before publishing. Keep MDX local and
trusted: it compiles to executable application code, not sanitized user input.
Do not fabricate employers, outcomes, testimonials or metrics.

Routes include `/`, `/work`, `/work/[slug]`, `/writing`, `/writing/[slug]`, `/about`,
`/index`, `/resume`, `/rss.xml`, `/sitemap.xml` and `/robots.txt`. `/archive` permanently
redirects to `/index`; `/prototype` is retired and returns 404. Notes has been
removed: `/notes` and former detail URLs return 404. Do not add new Notes entries.

## Production build and standalone verification (manual)

The user/operator runs production builds manually; CI also builds in its isolated
runner. Nothing below implies the current working tree has been built or deployed.

```bash
NEXT_PUBLIC_SITE_URL=https://dapu.my.id npm run build
npm start -- --hostname 127.0.0.1
```

`npm run build` validates content before building. The configuration emits
`.next/standalone`. For a manual standalone smoke test after a successful build:

```bash
cp -a public .next/standalone/public
mkdir -p .next/standalone/.next
cp -a .next/static .next/standalone/.next/static
(cd .next/standalone && HOSTNAME=127.0.0.1 PORT=3100 node server.js)
# In another terminal, once HTTP is ready:
SEO_BASE_URL=http://127.0.0.1:3100 node scripts/verify-runtime-seo.mjs
```

Stop that server when done. Start from a fresh build layout when copying assets.
Run the standalone server **from its artifact directory**: the metadata and TOC
loaders read raw MDX using `process.cwd()`. Explicit tracing includes the Work and
Writing sources so they can accompany the compiled routes. The artifact, static
assets and public files must all come from the same build.

### Docker (manual)

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://dapu.my.id \
  -t personal-website .
docker run --rm -p 127.0.0.1:3000:3000 personal-website
```

The builder declares this public argument with a safe `https://dapu.my.id` default,
so excluding environment files does not accidentally lose intentional SEO build
configuration. The final image runs standalone Next.js as a non-root user on port 3000. Build arguments are public configuration, not a secret transport. Arrange
TLS, a reverse proxy, monitoring, resource limits and backups separately.

## CI and deployment limits

`.github/workflows/deploy.yml` runs installation, a production dependency audit
(blocking moderate and higher advisories), formatting, lint, typecheck, tests,
build, then starts the actual standalone server on loopback port 3100. A bounded
HTTP readiness check precedes the existing runtime SEO verifier; shell traps stop
and reap the process on success, failure or interruption. Production checks expect
`https://dapu.my.id`; keep any `PRODUCTION_ENV_FILE` origin aligned with that target.
Dependency updates must resolve advisories rather than bypassing the audit gate;
registry outages can also fail the gate. The production-only gate excludes development
tooling: review `npm audit` separately, track advisories without compatible patched
releases, and do not use `npm audit fix --force` to force an incompatible downgrade.
The two GitHub actions are pinned to
commit SHAs verified against their upstream `v6` tags; review and update pins
intentionally during action maintenance.

An optional GitHub secret `PRODUCTION_ENV_FILE` is written only on the CI runner
for its production build. It is not automatically sent to Docker or the VPS.
Deploy runs only after CI passes, for non-PR events on the default branch. It uses
`VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_SSH_KEY` and `VPS_KNOWN_HOSTS` secrets,
strict SSH host verification, and invokes the external
`/srv/apps/personal-website/deploy.sh` with `DEPLOY_BRANCH`. Populate known hosts
from an independently verified server host key; do not blindly trust a network
scan. CI does not publish or transfer its tested artifact: the remote script owns
the actual checkout/build/restart/rollback process and must reproduce the intended
Node version and public origin. That script and reverse-proxy configuration are
outside this repository's verified scope.

The post-deploy check confirms only that the public homepage is reachable. It
does not establish artifact identity, container correctness, every route's health,
security or rollback readiness. Remaining operator work includes a real fresh
Node 24 production/standalone or container smoke test, deployment-script review,
cross-browser/accessibility review and production performance measurement.
