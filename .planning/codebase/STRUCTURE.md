# Directory Structure

## Root Layout

`
hooks-playground/                    # Project root
|
+-- .planning/codebase/            # Planning documents
|   +-- ARCHITECTURE.md            # This file
|   +-- STRUCTURE.md               # This file
|   +-- INTEGRATIONS.md            # (existing)
|   +-- STACK.md                  # (existing)
|
+-- dist/                         # Build output (generated)
|   +-- index.html
|   +-- assets/
|       +-- index-*.css
|       +-- index-*.js
|
+-- node_modules/                  # Dependencies (generated)
|
+-- src/                        # Source code
|   +-- index.tsx               # React bootstrap
|   +-- index.css               # Global styles + Tailwind
|   +-- App.tsx                # Root component
|   +-- App.css                # App styles (empty)
|   +-- components/            # UI components directory
|   |   +-- NavBar.tsx
|   |   +-- HeroSection.tsx
|   |   +-- TrustBar.tsx
|   |   +-- CategoryNav.tsx
|   |   +-- GrailOfTheWeek.tsx
|   |   +-- FeaturedProducts.tsx
|   |   +-- RecentlySoldTicker.tsx
|   |   +-- Footer.tsx
|   +-- hooks/                 # Custom hooks directory
|       +-- useScrollAnimation.tsx
|
+-- .git/                      # Git repository data
+-- .gitignore
+-- package.json               # Project manifest
+-- package-lock.json       # Locked dependencies
+-- index.html              # HTML entry point
+-- vite.config.ts         # Vite configuration
+-- tsconfig.json         # TypeScript base config
+-- tsconfig.app.json     # TypeScript app config
+-- tsconfig.node.json   # TypeScript node config
+-- eslint.config.js     # ESLint configuration
