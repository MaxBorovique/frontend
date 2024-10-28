/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  darkMode: 'class',
  theme: {
    borderRadius: {
      'x': '4px',
      'sm': '8px',
    },
    screens: {
      sm: "640px",

      md: "768px",

      xl: "1280px",

      '2xl': "1360px",

    },
    extend: {
      fontFamily: {
        'title': ['"Alumni Sans"', ...defaultTheme.fontFamily.sans],
        'body': ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "primary": "#E63C3C",
        "secondary": "#639EF1",
        "primary-hover": "#B51717",
        "secondary-hover": "#1363D3",
        // info: light mode colors
        "title": "#151415",
        "secondary-text": "#1E1E1F",
        "tertiary-text": "#585558",
        "color": "#CECACE",
        "decorative": "#E1DFE1",
        "cards-bg": "#FCFCFC",
        "main-bg": "#F0EFF0",

        // info: dark mode colors
        "dark-title": "#FCFCFC",
        "dark-secondary-text": "#CCCBCD",
        "dark-tertiary-text": "#A3A1A5",
        "dark-color": "#2E2D2F",
        "dark-decorative": "#232324",
        "dark-cards-bg": "#1E1E1F",
        "dark-main-bg": "#141414",
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

