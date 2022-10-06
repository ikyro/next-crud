/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        '04b03': "'04b03'",
        vcrosd: 'vcrosd',
        omori: 'omori',
        'omori-scary': 'omoriscary',
      },
    },
  },
  plugins: [],
}
