# feat: Frontend Design Improvements

## Enhancement Summary

**Deepened on:** 2026-01-19
**Research agents used:** 12 (image optimization, accessibility, fonts, mobile UX, view transitions, expandable patterns, frontend design, architecture, simplicity, performance, race conditions, security)

### Key Improvements from Research
1. **Simplified View Transitions** - Use native meta tag instead of ClientRouter (YAGNI for single-page)
2. **Performance-focused fonts** - Subset to <200KB, add metric-adjusted fallbacks
3. **Robust expandables** - Use `<details>/<summary>` baseline with CSS Grid animation
4. **State machine patterns** - Prevent race conditions in toggles and animations

### Critical Changes from Reviews
- **Architecture**: Remove ClientRouter, use native View Transitions API
- **Simplicity**: Consider system fonts as zero-overhead alternative
- **Performance**: Add `fetchpriority="high"` to hero, inline critical CSS
- **Security**: Add CSP and security headers to vercel.json

---

## Overview

Comprehensive frontend design improvements to the personal portfolio website, focusing on performance optimization, accessibility compliance, visual polish, mobile experience, and enhanced content presentation through expandable case studies.

## Problem Statement / Motivation

The current site has a strong design foundation with a distinctive hand-drawn aesthetic, but opportunities exist to:

1. **Performance**: Hero image uses unoptimized PNG; fonts loaded from Google CDN add latency
2. **Accessibility**: Missing skip link, unverified color contrast, incomplete ARIA labels
3. **Mobile UX**: Uses `vh` units which cause viewport issues on mobile Safari
4. **Content Depth**: Timeline shows highlights but lacks detailed case studies for portfolio review
5. **Visual Polish**: Navigation could benefit from smoother transitions

## Proposed Solution

A phased approach addressing four key areas (reordered per architecture review):

### Phase 1: Foundation (Performance, Accessibility, Quick Wins)
- Image optimization with Astro's Picture component (WebP/AVIF)
- Self-hosted fonts with optimized loading strategy (or system fonts)
- WCAG 2.1 AA compliance (skip link, contrast, ARIA)
- Touch target improvements (44x44px minimum)
- Hero CTA refinement (moved from Phase 3)

### Phase 2: Mobile Experience
- Dynamic viewport units (dvh) with fallbacks
- Safe area insets for notched devices
- Responsive refinements

### Phase 3: Visual Polish (Simplified)
- Native View Transitions via meta tag (NOT ClientRouter)
- Enhanced scroll animations with proper cleanup

### Phase 4: Content Enhancement
- Expandable case studies using `<details>/<summary>` baseline
- CSS Grid animation for smooth expand/collapse
- Visual metrics integration

## Technical Considerations

### Architecture Impacts

**File Changes Required:**
- `src/layouts/Layout.astro` - View Transitions meta tag, skip link, font loading
- `src/styles/global.css` - Skip link styles, dvh fallbacks, contrast fixes, font-face rules
- `src/components/Hero.astro` - Picture component, CTA refinement, fetchpriority
- `src/components/WorkHistory.astro` - Expandable case study sections with `<details>`
- `src/components/Nav.astro` - Touch targets, state machine for toggle
- `src/components/Footer.astro` - ARIA improvements, external link security
- `vercel.json` - Security headers, font cache headers

**New Files:**
- `src/assets/chris.png` - Moved from public folder for Astro optimization
- `public/fonts/` - Self-hosted font files (Inter, Fraunces) - Latin subsets only

### Research Insight: Architecture Review

> **ClientRouter is architectural overkill for single-page sites.** The site uses hash-based anchor links with CSS `scroll-behavior: smooth`. ClientRouter is designed for SPA-style navigation between multiple pages. Use native View Transitions API instead.

**Recommended approach:**
```html
<!-- In Layout.astro head - enables View Transitions without routing -->
<meta name="view-transition" content="same-origin" />
```

### Performance Implications

**Research-Informed Targets:**

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| LCP | < 2.0s | < 2.5s |
| CLS | < 0.05 | < 0.1 |
| Total JS | < 50KB | < 100KB |
| Total Fonts | < 150KB | < 200KB |
| Hero Image | < 50KB mobile | < 100KB desktop |
| Lighthouse Performance | >= 95 | >= 90 |

**Expected Improvements:**
- Hero image: 50-80% smaller with WebP/AVIF vs PNG
- Fonts: Eliminate render-blocking Google Fonts request
- LCP: Target under 2.0s (from ~2.5-3.0s currently untested)

**Research Insight: Font Budget**

> Variable fonts can be bloated. **Target < 200KB total** for both fonts combined. Use font subsetting tools (glyphhanger or fonttools) to extract only Latin characters.

