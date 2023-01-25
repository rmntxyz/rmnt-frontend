module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./comps/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sen: ["Sen", "sans-serif"],
      },
      display: ["group-hover"],
      colors: {
        lightBeige: "#F4EADC",
        mediumBeige: "#DAB88B",
        darkBeige: "#998161",
        mediumGray: "#DBDBDB",
        lightGray: "#B6B6B6",
        darkGray: "#242424",
        ourBlack: "#0C0C0C",
        navBg: "#1D1D1D",
        mainBg: "#333333",
        mintGreen: "#70EFCF",
        opaqueGray: "rgba(12, 12, 12, 0.5)",
      },
      boxShadow: {
        small: "0 5px 20px 0 rgba(0, 0, 0, 0.14)",
        medium: "0 6px 32px 0 rgba(0, 0, 0, 0.18)",
        large: "0 6px 36px 0 rgba(0, 0, 0, 0.36)",
      },
      dropShadow: {
        small: "0px 5px 10px rgba(0, 0, 0, 0.14)",
        medium: "0px 6px 16px rgba(0, 0, 0, 0.18)",
        large: "0px 6px 18px rgba(0, 0, 0, 0.36)",
      },
      container: {
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1376px",
        },
      },

      screens: {
        "3xl": "1920px",
      },

      backgroundImage: {
        hero: "url('/background/background img@3x.png')",
      },
    },
  },
  plugins: [],
};
