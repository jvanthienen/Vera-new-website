# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm format` - Format code with Prettier

## Project Architecture

This is a Next.js 15 application for the Vera Human Design platform, built on top of the Paddle mobile web payments starter. The app serves as both a marketing site and checkout flow for a Human Design iOS app.

### Key Architecture Components

**Frontend Framework:**
- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS v4 with custom Vera design system

**Core Features:**
- Paddle Billing integration for payments and subscriptions
- Notion-based blog system using flexible API
- Human Design chart generation and display
- Location autocomplete for birth data
- iOS app integration with Universal Links

**Project Structure:**
- `/src/app/` - App Router pages and layouts
- `/src/components/` - Reusable React components organized by feature
- `/src/hooks/` - Custom React hooks (Paddle integration, location autocomplete)
- `/src/lib/` - Utility functions, types, and API integrations
- `/public/` - Static assets including custom Vera fonts

### Design System

**Vera Brand Colors** (defined in `VERA_STYLING_GUIDE.md`):
- Primary: `#FFD600` (vera-primary)
- Background: `#344033` (vera-background) 
- Secondary Background: `#1B251D` (vera-background-secondary)
- Text: `#FFFFDF` (vera-text)
- Success/Border: `#717B68` (vera-success/vera-border)
- Accent: `#B1B59D` (vera-accent)

**Typography:**
- GeneralSans (sans-serif) - UI elements, body text
- Sentient (serif) - headings, titles
- Custom utility classes: `.font-large-title`, `.font-title1-3`, `.font-body`, etc.

### Key Integrations

**Paddle Billing:**
- Environment variables: `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, `NEXT_PUBLIC_PADDLE_ENV`
- Hooks: `use-paddle.tsx`, `use-paddle-prices.tsx`
- Components: `/src/components/checkout/` and `/src/components/pricing/`

**Notion Blog API:**
- Flexible blog system in `/src/lib/notion-blog-api-flexible.ts`
- Custom markdown processing with remark plugins
- Dynamic blog pages at `/blog/[slug]`

**iOS App Integration:**
- Universal Links configuration via `APPLE_TEAM_ID` and `NEXT_PUBLIC_BUNDLE_IDENTIFIER`
- App redirect handling in checkout flow

### Component Organization

Components are organized by feature domain:
- `blog/` - Blog-related components
- `checkout/` - Paddle checkout flow
- `features/` - Marketing feature displays
- `hero/` - Landing page and navigation
- `human-design-form/` - Chart generation form
- `pricing/` - Pricing plans and selection
- `ui/` - Reusable UI primitives (shadcn/ui based)

### Environment Variables Required

```
# Apple App Integration
APPLE_TEAM_ID=
NEXT_PUBLIC_BUNDLE_IDENTIFIER=
NEXT_PUBLIC_APP_REDIRECT_URL=

# Paddle Payment Integration
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_ENV=sandbox|production

# Blog System (Optional - for Notion integration)
NOTION_API_KEY=
NOTION_BLOG_DATABASE_ID=

# Cache Management
REVALIDATION_SECRET=your-secret-key-here
```

## Blog System Features

The blog system includes advanced features from the example project:

**Core Features:**
- Infinite caching with manual revalidation via API
- Client-side tag filtering with real-time search
- Enhanced SEO metadata with OpenGraph and Twitter Cards
- CTA button support in markdown content
- Loading states with skeleton components
- Image proxy for reliable asset loading

**CTA Syntax in Notion/Markdown:**
```markdown
[CTA-BUTTON](https://example.com "Button Text")
[CTA-BANNER]Your banner content here[/CTA-BANNER]
[CTA-CARD title="Title" url="url" button="Text"]Content[/CTA-CARD]
[CTA-NEWSLETTER title="Title" description="Description"]
```

**Manual Cache Refresh:**
```bash
# Using curl with header auth
curl -X POST https://your-domain.com/api/revalidate \
  -H "x-revalidation-secret: your-secret" 

# Or with body auth
curl -X POST https://your-domain.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-secret"}'
```

**API Routes:**
- `/api/revalidate` - Manual cache refresh
- `/api/blog/posts` - Paginated blog posts with filtering
- `/api/image-proxy` - Secure image proxy with caching

## Development Notes

- Use `pnpm` as the package manager
- Backend and frontend have watchfiles, so no restart needed during development
- The app is configured for Vercel deployment
- All Vera brand assets are in `/public/fonts/` and properly configured
- Follow the established component patterns and use the Vera design system classes
- Blog content cached infinitely - use revalidation API to refresh after Notion updates