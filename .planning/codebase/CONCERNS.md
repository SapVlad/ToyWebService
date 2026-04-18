# Codebase Concerns

## Overview

This document outlines technical debt, known issues, security concerns, performance problems, and fragile areas in the hooks-playground codebase. It serves as a reference for prioritizing remediation efforts.

---

## 1. Technical Debt

### 1.1 Hardcoded Data (High Priority)

All product data is hardcoded directly in components with no external data source or state management:

- `FeaturedProducts.tsx`: Product array hardcoded (lines 13-74)
- `GrailOfTheWeek.tsx`: Single product hardcoded (lines 30-40)
- `RecentlySoldTicker.tsx`: Sold items hardcoded (lines 3-44)
- `HeroSection.tsx`: Hero image URL hardcoded (line 24)

**Impact**: Cannot scale, no dynamic content, no CMS integration.

**Recommendation**: Implement a data layer or API service.

### 1.2 Duplicate Code Patterns

The scroll handling pattern is duplicated across multiple components without a shared abstraction:

- `Navbar.tsx`: Direct scroll listener (lines 6-12)
- `HeroSection.tsx`: Direct scroll listener (lines 5-11)
- `useScrollAnimation.tsx`: Intersection Observer custom hook exists but is used inconsistently

**Recommendation**: Consolidate scroll handling into a single reusable hook (e.g., useWindowScroll).

### 1.3 Unused/Dead Code

