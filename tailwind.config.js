module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gradient-blue": "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        indigo: {
          500: "#737373",
        },
      },
      boxShadow: {
        custom: "7px 6px 6px 2px rgba(0, 0, 0, 0.38)",
      },
      backgroundImage: {
        white: {
          500: "#f3f0f0",
        },
        avatar: "#000000bf",
        gradient: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
      },
      maxWidth: {
        30: "30%",
        "3/5": "60%",
        65: "65%",
        "4/5": "80%",
      },
      width: {
        30: "30%",
        65: '65%',
        90: "90%",
      },
      backgroundColor: {
        white: {
          default: "#ffffff",
          500: "#f3f0f0",
        },
      },
    },
  },
  plugins: [],
}