### Accessibility Considerations

**WCAG 2.1 AA Requirements:**
- 4.5:1 contrast ratio for normal text
- 3:1 for large text and UI components
- Focus visible on all interactive elements
- Skip navigation link
- ARIA labels for icon-only buttons

**Current Issues to Address (from research):**
- `--color-text-light` (#a0aec0) may fail contrast on dark footer
- Scroll indicator SVG needs accessible name
- Social link icons need descriptive ARIA labels
- Missing skip link

### Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- View Transitions: Chrome 111+, Safari 18+, Firefox 144+
- dvh units: Chrome 108+, Safari 15.4+, Firefox 101+
- Fallbacks required for older browsers

## Acceptance Criteria

### Performance
- [x] Hero image uses `<Picture>` component with avif/webp formats
- [x] Hero image has `loading="eager"` and `fetchpriority="high"`
- [ ] Hero image preloaded in `<head>`
- [ ] Fonts self-hosted with `font-display: swap` and < 200KB total
- [ ] Metric-adjusted font fallbacks to prevent CLS
- [ ] Lighthouse Performance score >= 90
- [ ] LCP under 2.5 seconds on 4G connection

### Accessibility
- [x] Skip link present, visible on focus, targets `#main-content`
- [ ] All color combinations meet WCAG 2.1 AA contrast (4.5:1)
- [x] All interactive elements have visible `:focus-visible` indicators
- [x] Decorative SVGs have `aria-hidden="true"`
- [x] Icon-only links have descriptive `aria-label`
- [ ] Lighthouse Accessibility score >= 95

### Mobile Experience
- [x] Hero uses `min-height: 100dvh` with vh fallback
- [x] All touch targets minimum 44x44px
- [x] Navigation works correctly on iOS Safari
- [x] Safe area insets applied for notched devices
- [ ] No horizontal overflow on any viewport width

### Visual Polish
- [x] Native View Transitions enabled via meta tag
- [ ] Hero section has refined CTA hierarchy
- [x] View transitions respect `prefers-reduced-motion`
- [x] Scroll animations work consistently with proper cleanup

### Content Enhancement
- [x] Timeline items have expandable case study sections using `<details>`
- [x] Expanded content includes: problem, approach, impact, learnings
- [x] Expand/collapse is keyboard accessible (Enter/Space)
- [x] CSS Grid animation for smooth height transitions
- [x] Case studies work on mobile (full-width collapse)

### Security
- [x] All external links have `rel="noopener noreferrer"`
- [x] Security headers configured in vercel.json
- [x] CSP header configured for script/style sources

## Success Metrics

- **Performance**: Lighthouse Performance >= 90
- **Accessibility**: Lighthouse Accessibility >= 95
- **Mobile**: No usability issues on iOS Safari viewport
- **Engagement**: Case study expandable sections receive clicks (track via analytics)

## Dependencies & Risks

### Dependencies
- Hero image source file at sufficient resolution for optimization
- Case study content creation (problem/approach/impact for each role)
- Font files for Inter and Fraunces (download and subset from Google Fonts)

### Risks (Updated from Reviews)

| Risk | Severity | Mitigation |
|------|----------|------------|
| Font file size exceeds budget | Medium | Subset to Latin only, consider system fonts |
| CLS from font loading | Medium | Use metric-adjusted fallbacks |
| Race conditions in toggles | Medium | Implement state machines per review |
| dvh unsupported in older browsers | Low | Progressive enhancement with vh fallback |

## Implementation Details

### Phase 1: Foundation (Do First)

#### 1.1 Image Optimization

**Research Insight: Hero Image Priority**

> Hero image is the LCP candidate. Use `fetchpriority="high"` and preload in head. Do NOT lazy load it.

```astro
---
// src/components/Hero.astro
import { Picture } from 'astro:assets';
import heroPhoto from '../assets/chris.png';
---

<Picture
  src={heroPhoto}
  formats={['avif', 'webp']}
  widths={[200, 280, 380, 560, 760]}
  sizes="(max-width: 480px) 200px, (max-width: 768px) 280px, 380px"
  alt="Chris Bennett, Senior Product Manager"
  class="hero-photo sketchy-border"
  loading="eager"
  fetchpriority="high"
/>
```

**In Layout.astro head:**
```html
<!-- Preload hero image -->
<link
  rel="preload"
  as="image"
  href="/_astro/chris.[hash].avif"
  type="image/avif"
>
```

#### 1.2 Skip Link

**Research Insight: Focus Management**

> Keep focus on the skip link target after activation. Use `tabindex="-1"` on the target to make it focusable.

```astro
<!-- src/layouts/Layout.astro (after <body>) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Target element -->
<main id="main-content" tabindex="-1">
```

```css
/* src/styles/global.css */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-bg);
  padding: var(--space-sm) var(--space-md);
  z-index: 10000;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  transition: top 0.2s ease-in-out;
}

.skip-link:focus {
  top: var(--space-sm);
  outline: 2px solid var(--color-bg);
  outline-offset: 2px;
}
```

#### 1.3 Font Self-Hosting

**Research Insight: Subsetting and Fallbacks**

> Subset fonts to Latin only. Use metric-adjusted fallbacks to prevent CLS. Total budget < 200KB.

```css
/* src/styles/fonts.css */

/* Metric-adjusted fallback to prevent layout shift */
@font-face {
  font-family: 'Inter Fallback';
  src: local('Arial'), local('ArialMT');
  ascent-override: 90.49%;
  descent-override: 22.56%;
  line-gap-override: 0%;
  size-adjust: 107.06%;
}

@font-face {
  font-family: 'Fraunces Fallback';
  src: local('Georgia');
  ascent-override: 92%;
  descent-override: 23%;
  line-gap-override: 0%;
  size-adjust: 105%;
}

/* Inter Variable - Latin subset only */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Inter-Variable-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                 U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F,
                 U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
                 U+FEFF, U+FFFD;
}

/* Fraunces Variable - Latin subset only */
@font-face {
  font-family: 'Fraunces';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Fraunces-Variable-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
                 U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F,
                 U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
                 U+FEFF, U+FFFD;
}
```

```css
/* Usage in global.css */
:root {
  --font-body: 'Inter', 'Inter Fallback', -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, sans-serif;
  --font-heading: 'Fraunces', 'Fraunces Fallback', Georgia, serif;
}
```

**Preload critical fonts in Layout.astro:**
```html
<link rel="preload" href="/fonts/Inter-Variable-latin.woff2"
      as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Fraunces-Variable-latin.woff2"
      as="font" type="font/woff2" crossorigin>
```

**Alternative: System Fonts (Zero Overhead)**

> Per simplicity review, consider system fonts if custom fonts aren't essential:
> ```css
> :root {
>   --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
>   --font-heading: Georgia, 'Times New Roman', serif;
> }
> ```

#### 1.4 Touch Targets

```css
/* src/styles/global.css */
.nav-link,
.btn,
button,
[role="button"] {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Icon buttons need expanded touch area */
.icon-button {
  position: relative;
}

.icon-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
}
```

#### 1.5 Security Headers

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://va.vercel-scripts.com; frame-ancestors 'none'; base-uri 'self'; form-action 'none'" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Phase 2: Mobile Experience

#### 2.1 Dynamic Viewport Units

**Research Insight: iOS Safari**

> `100vh` is calculated based on maximum viewport height (UI hidden). Use `100dvh` which adjusts dynamically as browser UI shows/hides.

```css
/* src/styles/global.css */
.hero {
  min-height: 100vh; /* Fallback */
  min-height: 100dvh;
}

/* Fallback for older browsers */
@supports not (min-height: 100dvh) {
  .hero {
    min-height: -webkit-fill-available;
  }
}
```

#### 2.2 Safe Area Insets

```css
/* For notched devices */
body {
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
}

.nav {
  padding-top: env(safe-area-inset-top, 0);
}

.footer {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
```

### Phase 3: Visual Polish (Simplified)

#### 3.1 Native View Transitions

**Research Insight: No ClientRouter Needed**

> For single-page anchor navigation, use the native View Transitions API via meta tag. ClientRouter adds unnecessary JavaScript for a site with no page-to-page navigation.

```astro
<!-- src/layouts/Layout.astro -->
<head>
  <!-- Native View Transitions without routing overhead -->
  <meta name="view-transition" content="same-origin" />
</head>
```

#### 3.2 Intersection Observer Cleanup

**Research Insight: Race Condition Prevention**

> Pause observation during view transitions. Clean up observers properly.

```javascript
// In Layout.astro
<script>
  let isPaused = false;

  const observer = new IntersectionObserver((entries) => {
    if (isPaused) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeFadeElements() {
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }

  observeFadeElements();

  // Handle view transitions
  document.addEventListener('astro:before-swap', () => { isPaused = true; });
  document.addEventListener('astro:after-swap', () => {
    isPaused = false;
    observeFadeElements();
  });
</script>
```

### Phase 4: Case Studies

#### 4.1 Expandable Timeline with `<details>`

**Research Insight: Progressive Enhancement**

> Use native `<details>/<summary>` for no-JS baseline. Enhance with CSS Grid animation for smooth height transitions. Never use `max-height` hacks.

```astro
<!-- src/components/WorkHistory.astro -->
<div class="timeline-item">
  <div class="timeline-header">
    <h3>{company}</h3>
    <p class="role">{role}</p>
    <p class="period">{period}</p>
    <ul class="highlights">
      {highlights.map(h => <li>{h}</li>)}
    </ul>
  </div>

  <details class="case-study">
    <summary class="case-study__trigger">
      <span>View Case Study</span>
      <svg class="case-study__icon" aria-hidden="true" viewBox="0 0 24 24">
        <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    </summary>

    <div class="case-study__content">
      <section>
        <h4>The Challenge</h4>
        <p>{caseStudy.challenge}</p>
      </section>

      <section>
        <h4>My Approach</h4>
        <p>{caseStudy.approach}</p>
      </section>

      <section>
        <h4>Impact & Results</h4>
        <ul class="impact-metrics">
          {caseStudy.results.map(r => <li><strong>{r.metric}</strong> {r.description}</li>)}
        </ul>
      </section>

      <section>
        <h4>Key Learnings</h4>
        <p>{caseStudy.learnings}</p>
      </section>
    </div>
  </details>
</div>
```

#### 4.2 CSS Grid Animation

**Research Insight: Smooth Height Animation**

> CSS Grid `grid-template-rows: 0fr` to `1fr` enables smooth height animation without JavaScript measurement or `max-height` hacks.

```css
/* Case study expand styles */
.case-study {
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-md);
}

.case-study__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-md) 0;
  cursor: pointer;
  list-style: none;
  min-height: 44px;
  color: var(--color-accent);
  font-weight: 500;
}

.case-study__trigger::-webkit-details-marker {
  display: none;
}

.case-study__trigger:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.case-study__icon {
  width: 24px;
  height: 24px;
  transition: transform var(--transition-fast);
}

.case-study[open] .case-study__icon {
  transform: rotate(180deg);
}

/* CSS Grid animation for smooth expand */
.case-study__content {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows var(--transition-base),
              opacity var(--transition-base);
}

.case-study__content > * {
  overflow: hidden;
}

.case-study[open] .case-study__content {
  grid-template-rows: 1fr;
  opacity: 1;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .case-study__icon,
  .case-study__content {
    transition: none;
  }
}
```

## Content Requirements

### Case Study Template (Per Role)

Each expandable case study needs:

1. **The Challenge** (2-3 sentences)
   - What business problem needed solving?
   - What constraints existed?

2. **My Approach** (3-4 sentences)
   - What strategy did you employ?
   - What was unique about your approach?

3. **Impact & Results** (3-5 bullet points)
   - Quantified outcomes with metrics
   - Business value delivered

4. **Key Learnings** (2-3 sentences)
   - What would you do differently?
   - What principles did you learn?

### Required Case Study Content

- [ ] ScreenCloud - Senior PM, Hardware (current role)
- [ ] ScreenCloud - Senior PM, Signage OS
- [ ] ScreenCloud - Product Manager
- [ ] Paycasso - Product Manager

## Frontend Design Insights

### Research Insight: Making It Memorable

> The hand-drawn/sketchy aesthetic has become common in tech portfolios. Consider bolder alternatives:

**Option 1: "Living Product Spec"**
- Format portfolio like a PRD
- Navigation as "Table of Contents"
- About as "User Persona"
- Work History as "Release Notes" (v5.0 at ScreenCloud...)
- Achievements as "Success Metrics" dashboard
- Contact as "Next Steps"

**Option 2: "Broadcast" Aesthetic**
- Lean into ScreenCloud connection (digital signage)
- TV test patterns, screen glows, CRT scan lines
- Your career is about what appears on screens

**Typography Alternative (if Inter feels generic):**
- Replace Inter with Literata, Newsreader, or Anybody
- Keep Fraunces for headings (distinctive)

## References & Research

### Internal References
- Design tokens: `src/styles/global.css:1-65`
- Current hero: `src/components/Hero.astro`
- Timeline: `src/components/WorkHistory.astro`
- Layout: `src/layouts/Layout.astro`
- Nav: `src/components/Nav.astro`

### External References
- [Astro Image Optimization](https://docs.astro.build/en/guides/images/)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Dynamic Viewport Units](https://web.dev/blog/viewport-units)
- [CSS Grid Height Animation](https://css-tricks.com/css-grid-animation/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Fallback Font Generator](https://screenspan.net/fallback)

### Research Sources
- Astro official documentation via Context7
- W3C WAI-ARIA Authoring Practices Guide
- Chrome Developers - View Transitions API
- MDN Web Docs - details element, focus-visible, dvh units
- web.dev - font best practices, Core Web Vitals
