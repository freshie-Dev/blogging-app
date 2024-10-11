/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'customBP': '600px', // Add your custom breakpoint here
      },
    },
  },
  plugins: [],
}