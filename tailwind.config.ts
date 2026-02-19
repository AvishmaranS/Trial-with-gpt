import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0b0b0f',
        bgSecondary: '#121218',
        textPrimary: '#f5f5f7',
        textSecondary: '#a1a1aa',
        accent: '#7b7b83'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      },
      boxShadow: {
        glow: '0 20px 50px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: []
};

export default config;
