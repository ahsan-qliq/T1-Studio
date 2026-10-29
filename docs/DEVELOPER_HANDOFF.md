# T1 Studio Developer Handoff

Updated 29 October 2026 · Application package `t1` version `0.1.0`

This guide helps a developer set up, maintain, and extend the T1 Studio website. Start with local setup, then follow the content flow before changing a page. Pay particular attention to the separate server and browser CMS URLs and the open items before releasing changes.

## Project overview

T1 Studio is an English and Arabic marketing website for an interior design studio. It presents spaces, projects, inspiration, blog articles, company information, trade partnerships, downloadable resources, and enquiry forms. Campaign landing pages use a separate layout.

The repository contains the Next.js frontend and a cache revalidation endpoint. CMS content and submission storage are handled by an external service. Backend administration, database migrations, and CMS deployment are outside this repository.

## Technology stack

| Area | Implementation |
| --- | --- |
| Framework | Next.js `16.3.2`, App Router |
| UI | React and React DOM `19.2.8` |
| Language | TypeScript 5 with strict checking |
| Styling | Tailwind CSS 4, global CSS, shadcn configuration, Base UI |
| Localization | next-intl 4, English and Arabic |
| Interaction | Framer Motion, Embla Carousel, Lucide icons |
| Form validation | Zod 4 and component-specific checks |
| Package manager | pnpm `11.20.0`, declared in `package.json` |
| Code quality | ESLint 9 and eslint-config-next |

Version ranges in `package.json` describe dependency requirements; use `pnpm-lock.yaml` for reproducible dependency resolution.

## Local setup

1. Obtain repository access and the approved development CMS configuration from the project owner.
2. Install a Node.js version compatible with both the pinned pnpm version and Next.js. The installed Next.js package declares Node.js `>=20.9.0`; this is not a guarantee that every such version supports pnpm 11. Use the team's agreed runtime.
3. Use pnpm `11.20.0` and install dependencies:

   ```bash
   pnpm install --frozen-lockfile
   ```

4. Create `.env.local` at the repository root using the configuration below. Obtain secret values through the team's secure channel.
5. Start the site:

   ```bash
   pnpm dev
   ```

6. Open `http://localhost:3000` for English and `http://localhost:3000/ar` for Arabic.

### Environment configuration

The values below are placeholders, not working service credentials.

```dotenv
CMS_API_BASE_URL=https://cms.example.com/api
NEXT_PUBLIC_CMS_API_BASE_URL=https://cms.example.com
REVALIDATE_SECRET=replace-with-a-strong-shared-secret
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

| Variable | Used by | Required configuration |
| --- | --- | --- |
| `CMS_API_BASE_URL` | `lib/cms/client.ts` | Server CMS base including `/api`. Requests append paths such as `/home-page`. Omit the trailing slash. If unset, code uses a hardcoded AWS API Gateway URL. |
| `NEXT_PUBLIC_CMS_API_BASE_URL` | Browser enquiry and resource forms | Backend origin without the final `/api`; forms append `/api/contact-submissions` or `/api/trade-submissions`. If unset, requests target the current site origin. |
| `REVALIDATE_SECRET` | `app/api/revalidate/route.ts` | Private shared secret for CMS cache invalidation. Configure it before exposing this endpoint. |
| `NEXT_PUBLIC_SITE_URL` | `app/robots.ts` | Site origin for the sitemap reference in robots.txt. It does not override all canonical and sitemap URLs. |

Variables beginning with `NEXT_PUBLIC_` are browser-visible configuration. Never put secrets in them. Rebuild after changing public environment configuration in a deployed environment. The browser backend must allow requests from the frontend origin through its CORS configuration.

### Development commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run the development server |
| `pnpm lint` | Run ESLint |
| `pnpm exec tsc --noEmit` | Check TypeScript without emitting JavaScript |
| `pnpm build` | Produce the production build |
| `pnpm start` | Serve an existing production build |

`package.json` does not define an automated test script. Lint, type checking, production builds, and manual verification cover different concerns; none alone establishes that external integrations work.

## Repository structure

```text
app/
  [locale]/
    layout.tsx           Root HTML, locale provider, metadata and GTM
    (website)/           Main site routes with shared navigation and footer
    lp/                  Campaign layout and slug-based landing pages
  api/revalidate/        CMS cache invalidation endpoint
  config/                Content adapters and fallback configuration
  i18n/                  Locale routing, request configuration and navigation
  messages/              en.json and ar.json translation dictionaries
  globals.css            Global styling and theme definitions
  *-sitemap.xml/         English XML sitemap handlers
  ar/                    Arabic XML sitemap handlers
