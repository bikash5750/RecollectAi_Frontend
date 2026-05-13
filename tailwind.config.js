/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F3FA',
          100: '#E8E6F6',
          200: '#D0CCED',
          300: '#B7B1E3',
          400: '#8C85D0',
          500: '#6B63BA',
          600: '#524B82', // primary
          700: '#45406E',
          800: '#373356',
          900: '#24223A',
        },
        paper: {
          DEFAULT: '#F7F4EE', // eggshell
          50: '#FBFAF7',
          100: '#F7F4EE',
          200: '#F0ECE4',
        },
        ink: {
          DEFAULT: '#1D1A23',
          muted: '#5B5765',
          faint: '#7A7686',
        },
        line: {
          DEFAULT: '#E5E0D6',
          strong: '#D8D1C4',
        },
        accent: {
          gold: '#B08D57',
          sage: '#2F6B58',
          rose: '#B26476',
        },
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      borderRadius: {
        lg: '12px',
      },
      boxShadow: {
        paper: '0 1px 0 rgba(17, 24, 39, 0.06), 0 10px 24px rgba(17, 24, 39, 0.06)',
        soft: '0 1px 0 rgba(17, 24, 39, 0.06), 0 6px 14px rgba(17, 24, 39, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
