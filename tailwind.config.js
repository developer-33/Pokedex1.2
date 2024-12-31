/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file structure
  ],
  darkMode: "class", // Enables toggling dark mode via a class
  theme: {
    extend: {
      colors: {
        // Custom colors for your dark/light mode themes
        glass: "rgba(255, 255, 255, 0.2)", // Example glassmorphism color
      },
      backdropBlur: {
        // For glassmorphism effects
        xs: "2px",
      },
      spacing: {
        // Add custom spacing values if needed
        "128": "32rem",
      },
      // Add any other custom utilities here
    },
  },
  plugins: [],
};
