# Code Conventions

## Language and Syntax

### TypeScript
- Primary language is TypeScript with strict mode enabled
- Target: ES2023, DOM, DOM.Iterable
- Module: ESNext with bundler mode
- Strict type checking enforced
- No unused variables or parameters allowed
- Use erasable syntax only (type aliases, interfaces, type annotations)

### React/JSX
- Uses React 18.2.0 with functional components
- JSX transform: react-jsx
- File extension: .tsx for components, .ts for utilities
- Use named exports for components (e.g., export function Navbar())

## Naming Conventions

### Files and Components
- PascalCase for component files: NavBar.tsx -> Navbar
- PascalCase for component functions: unction Navbar()
- camelCase for hooks: useScrollAnimation
- kebab-case for regular files

### Variables and Functions
- camelCase for variables and functions
- PascalCase for interfaces and types
- SCREAMING_SNAKE_CASE for constants
- Descriptive, semantic names (e.g., isScrolled, isMobileMenuOpen)

### CSS Classes (Tailwind)
- Utility classes via Tailwind CSS
- Custom design tokens: charcoal, cream, gold color palette
- Semantic class names: g-charcoal-900, 	ext-cream-100, order-gold-500

## Code Structure and Patterns

### Component Structure
1. Imports (React, third-party, then internal)
2. Interfaces/types defined before component
3. Constants/data defined after interfaces
4. Component function definition
5. Default export at end (or named export)

### React Patterns
- Functional components with named exports
- hooks/useEffect for side effects with proper cleanup
- useState for local component state
- useRef for DOM references
- Custom hooks in src/hooks/ directory

### Import Organization
`	ypescript
// 1. React imports
import React, { useEffect, useState } from 'react'

// 2. Third-party imports
import { ShoppingBag, Search, Menu, X } from 'lucide-react'

// 3. Internal imports (relative)
import { useScrollAnimation } from '../hooks/useScrollAnimation'
`

## Error Handling

### Error Boundaries
- No explicit error boundaries currently implemented
- Consider adding ErrorBoundary component

### Try-Catch
- Use try-catch for potentially failing operations
- Log errors appropriately
- Provide fallback UI when errors occur

### Type Safety
- Strict TypeScript enabled (noImplicitAny)
- Explicit return types for complex functions
- Interface/type definitions for all data structures

## Linting and Formatting

### ESLint Configuration
- Uses eslint.config.js (flat config)
- Plugins: @eslint/js, typescript-eslint, react-hooks, react-refresh
- Extends recommended configs from all plugins

### Rules Enforced
- No unused variables or parameters
- React hooks exhaustive deps
- React refresh compatible components
- TypeScript strict mode

### Run Commands
- 
pm run dev - Development server
- 
pm run build - Production build
- No explicit lint script (Vite handles build validation)

## Testing Conventions

### Current State
- **No tests present in the codebase**
- No test framework configured
- No test files or test directories found

### Recommendations
- Add Vitest or Jest for testing
- Add @testing-library/react for component testing
- Create __tests__/ directories alongside source files
- Follow AAA pattern: Arrange, Act, Assert
