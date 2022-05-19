module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'markdown-content',
    }),
    require('@tailwindcss/line-clamp'),
  ],
}
