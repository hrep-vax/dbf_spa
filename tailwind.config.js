module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#2196f3',
        'primary-darker': '#0069c0',
        'primary-lighter': '#6ec6ff'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
