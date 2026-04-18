# Testing Patterns

## Testing Framework and Tools

### Current State
- **No testing framework currently configured**
- No test scripts in package.json
- No test files found in the project

### Installed Dependencies
This codebase has the following testing-related tools NOT installed:
- No Jest
- No Vitest
- No React Testing Library
- No unit/e2e test framework

## Test Structure

### Recommended Structure
Based on project patterns, tests should follow this structure:

`
src/
  components/
    NavBar.tsx
    NavBar.test.tsx       # Component tests
  hooks/
    useScrollAnimation.tsx
    useScrollAnimation.test.tsx  # Hook tests
  __tests__/
    utils.test.ts         # Utility tests
`

### File Naming
- Unit tests: *.test.ts or *.test.tsx
- Spec tests: *.spec.ts or *.spec.tsx
- Test directories: __tests__/

## Mocking Patterns

### Dependencies to Mock
- lucide-react - Icon library (mock icons if needed)
- eact-dom - DOM rendering
- IntersectionObserver - For useScrollAnimation hook

### Recommended Mocks
`	ypescript
// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockImplementation(() => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
}))
window.IntersectionObserver = mockIntersectionObserver
`

## Coverage Requirements

### Recommended Coverage Targets
- Components: 80%+ line coverage
- Custom hooks: 100% coverage
- Utility functions: 90%+ coverage

### Critical Areas to Test
1. **useScrollAnimation hook**
   - Tests visibility state changes
   - Tests IntersectionObserver behavior
   - Tests cleanup on unmount

2. **Navbar component**
   - Scroll state behavior
   - Mobile menu toggle
   - Navigation links

3. **HeroSection component**
   - Parallax scroll effect
   - Button interactions

4. **FeaturedProducts component**
   - Product rendering
   - Scroll animation integration
   - Hover states

## Component Testing Patterns

### React Testing Library Approach
`	ypescript
import { render, screen } from '@testing-library/react'
import { Navbar } from './NavBar'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Auctions')).toBeInTheDocument()
  })
})
`

### Hook Testing
`	ypescript
import { renderHook, act } from '@testing-library/react'
import { useScrollAnimation } from './useScrollAnimation'

describe('useScrollAnimation', () => {
  it('returns ref and isVisible', () => {
    const { result } = renderHook(() => useScrollAnimation())
    expect(result.current.ref).toBeDefined()
    expect(typeof result.current.isVisible).toBe('boolean')
  })
})
`

## Running Tests

### Recommended Scripts
Add to package.json:
`json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
`

### Install Commands
`ash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
`

## Notes

### Current Testing Gaps
1. Zero test files in codebase
2. No test configuration
3. No continuous integration for tests
4. No test coverage reporting

### Priority Test Implementation
1. Add Vitest configuration
2. Test useScrollAnimation hook (most critical custom logic)
3. Test Navbar component (multiple states)
4. Test FeaturedProducts component (data iteration)
5. Add CI pipeline for automated testing
