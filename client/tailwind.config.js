/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        sticky: 'sticky 1s ease-in-out',  
      },
      keyframes: {
        sticky: {
          '0%': { transform: 'scale(0) rotate(30deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(-5deg)', opacity: '1' },
        },
      },
      rotate: {
        '-5': '-5deg',
        '5': '5deg',
      },
      colors: {
        'sticker-yellow': '#FFD700', 
      },
    },
  },
  plugins: [],
};
