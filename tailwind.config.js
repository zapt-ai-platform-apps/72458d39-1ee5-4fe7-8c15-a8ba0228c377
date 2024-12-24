export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000', // Red
        secondary: '#000000', // Black
        accent: '#1E1E1E', // Dark Gray for backgrounds
        textPrimary: '#FFFFFF', // White
        textSecondary: '#FF4D4D', // Light Red
      },
    },
  },
  plugins: [],
};