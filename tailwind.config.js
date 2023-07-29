/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'ui'],
    },
    extend: {
      colors: {
        'primary': "#00345E",
        'secondary': "#e8f4fc"
      }
    },
  },
  plugins: [],
}
