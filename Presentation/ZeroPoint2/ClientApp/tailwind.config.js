const appTypography = require('./src/config/typography');
const { palette, brand } = require('./src/config/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    screen: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
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
