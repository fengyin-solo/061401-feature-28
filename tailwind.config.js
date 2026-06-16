/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#0f0f14',
        'game-card': '#1a1a24',
        'game-card-hover': '#22222e',
        'game-border': '#2a2a3a',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'shake': 'shake 0.5s ease-in-out',
        'shake-urgent': 'shakeUrgent 0.4s ease-in-out infinite',
        'danger-glow': 'dangerGlow 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%': { transform: 'translateX(-4px)' },
          '30%': { transform: 'translateX(4px)' },
          '45%': { transform: 'translateX(-3px)' },
          '60%': { transform: 'translateX(3px)' },
          '75%': { transform: 'translateX(-1px)' },
          '90%': { transform: 'translateX(1px)' },
        },
        shakeUrgent: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-3px)' },
          '20%': { transform: 'translateX(3px)' },
          '30%': { transform: 'translateX(-3px)' },
          '40%': { transform: 'translateX(3px)' },
          '50%': { transform: 'translateX(0)' },
        },
        dangerGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
          '50%': { boxShadow: '0 0 12px 2px rgba(239, 68, 68, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
