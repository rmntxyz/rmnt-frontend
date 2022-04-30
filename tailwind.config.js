module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./comps/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sen: ["'Sen', sans-serif"],
      },
      screens: {

      },
      colors: {
        'lightBeige': '#F4EADC',
        'darkBeige': '#998161', 
        'lightGray': '#B6B6B6',
        'ourBlack': '#0C0C0C'  
      },
      dropShadow: {
        'rmnt': '0px 6px 12px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
};
