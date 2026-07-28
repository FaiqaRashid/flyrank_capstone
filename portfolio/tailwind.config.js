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
        // Raw Palette Tokens
        maroon: '#800000',
        brown: '#633A2C',
        ochre: '#B88A2C',
        gold: '#B8860B',
        cream: '#E0D6B8',

        // Semantic Design Tokens for Portfolio Site
        primary: {
          DEFAULT: '#800000', // Maroon: Darkest tone for headers, hero titles, & main emphasis
          foreground: '#E0D6B8', // Cream: Readable light text on primary background
        },
        secondary: {
          DEFAULT: '#633A2C', // Brown: Dark tone for secondary headers, cards, & structural components
          foreground: '#E0D6B8', // Cream: Readable light text on secondary background
        },
        accent: {
          DEFAULT: '#B8860B', // Gold: Vibrant tone for badges, callouts, & primary action highlights
          foreground: '#3B1A1A', // Dark Maroon-tinted text on gold for readable contrast
        },
        hover: {
          DEFAULT: '#B88A2C', // Ochre: Warm tone for hover states and secondary interactive elements
          foreground: '#3B1A1A', // Dark text on ochre for readable contrast
        },
        background: {
          DEFAULT: '#E0D6B8', // Cream: Soft light background for portfolio pages & sections
          foreground: '#3B1A1A', // Dark text on cream background for optimal readability
        },
        surface: {
          DEFAULT: '#FAF6ED', // Lighter cream tint for elevated card surfaces
          foreground: '#3B1A1A', // Dark text on light surface
        },
        card: {
          DEFAULT: '#633A2C', // Dark brown card background option
          foreground: '#E0D6B8', // Light cream text on dark card
        },
      },
    },
  },
  plugins: [],
};
