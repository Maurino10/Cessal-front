/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // blacky: '#222', // ton code hex personnalisé
        // light_green: '#DBEBEF'
        light_gray: '#f8fafc'
      },
    },
  },
  plugins: [],
}