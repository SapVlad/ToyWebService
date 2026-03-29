
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#050505',
          900: '#0A0A0A', // Deepest background
          800: '#111111', // Card background
          700: '#1A1A1A', // Elevated surfaces
          600: '#252525',
        },
        gold: {
          300: '#E5C56C',
          400: '#D4AF37', // Bright gold
          500: '#C9A84C', // Primary gold
          600: '#B8962E', // Muted gold
          700: '#8A7022',
        },
        cream: {
          50: '#F9F7F5',
          100: '#F5F0E8', // Primary text
          200: '#EBE5DA',
          300: '#C4BAA8', // Muted text
          400: '#8A8070', // Subtle text
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #C9A84C 50%, #B8962E 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
        'dark-gradient': 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,1) 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'shimmer': 'shimmer 3s infinite linear',
        'scroll-ticker': 'scrollTicker 30s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scrollTicker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
