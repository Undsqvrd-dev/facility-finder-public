/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./styles/**/*.{css}"
    ],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          background: "var(--background)",
          textDark: "var(--text-dark)",
          textLight: "var(--text-light)",
        },
      },
    },
    plugins: [],
};