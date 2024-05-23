/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors : {
        headerColor : '#A47E70',
        notReallyWhite : '#FFFDFA',
        skinLikeColor : '#FFEED9',
        sky: '#669FFF',
        lightGray: '#B5B6B6'
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"), require("daisyui")
  ],
    daisyui: {
      themes: ["light"],
    },
}

