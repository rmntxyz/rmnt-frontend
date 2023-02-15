module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./comps/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sen: ["Sen", "sans-serif"],
      },
      display: ["group-hover"],
      colors: {
        ourBlack: "#0C0C0C",
        opaqueBlack: "rgba(12, 12, 12, 0.8)",
        lightGray: "#B6B6B6",
        opaqueGray: "rgba(65, 65, 65, 0.4)",
        navBg: "#1D1D1D",
        mainBg: "#333333",
        mintGreen: "#70EFCF",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
