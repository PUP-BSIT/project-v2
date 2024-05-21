/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors : {
        headerColor : '#A47E70',
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