components/
  layout/                Navigation, footer and locale switcher
  sections/              Reusable page sections and forms
  ui/                    UI primitives and animation helpers
lib/
  cms/                   Typed CMS fetchers and response interfaces
  sitemap.ts             XML sitemap helpers and site base URL
  utils.ts               Shared utilities
public/assets/           Images, video and downloadable PDFs
middleware.ts            next-intl locale routing middleware
next.config.ts           Redirects, cache headers and allowed image hosts
```

The `@/` import alias points to the repository root. The `(website)` route group organizes layouts without appearing in public URLs.

## Routes and localization

English is the default locale and normally has no URL prefix. Arabic uses `/ar`. `app/i18n/routing.ts` configures `localePrefix: 'as-needed'`. The locale layout sets the HTML language and switches Arabic to `dir="rtl"`.

| Route without locale prefix | Purpose |
| --- | --- |
| `/` | Homepage |
| `/about`, `/why-t1` | Company information and positioning |
| `/spaces`, `/spaces/[slug]` | Space listing and detail pages |
| `/projects`, `/projects/[slug]` | Project listing and detail pages |
| `/inspiration` | Inspiration galleries and collections |
| `/blogs`, `/blogs/[slug]` | Blog listing and article pages |
| `/trade`, `/contact` | Partnership and customer enquiries |
| `/search` | Search input and suggestions |
| `/privacy-policy`, `/cookie-policy`, `/terms-and-conditions`, `/accessibility` | Policy and accessibility pages |
| `/sitemap` | Human-readable sitemap |
| `/lp/[slug]` | Campaign landing pages |

Valid landing slugs are `kitchen`, `wardrobe`, `fit-out`, and `landing`. Their metadata requests `noindex` and `nofollow`; unsupported slugs return not found.

For locale-aware links and navigation, use the exports in `app/i18n/navigation.ts`. Keep corresponding message keys in both translation files. CMS text may also be bilingual; follow the existing configuration helpers when choosing the locale. Verify Arabic layout, navigation, forms, and dynamic pages independently of English.

`middleware.ts` excludes API routes, Next.js internals, and paths containing a dot from locale handling. XML sitemap handlers therefore have explicit Arabic routes.

## Content architecture

The typical page flow is:

```text
Localized page
  -> lib/cms page fetcher
  -> cmsGet and external CMS
  -> app/config content resolver plus translation fallback
  -> reusable section components
