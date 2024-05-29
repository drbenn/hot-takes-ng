/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./pages/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        fade_in: {
          "0%": {
            opacity: "0"
          },
          "25%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },


      },
      animation: {
        "page-fade-in": "fade_in 120ms ease-in"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}

