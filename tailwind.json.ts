/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./@/components/**/*.{ts,tsx}", // include ShadCN components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