```

The homepage is a useful reference: `app/[locale]/(website)/page.tsx` loads CMS data and translation namespaces, maps them through `app/config/home.config.ts`, and passes props to section components. CMS interfaces live in `lib/cms/types.ts`.

`cmsGet` expects a JSON envelope containing `success`, optional `message`, and `data`. It returns `null` for unsupported languages, unsuccessful responses, missing data, or fetch failures and logs request failures on the server. It does not add authentication headers or validate the full response shape at runtime.

Fallback behavior is page-specific. The homepage has translation/configuration fallbacks; missing CMS content on space, project, and blog detail routes can result in a not-found page. A rendered page is therefore not sufficient proof that CMS fetching is healthy.

### Representative CMS reads

Paths below are appended to `CMS_API_BASE_URL`. The authoritative frontend request definitions are the files in `lib/cms/`.

| Content | GET path | Query parameters |
| --- | --- | --- |
| Homepage | `/home-page` | `slug=home`, `lang=en` or `ar` |
| Spaces listing | `/spaces-page` | `slug=spaces`, `lang` |
| Space detail | `/space-detail-page` | `slug`, `lang` |
| Blogs listing | `/blog-page` | `slug=blog`, `lang` |
| Blog detail | `/blog-detail-page` | `slug`, `lang` |
| Project detail | `/project-detail-page` | `slug`, `lang` |

Additional fetchers cover company pages, projects, inspiration, trade, contact, and policies. The blog detail fetcher accepts either one object or an array and selects the first array item.

## Cache refresh and the revalidation endpoint

`cmsGet` uses a default 3,600-second revalidation interval. Every request receives the global `cms` cache tag plus more specific tags supplied by its fetcher. React `cache()` also wraps page fetchers for reuse during rendering.

The CMS can request immediate tag expiration through `POST /api/revalidate`, using `Content-Type: application/json` and a JSON body:

```json
{
  "secret": "<REVALIDATE_SECRET>",
  "tags": ["home-page-en", "home-page-ar"]
}
```

To expire all CMS-tagged data, send `{"secret":"<REVALIDATE_SECRET>","all":true}`. A successful targeted response is `{"success":true,"revalidated":["home-page-en","home-page-ar"]}`. Expiration causes content to be fetched again when needed; the handler does not pre-render every page.

| Condition | Status and behavior |
| --- | --- |
| Valid secret with `all: true` | 200; expires `cms`, taking precedence over `tags` |
| Valid secret and nonempty tags array | 200; expires the supplied tags |
| Secret mismatch | 401; `Unauthorized` |
| Missing or empty tags without `all: true` | 400; `Provide tags array or all: true` |
| JSON parsing or other caught failure | 500; `Revalidation failed` |

Detail tags follow patterns such as `space-detail-<slug>-<locale>` and `space-detail-<slug>`. Use exact tags from the relevant fetcher, especially where a public route name differs from the CMS tag name.

**Configuration issue to address:** if `REVALIDATE_SECRET` is unset and the request omits `secret`, the current equality check compares two undefined values and does not reject the request. Configure the secret and harden the handler to reject missing server configuration. The handler also does not explicitly validate each tag's type.

## Forms and resource downloads

These integrations are browser-to-backend requests. The frontend repository describes what is sent, but backend storage, delivery notifications, and server-side validation remain the responsibility of the CMS service.

| Component | Destination | Behavior |
| --- | --- | --- |
| `DreamSpaceSection.tsx` | `/api/contact-submissions` | Sends enquiry details selected for the active audience |
| `PartnerLeadSection.tsx` | `/api/trade-submissions` | Sends validated fields with category `trade` or `referral` |
| `ResourceCenterSection.tsx` | `/api/contact-submissions` | Sends `submissionType: resourceDownload`, then triggers the resource download |
| `FooterNewsletterForm.tsx` | None | Clears the email field; no subscription request |
| `LpHeroBanner.tsx` | None | Prevents native submission; no lead submission request |

The main enquiry payload includes `submissionType`, first and last names, email, phone, property type, required space, service type, timeline, company name, and message. The component applies Zod validation, a developer company-name requirement, consent validation, and a honeypot check. Consent is checked in the UI but is not included in this request payload.

Resource download submissions include contact details, company name, project name, and resource title. Confirm the receiving backend's contract before changing fields or assuming persistence.

The main enquiry and resource download handlers treat HTTP 429 as a success path. Review this behavior with the backend owner before relying on the confirmation screen or download as proof of a stored submission.

## Styling and assets

Use `app/globals.css` for shared theme and global rules, section components for page presentation, and `components/ui` for reusable primitives. Keep content mapping in `app/config` rather than duplicating CMS field selection across presentation components.

Static files live under `public/assets` and are addressed from `/assets/...`. Resources include company, prequalification, certificate, and brochure PDFs. Preserve public paths when replacing downloadable files or update every referring configuration value.

`next.config.ts` allows optimized remote images from `d2ilpsdg8tcj25.cloudfront.net` and `images.unsplash.com`. Add any approved new image host to `remotePatterns`. Public asset responses have a 30-day cache policy with background revalidation; optimized images also have a 30-day minimum cache TTL. Consider a new filename when replacing an asset that must update immediately.

## SEO and analytics

Pages commonly build metadata from CMS SEO fields, including title, description, canonical URL, social image, and robots directives. `components/JsonLdSchema.tsx` handles structured data supplied to it. Legacy permanent redirects are maintained in `next.config.ts`.

XML sitemap routes include a sitemap index and pages, spaces, projects, inspiration, and blog sitemaps, with English and Arabic variants. Shared helpers emit language alternate links. `lib/sitemap.ts` contains the site base and a static last-modified date; update these deliberately when the site's canonical domain or content strategy changes.

**Domain alignment is required:** the locale layout and sitemap helper use `https://t1-studio.com`, while robots.txt defaults to `https://www.t1studio.ae`. Setting `NEXT_PUBLIC_SITE_URL` only changes the robots sitemap reference. Confirm the canonical production domain and align all these locations, along with CMS canonical fields.

