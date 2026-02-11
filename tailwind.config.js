/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonCyan: '#00f0ff',
        neonPink: '#ff00ff',
        darkBg: 'rgba(10,10,30,0.85)',
      },
    },
  },
  plugins: [],
}
