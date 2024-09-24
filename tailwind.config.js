/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#11ed8a",
        main2: "#24ab82",
        main2Dark: "#166950",
        greyGreen: "#435e52",
        greyLight: "#bfd6cc",
        blackBlue: "#0e27e3",
        pinkChip: "#e01b4c",
      },
      fontWeight: {
        thin: "100",
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "900",
      },
    },
  },
  plugins: [],
};
