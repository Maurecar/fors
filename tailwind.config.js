/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    
  ],
  theme: {
    screens:{
      'mobil':'480px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {},
  },
  plugins: [],
}
