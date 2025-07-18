/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        slab: ['Roboto Slab', 'serif'],
      },
      colors: {
        'forest-green': '#1A472A',
        'warm-sand': '#F4F1EA',
        'muted-gold': '#D4A24E',
        charcoal: '#2D3748',
      },
    },
  },
  plugins: [],
}
