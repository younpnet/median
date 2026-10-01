/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff', 100: '#dbe9ff', 200: '#bdd6ff', 300: '#90b9ff', 400: '#5b95ff',
          DEFAULT: '#0d6efd', 500: '#0d6efd', 600: '#0b5ed7', 700: '#0a4fb3', 800: '#093f8c', 900: '#0a2f66'
        },
        ink: { DEFAULT: '#0b1220', 800: '#111a2b', 700: '#1b2536' }
      },
      fontFamily: { sans: ['Pretendard Variable', 'Pretendard', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
