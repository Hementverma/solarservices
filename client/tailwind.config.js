/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f1f7f3',
          100: '#deece3',
          200: '#bfd9ca',
          300: '#94bfa9',
          400: '#619f82',
          500: '#3f8164',
          600: '#2e674e',
          700: '#265340',
          800: '#1c4334',
          900: '#123b2a',
          950: '#08251a',
        },
        solar: {
          50: '#fff9eb',
          100: '#fff0c6',
          200: '#ffdf88',
          300: '#ffc94a',
          400: '#f4b942',
          500: '#e39b18',
          600: '#c47711',
          700: '#a35612',
          800: '#854314',
          900: '#703815',
        },
        ink: '#18251f',
        mist: '#f6f8f5',
        cream: '#fbfaf6',
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(18, 59, 42, 0.28)',
        card: '0 24px 70px -38px rgba(18, 59, 42, 0.42)',
        glow: '0 20px 50px -18px rgba(244, 185, 66, 0.42)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      maxWidth: {
        page: '1240px',
      },
      opacity: {
        8: '0.08',
        12: '0.12',
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        72: '0.72',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
