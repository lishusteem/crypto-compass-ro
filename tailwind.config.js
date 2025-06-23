/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0f172a',
          secondary: '#1e293b',
          accent: {
            orange: '#f97316',
            blue: '#3b82f6',
            purple: '#7c3aed',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
          }
        }
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%': { 'box-shadow': '0 0 5px rgba(249, 115, 22, 0.5)' },
          '100%': { 'box-shadow': '0 0 20px rgba(249, 115, 22, 0.8)' },
        }
      },
      backgroundImage: {
        'gradient-animated': 'linear-gradient(-45deg, #1e3a8a, #3b82f6, #7c3aed, #ec4899)',
      },
      backgroundSize: {
        'gradient-animated': '400% 400%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 