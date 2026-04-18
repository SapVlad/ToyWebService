# Architecture Overview

## Pattern

This codebase follows a **Component-Based Architecture** pattern implemented as a **single-page React web application (SPA)**. The project serves as a "hooks playground" - demonstrating custom React hooks in a real UI context.

## Architectural Style

- **Structural Pattern**: Flat component-based architecture with clear separation between:
  - UI Components (src/components/)
  - Custom Hooks (src/hooks/)
  - Application Entry (src/App.tsx, src/index.tsx)
- **State Management**: Minimal - React's built-in useState and useEffect only
- **Data Flow**: Unidirectional, parent-to-child via props
- **No external state management** (Redux, Zustand, Jotai, etc.)
- **No routing** - single page application

## Layers

`
index.html (HTML entry)
  |
  +-> src/index.tsx (React bootstrap)
        |
        +-> src/App.tsx (Root component)
              |
              +-> src/components/ (UI layer - 8 components)
                    |
                    +-> src/hooks/ (Hook layer - 1 custom hook)
`

### Layer 1: Entry Layer
- index.html - HTML entry point, renders to #root
- src/index.tsx - React DOM render

### Layer 2: Application Root
- src/App.tsx - Main composition, orchestrates all components

### Layer 3: Components (Presentation)
Stateless/presentational components rendering UI:
- NavBar.tsx
- HeroSection.tsx
- TrustBar.tsx
- CategoryNav.tsx
- GrailOfTheWeek.tsx
- FeaturedProducts.tsx
- RecentlySoldTicker.tsx
- Footer.tsx

### Layer 4: Hooks (Behavior)
Custom hook providing scroll-based behavior:
- useScrollAnimation.tsx - IntersectionObserver for reveal animations

## Data Flow

`
Event: User scrolls page
  |
  +-> Scroll listener in NavBar (window scroll)
  +-> Scroll listener in HeroSection (window scroll)
  +-> useScrollAnimation (IntersectionObserver)
        |
        +-> Returns ref + isVisible state
        +-> Components use isVisible to trigger CSS transitions
`

### Scroll Animation Flow
1. Component calls useScrollAnimation()
2. Hook creates IntersectionObserver on component's ref
3. Observer detects when element enters viewport
4. Sets isVisible = true
5. Component applies CSS transition classes

### Component Communication
- **Parent to Child**: Props (static data arrays)
  - FeaturedProducts: Product array defined inline
  - RecentlySoldTicker: soldItems array defined inline
- **Sibling to Sibling**: None (no shared state)
- **Child to Parent**: None (no callbacks to parent)

## Key Abstractions

### useScrollAnimation
- **Purpose**: Provides scroll-triggered reveal animations
- **Pattern**: Custom hook wrapping IntersectionObserver API
- **Parameters**: threshold, rootMargin
- **Returns**: { ref, isVisible }
- **Usage**: Used by TrustBar, CategoryNav, GrailOfTheWeek, FeaturedProducts

### Tailwind CSS Theme (@theme)
- **Purpose**: Custom design tokens
- **Contains**:
  - Color palette (charcoal, gold, cream)
  - Fonts (serif, sans)
  - Custom animations (fadeInUp, shimmer, scrollTicker)
  - Custom utilities (text-shadow-gold, gold-shimmer-text)

### Component Factory Pattern
- Each component is a named function export (not default)
- Follows: export function ComponentName()
- Clear import paths: import { ComponentName } from './components/ComponentName'

## Entry Points

### Primary Entry
| File | Purpose |
|------|---------|
| index.html | HTML entry, loads React app into #root |
| src/index.tsx | React bootstrap, renders <App /> |
| src/App.tsx | Root component, composes all UI |

### Configuration Entries
| File | Purpose |
|------|---------|
| vite.config.ts | Vite + React + Tailwind plugins |
| tsconfig.json | TypeScript project references |
| tsconfig.app.json | App code compilation |
| eslint.config.js | Linting rules |
| package.json | Dependencies and scripts |

## Build & Development

- **Dev server**: npm run dev (Vite)
- **Build**: npm run build (Vite build to dist/)
- **Preview**: npm run preview (serve built app)
- **Linting**: ESLint (flat config)

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.6 |
| Linting | ESLint 9 |
| Icons | lucide-react |
| Fonts | Google Fonts (Playfair Display, Inter) |
