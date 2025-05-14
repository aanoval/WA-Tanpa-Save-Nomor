module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#E6F0FF',
          100: '#BFDBFE',
          600: '#007BFF',
          700: '#0057B8',
        },
        teal: {
          100: '#99F6E4',
        },
        gray: {
          200: '#E5E7EB',
          700: '#1F2937',
        },
      },
    },
  },
  plugins: [],
};