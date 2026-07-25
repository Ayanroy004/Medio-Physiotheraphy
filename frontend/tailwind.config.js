/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core clinical palette — named tokens, not raw hexes, so intent stays legible in markup
        clinic: {
          ink: '#152A2E',        // primary text
          navy: '#123C5D',       // deep trust-blue, headers / primary CTAs
          teal: '#0E6E6E',       // brand teal, accents & active states
          sky: '#4FA8C9',        // lighter interactive accent, links/hover
          mist: '#F3F7F7',       // page background
          fog: '#E7EFEF',        // card / section alt background
          border: '#D7E3E3',
          success: '#4F9D69',
          warn: '#C98A2C',
          danger: '#C1503F',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 10px -2px rgba(18, 60, 93, 0.08), 0 8px 24px -8px rgba(18, 60, 93, 0.10)',
        'card-hover': '0 6px 20px -4px rgba(18, 60, 93, 0.14), 0 14px 32px -10px rgba(18, 60, 93, 0.16)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        wave: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-200' },
        },
        floatUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        wave: 'wave 6s linear infinite',
        floatUp: 'floatUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