- `App.css`: Contains styles (lines 1-184) that appear to be from a different project template (Vite starter styles with .counter, .hero, #center, #next-steps, etc.) - not used by the App component

### 1.4 CSS Custom Properties Not Defined

`App.css` references CSS variables that are never defined:
- `--accent`
- `--accent-bg`
- `--accent-border`
- `--border`
- `--text-h`
- `--social-bg`
- `--shadow`

These cause silent failures where styles fallback to defaults.

### 1.5 Missing Responsive Considerations

Several components lack full responsive behavior:
- CategoryNav breaks on smaller screens (just wraps, may need horizontal scroll)
- FeaturedProducts grid works but mobile layout could be improved

---

## 2. Known Bugs

### 2.1 Missing React key Prop Warning Potential

In `FeaturedProducts.tsx` (line 103), using `product.id` as key is correct. However, in `RecentlySoldTicker.tsx` (lines 50-62, 67-79), using indexed keys like `original-index` and `duplicate-index` is fragile if data order changes.

### 2.2 Non-Functional Links

All href attributes are set to "#":

- Navbar nav links (multiple files)
- CategoryNav links (line 22)
- FeaturedProducts "View All Inventory" link
- Footer links (all)
- HeroSection buttons

**Impact**: Dead links produce no action; users cannot navigate.

### 2.3 Non-Functional Interactive Elements

- Search button in Navbar (line 62): No search functionality
- ShoppingBag button (line 65): No cart functionality/window
- Heart icon in FeaturedProducts (line 121): No wishlist functionality
- Newsletter form in Footer (lines 102-113): No form submission handler

### 2.4 Duplicate Import in index.tsx

Line 1 and 2 both import `./index.css`:
```
import './index.css'
import "./index.css";
```

**Impact**: CSS loaded twice, potential duplicate style application.

### 2.5 Unused React Import

All components import React but may not use it directly (React 17+ with new JSX transform):

- `App.tsx`: Line 1 imports React - unused
- All component files: Import React but only use JSX

---

## 3. Security Concerns

### 3.1 External Image URLs (No CSP)

All images load from external domains without Content Security Policy:

- `HeroSection.tsx`: Unsplash images (line 24)
- `GrailOfTheWeek.tsx`: Unsplash image (line 31)
- `FeaturedProducts.tsx`: Multiple Unsplash URLs

**Risk**: No control over third-party image content; potential for malicious image delivery.

**Recommendation**: Implement CSP meta tag or configure Vite to add CSP headers.

### 3.2 No Input Sanitization

Newsletter email input in Footer has no validation:

- Type is "email" but no onChange handler
- No server-side validation possibility (no form submission)
- Could be used for spam/email enumeration

### 3.3 Hardcoded Sensitive-Looking Data

`GrailOfTheWeek.tsx` displays certificate numbers and provenance:

- Certificate: "#0247 Authenticated" (line 77)
- Shows private collection information (line 69)

**Risk**: Appears like displayed real data could be a security/shopping privacy issue.

### 3.4 Missing Error Boundaries

No React error boundaries to catch rendering errors. A component error could crash the entire app.

### 3.5 No Rate Limiting / Anti-Abuse

Interactive elements (forms, buttons) have no client-side rate limiting or abuse protection.

---

## 4. Performance Concerns

### 4.1 No Code Splitting

All components load initially regardless of viewport. No lazy loading for:

- Below-the-fold content
- Images
- Components

**Impact**: Larger initial bundle size, slower FCP (First Contentful Paint).

### 4.2 No Image Optimization

All images use direct Unsplash URLs with:
- No lazy loading (loading="lazy")
- No srcset for responsive images
- No next-gen formats (WebP/AVIF)
- No explicit dimensions causing layout shifts

### 4.3 Event Listeners Not Passive

Scroll event listeners in Navbar and HeroSection are not marked as passive, potentially blocking scroll performance:

- `Navbar.tsx`: Line 10
- `HeroSection.tsx`: Line 9

**Recommendation**: Add { passive: true } option.

### 4.4 Multiple Re-renders from useState

`useScrollAnimation` hook uses useState internally (line 5), triggering re-renders. With multiple instances on a page (used by 4+ components), could accumulate.

### 4.5 No Bundle Analysis

No build analysis to identify large dependencies or duplicate chunks.

### 4.6 Intersection Observer Not Disconnected

In `useScrollAnimation.tsx`, the observer is never disconnected (line 26-30 only unobserves but does not call observer.disconnect()):

```
return () => {
  if (element) {
    observer.unobserve(element)
  }
}
```

**Fix**: Add observer.disconnect() in cleanup.

### 4.7 Animations Using Expensive Properties

Animations use transform and will-change on multiple elements simultaneously, could cause jank on lower-end devices:

- Parallax in HeroSection
- Multiple hover transitions
- Ticker animation in RecentlySoldTicker

---

## 5. Fragile Areas

### 5.1 Custom Hook Design Issues

The `useScrollAnimation` hook has design flaws:

1. Uses single ref for multiple trigger points (each component uses own threshold/margin)
2. Sets isVisible to true permanently (no reset mechanism)
3. Once visible, stays visible even if element is scrolled out of view

**Impact**: Cannot reuse for elements that should toggle visibility.

### 5.2 Hardcoded Color Values

Tailwind colors defined multiple times:

- index.css: Theme colors defined as CSS variables (lines 14-30)
- Colors used directly in component className (e.g., bg-charcoal-900)

If CSS variables fail to load or override, visual design breaks entirely.

### 5.3 No Fallback for External Images

If Unsplash is down or images fail:

- No fallback image
- No alt text consideration for all (some have alt, some minimal)
- Broken image placeholders

### 5.4 Index Source Path Errors

index.css references non-existent paths (lines 7-10):

```
@source "./components";
@source "./pages";
@source "./hooks";
@source "./src";
```

- "./pages" does not exist in this project

### 5.5 Font Loading

Google Fonts loaded via @import in CSS (line 1):

- Blocks rendering until font loads (FOUT potential)
- No font-display: swap fallback strategy configured

### 5.6 Deprecated/Legacy Patterns

- React.FC usage: Not used; considered legacy
- Component function signature varies: Some use export function, others may not be consistent
- Mix of named and default exports in project

### 5.7 No Error Handling for States

- No loading states
- No error states  
- No empty states
- All content assumes successful/rendered state

### 5.8 Accessibility Concerns

1. **Missing skip links**: No skip-to-content link
2. **Form labels**: Newsletter input has placeholder but no associated label element
3. **Button ARIA**: Interactive buttons lack aria-label for icon-only buttons
4. **Focus management**: Mobile menu open/close does not manage focus
5. **Color contrast**: Gold-400 on charcoal may fail WCAG AA
6. **Screen reader**: Ticker animation may be problematic (no prefers-reduced-motion)
7. **Keyboard navigation**: Some hover-only elements need focus states

---

## 6. Summary Priority Matrix

| Priority | Issue | Area |
|----------|-------|------|
| HIGH | Non-functional links/buttons | UX, Functionality |
| HIGH | Hardcoded data | Scalability |
| HIGH | No image fallbacks | Reliability |
| HIGH | Accessibility gaps | A11y compliance |
| MEDIUM | Duplicate scroll handlers | Code Quality |
| MEDIUM | Event listener performance | Performance |
| MEDIUM | No code splitting | Performance |
| MEDIUM | CSS variable undefined | Styling |
| LOW | Unused React imports | Code Quality |
| LOW | Duplicate CSS import | Code Quality |
| LOW | No error boundaries | Resilience |

---

## 7. Suggested Next Steps

1. **Immediate**: Add working links or disable dead buttons
2. **Immediate**: Add image error handling
3. **Quick Win**: Fix duplicate CSS import
4. **Quick Win**: Add passive scroll listeners
5. **Short-term**: Add accessibility improvements
6. **Medium-term**: Implement data layer/CMS integration
7. **Medium-term**: Add lazy loading for below-fold content
8. **Long-term**: Full error boundary implementation
9. **Long-term**: Performance optimization with bundle analysis

---

*Generated: April 2026*