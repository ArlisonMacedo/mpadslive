/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'blue-pad': '#583b7e'
      },
      fontFamily: {
        'inter': ['Inter'],
        'poppins': ['poppins']
      }
    },
  },
  plugins: [],
}
