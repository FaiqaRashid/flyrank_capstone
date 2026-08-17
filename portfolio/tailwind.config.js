/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: '#97A97C',
        cream: '#FAF6F0',
        beige: '#F2EDE4',
        obsidian: '#121413',
        // Semantic extensions
        primary: {
          DEFAULT: '#97A97C',
          foreground: '#121413',
        },
        background: '#FAF6F0',
        card: '#F2EDE4',
        border: '#121413',
      },
      boxShadow: {
        sharp: '4px 4px 0px #121413',
        'sharp-sm': '2px 2px 0px #121413',
        'sharp-lg': '6px 6px 0px #121413',
      },
    },
  },
  plugins: [],
};
