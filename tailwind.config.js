module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
