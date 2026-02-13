import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0F',
        'primary-purple': '#7B2CBF',
        'electric-purple': '#9D4EDD',
        'card-bg': '#1A1A1F',
        'light-gray': '#CCCCCC',
        'dark-gray': '#666666',
      },
      boxShadow: {
        'purple-glow': '0 0 20px rgba(157, 78, 221, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
