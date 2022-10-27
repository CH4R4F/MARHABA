/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        marhaba: {
          primary: "#FBBF24",
          "primary-text": "#272935",
          secondary: "#3B82F6",
          "secondary-text": "#333",
          accent: "#F87171",
          "accent-text": "#333",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
