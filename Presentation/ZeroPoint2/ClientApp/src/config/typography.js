module.exports = {
  fontSources: ['Google Fonts'],

  fontStack: [
    {
      name: 'DM Serif Display',
      cssClass: 'text-serif',
      link: 'https://fonts.google.com/specimen/DM+Serif+Display',
    },
    {
      name: 'Inter',
      cssClass: 'text-sans',
      link: 'https://fonts.google.com/specimen/Inter',
    },
    {
      name: 'IBM Plex Mono',
      cssClass: 'text-mono',
      link: 'https://fonts.google.com/specimen/IBM+Plex+Mono',
    },
  ],
  fontFamily: {
    sans: ['"Inter"', 'sans-serif'],
    serif: ['"DM Serif Display"', 'serif'],
    heading: ['"Inter"', 'sans-serif'],
    mono: ['"IBM Plex Mono"', 'monospace'],
    code: ['"IBM Plex Mono"', 'monospace'],
    body: ['"Microsoft YaHei"',],
  },
};