Google Tag Manager is loaded by `app/[locale]/layout.tsx` using a hardcoded container ID. Confirm the intended container and staging tracking policy with the owner before deploying another environment.

## Common development tasks

### Change content on an existing page

1. Identify the page under `app/[locale]/(website)` and its CMS fetcher.
2. Determine whether the text comes from CMS fields, configuration, or a translation dictionary.
3. Update CMS types and configuration adapters if the data shape changes.
4. Keep English and Arabic messages consistent and preserve the page's intended fallback behavior.
5. Check the page in both locales and expire the appropriate CMS tag when publishing content.

### Add a page or reusable section

1. Read `AGENTS.md` and the relevant installed Next.js guide under `node_modules/next/dist/docs/` before writing code. This repository explicitly requires version-specific guidance.
2. Follow the existing route and layout organization. Route parameters are handled asynchronously in existing pages.
3. Add a typed CMS fetcher if the page requires CMS data, with a deliberate cache tag.
4. Add content mapping, translations, and reusable section components as appropriate.
5. Add metadata and update navigation and sitemap coverage when the page should be discoverable.
6. Verify responsive layouts, Arabic direction, missing content, and invalid slugs.

### Change a form

Coordinate the request contract with the backend owner. Update validation, submitted fields, loading and error states, and both locale labels together. Verify the full result in an approved test environment, including backend receipt; a frontend success message alone does not establish delivery.

## Verification and deployment handover

Before releasing code, run lint, TypeScript checking, and a production build. Investigate failures rather than assuming they are caused by your change. Build-time rendering may depend on CMS availability.

Perform these checks against the agreed test environment:

- Open the homepage, listing pages, and representative CMS detail pages in English and Arabic.
- Check mobile navigation, locale switching, right-to-left layout, carousel controls, and links.
- Check unsupported detail slugs and campaign slugs.
- Verify enquiry, trade, referral, and resource forms, including validation and backend receipt.
- Confirm resource PDFs and video/image assets load correctly.
- Review page metadata, canonical links, robots.txt, sitemap URLs, and legacy redirects.
- Verify cache refresh after a controlled CMS change using the configured revalidation secret.
- Check that errors and fallback content are understandable when CMS data is unavailable.

Use a deployment target that supports Next.js server rendering and route handlers. A purely static file host does not implement the revalidation endpoint. The repository's README is the starter guide and does not establish the actual hosting provider or release process.

The project owner should provide the deployment project, staging URL, canonical production domain, environment configuration, CMS access, webhook configuration, analytics ownership, and rollback procedure. Keep secret values outside this document and source control.

## Open items for the receiving developer

| Priority | Item | Source or next action |
| --- | --- | --- |
| Before release | Reject absent revalidation server secret | `app/api/revalidate/route.ts`; configure and harden authentication |
| Before release | Align production domain settings | Locale layout, `lib/sitemap.ts`, `app/robots.ts`, and CMS SEO |
| Before lead campaigns | Connect landing-page hero form | `components/sections/LpHeroBanner.tsx` currently has no submission integration |
| Before promising subscriptions | Connect newsletter form | `components/layout/FooterNewsletterForm.tsx` currently only clears input |
| Integration review | Confirm handling of rate-limited submissions | HTTP 429 currently follows success paths in main enquiry and resource forms |
| Feature completion | Implement search results if required | Search shell updates `?q=` and recent searches, but does not render retrieved results |
| Localization review | Translate campaign form copy | Landing route includes hardcoded English form labels and options |
| Maintenance | Review duplicate inspiration configuration names | Both `inspiration.config.ts` and `inspiration.config..ts` exist; check imports before consolidating |
| Delivery process | Establish automated regression coverage | No test script is defined in `package.json` |

## Source reference

Use `package.json` and the lockfile for dependencies; `middleware.ts` and `app/i18n` for routing; localized pages for composition; `lib/cms` for fetches and types; `app/config` for mapping; form components for submitted payloads; and `next.config.ts`, `lib/sitemap.ts`, and `app/robots.ts` for delivery and SEO settings.

This handoff records source-level behavior. Live CMS access, form delivery, deployment configuration, build, lint, and type-check results must be verified in the receiving environment; this documentation task did not execute those checks.
