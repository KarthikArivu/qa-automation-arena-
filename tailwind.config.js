/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neo: {
          pink: '#FF4365',
          green: '#00F5D4',
          yellow: '#FEE440',
          purple: '#7B2CBF',
          cyan: '#00BBF9',
          orange: '#FF9E00',
          dark: '#0E1117',
          card: '#161B22',
          border: '#30363D'
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-pink': '4px 4px 0px 0px #FF4365',
        'brutal-green': '4px 4px 0px 0px #00F5D4',
        'brutal-yellow': '4px 4px 0px 0px #FEE440',
        'brutal-cyan': '4px 4px 0px 0px #00BBF9'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
