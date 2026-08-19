/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gawdee: {
          green: '#113826',
          'green-light': '#1b4d3e',
          'green-dark': '#0a2418',
          'green-accent': '#276749',
          gold: '#D4AF37',
          'gold-light': '#F4E8C1',
          'gold-hover': '#B89525',
          cream: '#FAF8F5',
          'cream-soft': '#FFFDF9',
          sand: '#F2EDE4',
          charcoal: '#1C2421',
          muted: '#6B7280',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gawdee-soft': '0 4px 20px -2px rgba(17, 56, 38, 0.06)',
        'gawdee-elevated': '0 10px 30px -4px rgba(17, 56, 38, 0.12)',
        'gawdee-card': '0 2px 12px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'gawdee': '16px',
        'gawdee-sm': '8px',
        'gawdee-lg': '24px',
      }
    },
  },
  plugins: [],
}
