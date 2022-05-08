module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./comps/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sen: ["Sen", "sans-serif"],
      },
      display: ["group-hover"],
      colors: {
        'lightBeige': '#F4EADC',
        'mediumBeige': '#DAB88B',
        'darkBeige': '#998161', 
        'lightGray': '#B6B6B6',
        'darkGray': '#242424',
        'ourBlack': '#0C0C0C',
      },
      dropShadow: {
        'small': '0px 5px 10px rgba(0, 0, 0, 0.14)',
        'large': '0px 6px 12px rgba(0, 0, 0, 0.2)',

      }
    },
  },
  plugins: [],
};
