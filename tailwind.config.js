/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    screens: {
      xs: '360px',       // Extra small phones
      sm: '480px',       // Small phones
      md: '768px',       // Tablets
      lg: '976px',       // Small laptops
      xl: '1440px',      // Large desktops
      '2xl': '1536px',   // Ultra-wide monitors
    },
    extend: {},
  },
  plugins: [],
}

