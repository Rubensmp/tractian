/** @type {import('tailwindcss').Config} */

import { colors } from './src/styles/colors'

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors,
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px'
      },
    },
  },
  plugins: [],
}

