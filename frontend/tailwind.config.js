/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d8e9ff',
          200: '#b6d5ff',
          300: '#83b8ff',
          400: '#4f92ff',
          500: '#266dff',
          600: '#1c55d7',
          700: '#1846a4',
          800: '#163d83',
          900: '#132f62'
        },
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
