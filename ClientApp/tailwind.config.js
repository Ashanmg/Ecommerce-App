const appTypography = require("./src/config/typography");
const { palette, brand } = require("./src/config/colors");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    screen: {
      sm: '640px',
      md: '760px',
      lg: '1170px',
      xl: '1920px',
    },
    fontFamily: {
      ...appTypography.fontFamily,
    },
    colors: {
      ...palette,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
