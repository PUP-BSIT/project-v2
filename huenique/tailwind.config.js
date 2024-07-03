/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        darkBrown: '#a47e70',
        darkGray: '#545454',
        lightBlue: '#669FFF',
        customPrimary: '#874213',
        customPrimary: '#123456',
        lightOrange: '#FFEED9',
        lightYellow: '#FFCC5E',
        darkYellow: '#FFC13B',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
}
