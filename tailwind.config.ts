import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#082f49',
          950: '#051e3e',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          900: '#111827',
        },
        // OFFO Brand Color Palette
        offo: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      backgroundImage: {
        // OFFO Brand Gradients
        'gradient-offo': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
        'gradient-offo-subtle': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        'gradient-offo-reversed': 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0ea5e9 100%)',
        'gradient-offo-dark': 'linear-gradient(135deg, #082f49 0%, #0369a1 100%)',
        'gradient-offo-light': 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
        // Accent gradients for cards and highlights
        'gradient-offo-accent': 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(2, 132, 199, 0.1) 100%)',
        'gradient-offo-accent-hover': 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.15) 100%)',
      },
      boxShadow: {
        // OFFO Brand Shadow (primary blue accent)
        'offo': '0 4px 20px rgba(14, 165, 233, 0.15)',
        'offo-lg': '0 10px 40px rgba(14, 165, 233, 0.2)',
        'offo-xl': '0 20px 60px rgba(14, 165, 233, 0.25)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          }
        }
      }
    },
  },
  plugins: [],
}
export default config