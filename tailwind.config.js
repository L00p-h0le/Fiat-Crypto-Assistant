/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'premium-black': '#050505',
        'premium-card': '#0a0a0a',
        'premium-border': 'rgba(255, 255, 255, 0.05)',
        'premium-accent-blue': '#4e67eb',
        'premium-accent-pink': '#ec88ff',
      },
      fontFamily: {
        'serif': ['Cinzel', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
