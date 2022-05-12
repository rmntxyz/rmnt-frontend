module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./homeComps/**/*.{js,ts,jsx,tsx}", "./detailPageComps/**/*.{js,ts,jsx,tsx}," ],
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
        'mediumGray': '#DBDBDB',
        'lightGray': '#B6B6B6',
        'lighterGray': '#F3F3F3',
        'darkGray': '#242424',
        'ourBlack': '#0C0C0C',
      },
      dropShadow: {
        'small': '0px 5px 10px rgba(0, 0, 0, 0.14)',
        'medium': '0px 6px 16px rgba(0, 0, 0, 0.18)',
        'large': '0px 6px 18px rgba(0, 0, 0, 0.36)',

      },
      container: {
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1376px',
        }
      },
    },
  },
  plugins: [],
};
