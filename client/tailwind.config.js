/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        body: ['Bungee Spice', 'sans-serif'],
        body2:['Bungee Outline'],
        body3:['Bungee']    
    }
    },
  },
  plugins: [],
}

