/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#0b1520',
          dark: '#080f18',
          card: 'rgba(255,255,255,0.06)',
          raised: 'rgba(255,255,255,0.08)',
        },
        accent: {
          DEFAULT: '#3b9fe0',
          light: '#6cc4f5',
          dim: 'rgba(59,159,224,0.15)',
        },
        success: { DEFAULT: '#2ecc71', dim: 'rgba(46,204,113,0.12)' },
        warning: { DEFAULT: '#f5a623', dim: 'rgba(245,166,35,0.12)' },
        danger: { DEFAULT: '#e74c3c', dim: 'rgba(231,76,60,0.12)' },
        'txt': { primary: '#f5f8fa', muted: '#b0c4d4', dim: '#6e8a9e' },
        ocean: {
          950: '#050d1a',
          900: '#0b1520',
          850: '#0e1a2a',
          800: '#122035',
          700: '#1a2d48',
          600: '#1e3a5c',
          500: '#244a70',
          400: '#2d6ba3',
        },
        brand: {
          blue: '#3b9fe0',
          cyan: '#6cc4f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px rgba(0,0,0,0.35)',
        glow: '0 0 24px rgba(59,159,224,0.2)',
        'glow-sm': '0 0 12px rgba(59,159,224,0.12)',
        'glow-lg': '0 0 40px rgba(59,159,224,0.18)',
        glass: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'panel-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,159,224,0.08)' },
          '50%': { boxShadow: '0 0 30px rgba(59,159,224,0.16)' },
        },
      },
    },
  },
  plugins: [],
}
