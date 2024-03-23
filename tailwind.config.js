/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['"Urbanist"', "sans-serif"],
        // Add more custom font families as needed
      }
    },
  },
  plugins: [],
}

