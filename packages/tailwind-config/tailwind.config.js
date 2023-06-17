module.exports = {
  content: [
    "../ui/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-right-toggle': {
          '0%': {
            width: '24px',
            left: '50%'
          },
          '20%': {
            width: '14px',
            left: 'calc(50% - 10px)',
            'border-radius': '9px 8px 8px 9px / 12px 12px 12px 12px',
          },
          '45%': {
            width: '35px',
            left: 'calc(50% + 15px)',
            'border-radius': '23px 12px 12px 23px / 12px 12px 12px 12px',
          },
          '55%': {
            width: '35px',
            left: 'calc(50% + 24px)',
            'border-radius': '12px 23px 23px 12px / 12px 12px 12px 12px',
          },
          '80%': {
            width: '16px',
            left: 'calc(100% - 3px)',
            'border-radius': '9px 8px 8px 9px / 12px 12px 12px 12px',
          },
          '100%': {
            width: '24px',
            left: 'calc(100% - 3px)',
          },
        },
      },
      animation: {
        'slide-right-toggle': 'slide-right-toggle 0.7s linear',
        'slide-left-toggle': 'slide-right-toggle 0.7s linear reverse'
      }
    },
  },
  plugins: [],
};