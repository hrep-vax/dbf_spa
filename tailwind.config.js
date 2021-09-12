module.exports = {
  purge: {content: ["./public/**/*.html", "./src/**/*.vue"]},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#2196f3',
        'primary-darker': '#0069c0',
        'primary-lighter': '#6ec6ff',
        'primary-soft': '#e3f2fd',
        'accent': '#ffca28',
        'accent-darker': '#c79a00',
        'accent-lighter': '#fffd61',
        'accent-soft': '#fff8e1',
        'danger': '#f44336',
        'danger-darker': '#ba000d',
        'danger-lighter': '#ff7961',
        'danger-soft': '#ffebee',
        'warning': '#9c27b0',
        'warning-darker': '#6a0080',
        'warning-lighter': '#d05ce3',
        'warning-soft': 'f3e5f5',
        'success': '#4caf50',
        'success-darker': '#087f23',
        'success-lighter': '#80e27e',
        'success-soft': '#e8f5e9',
        'message': '#424242',
        'message-darker': '#1b1b1b',
        'message-lighter': '#6d6d6d'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
