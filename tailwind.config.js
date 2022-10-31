/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  css: ['/src/assets/css/tailwind.css'],
  theme: {
    extend: {
      colors: {
        'black-app': '#150C21',
        'blackberry': '#1F1D2C',
        'currant': '#200F2D',
        'hoverCurrant': '#281237',
      },
      fontFamily: {
        inter: [
          'Inter, ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont, Segoe UI,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        ],
        poppins: [
          'Poppins, ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont, Segoe UI,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        ],
      },
    },
  },
};
