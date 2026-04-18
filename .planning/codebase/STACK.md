# Technology Stack

## Languages
- TypeScript (primary language)
- JavaScript/JSX (React)

## Runtime
- Node.js (via Vite dev server and build)
- Browser (ES2023 target)

## Frameworks
- React 18.2.0 - UI library
- Vite 8.0.3 - Build tool and dev server

## UI Framework
- Tailwind CSS 4.2.2 - Utility-first CSS framework
- Custom design tokens (charcoal, cream, gold color palette)

## Dependencies

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | React DOM rendering |
| lucide-react | ^1.7.0 | Icon library |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^8.0.3 | Build tool |
| @vitejs/plugin-react | ^6.0.1 | React plugin for Vite |
| @tailwindcss/vite | ^4.2.2 | Tailwind plugin for Vite |
| tailwindcss | ^4.2.2 | CSS framework |
| typescript | ~5.6.0 | Type checking |
| @types/react | ^18.3.0 | React type definitions |
| @types/react-dom | ^18.3.0 | React DOM types |
| eslint | ^9.17.0 | Linter |
| @eslint/js | ^9.17.0 | ESLint config |
| eslint-plugin-react-hooks | ^5.1.0 | React hooks linting |
| eslint-plugin-react-refresh | ^0.4.16 | Refresh plugin |
| typescript-eslint | ^8.18.0 | TypeScript ESLint |
| globals | ^15.14.0 | Global type definitions |

## Configuration Files

### TypeScript
- tsconfig.json - Base config (references app and node configs)
- tsconfig.app.json - App config with strict mode, ES2023 target, DOM types
- tsconfig.node.json - Node-specific config

### Build
- vite.config.ts - Vite configuration with React and Tailwind plugins
- index.html - Entry HTML file with root div and module import

### Linting
- eslint.config.js - ESLint flat config with React, TypeScript, and hooks rules

## Project Structure
`
src/
  components/     - React components
  hooks/          - Custom React hooks (useScrollAnimation)
  App.tsx         - Main App component
  index.tsx       - Entry point
  index.css       - Global styles
  App.css         - App-specific styles
`

## Scripts
- npm run dev - Start Vite dev server
- npm run build - Build for production
- npm run preview - Preview production build