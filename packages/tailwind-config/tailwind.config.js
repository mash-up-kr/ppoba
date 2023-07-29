const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    '../ui/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'top-down-bounce': {
          '0%': {
            transform: 'translate(-50%, -25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translate(-50%, -0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 2, 1)',
          },
          '100%': {
            transform: 'translate(-50%, -25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          }
        },
        'slide-right-toggle': {
          '0%': {
            width: '24px',
            left: '50%',
          },
          '20%': {
            width: '14px',
            left: 'calc(50% - 10px)',
            'border-radius': '9px 8px 8px 9px / 12px 12px 12px 12px',
          },
          '40%': {
            width: '35px',
            left: 'calc(50% + 15px)',
            'border-radius': '23px 12px 12px 23px / 12px 12px 12px 12px',
          },
          '60%': {
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
        'slide-left-toggle': {
          '0%': {
            width: '24px',
            left: 'calc(100% - 3px)',
          },
          '20%': {
            width: '16px',
            left: 'calc(100% - 3px)',
            'border-radius': '9px 8px 8px 9px / 12px 12px 12px 12px',
          },
          '40%': {
            width: '35px',
            left: 'calc(50% + 24px)',
            'border-radius': '12px 23px 23px 12px / 12px 12px 12px 12px',
          },
          '60%': {
            width: '35px',
            left: 'calc(50% + 15px)',
            'border-radius': '23px 12px 12px 23px / 12px 12px 12px 12px',
          },
          '80%': {
            width: '14px',
            left: 'calc(50% - 10px)',
            'border-radius': '9px 8px 8px 9px / 12px 12px 12px 12px',
          },
          '100%': {
            width: '24px',
            left: '50%',
          },
        },
      },
      animation: {
        'slide-right-toggle': 'slide-right-toggle 0.4s linear',
        'slide-left-toggle': 'slide-left-toggle 0.4s linear',
        'top-down-bounce': 'top-down-bounce 1s infinite',
      },
      colors: {
        grey: {
          100: '#DFDFDF',
          200: '#C1C1C1',
          300: '#A5A5A5',
          400: '#8B8B8B',
          500: '#6F6F6F',
          600: '#555555',
          700: '#3D3D3D',
          800: '#242424',
        },
        blue: {
          '01': '#E0E3FF',
          '02': '#9FA9FF',
        },
        green: {
          '01': '#CFF3E9',
          '02': '#81E4BB',
        },
        yellow: {
          '01': '#FFF4BC',
          '02': '#FEDB61',
        },
        pink: {
          '01': '#FAE4FB',
          '02': '#F4B9F4',
        },
        alert: {
          red: '#E65C5C',
        },
        teal: {
          '01': '',
          '02': '#81E4BB',
        },
        purple: {
          '01': '',
          '02': '#B073FF',
        },
        red: {
          '01': '',
          '02': '#FD7B8A',
        },
        orange: {
          '01': '#FFE1C6',
          '02': '#FFA63F',
        },
        light: '#F7F7F7',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    plugin(function ({ addUtilities }) {
      const designSystemTextStyles = {
        // Headline
        '.headline-1': {
          'font-weight': 700,
          'font-size': '28px',
          'line-height': '140%',
          'letter-spacing': '-0.56px',
        },
        '.headline-2': {
          'font-weight': 700,
          'font-size': '24px',
          'line-height': '140%',
          'letter-spacing': '-0.24px'
        },
        '.headline-3': {
          'font-weight': 700,
          'font-size': '20px',
          'line-height': '145%',
          'letter-spacing': ' -0.2px'
        },
        '.headline-4': {
          'font-weight': 700,
          'font-size': '16px',
          'line-height': '150%',
          'letter-spacing': '-0.16px',
        },
        '.headline-5': {
          'font-weight': 700,
          'font-size': '14px',
          'line-height': '150%',
          'letter-spacing': '-0.14px',
        },

        // Subtitle
        '.subtitle-1': {
          'font-weight': 500,
          'font-size': '20px',
          'line-height': '150%',
          'letter-spacing': '-0.2px',
        },
        '.subtitle-2': {
          'font-weight': 500,
          'font-size': '16px',
          'line-height': '150%',
          'letter-spacing': '-0.16px',
        },
        '.subtitle-3': {
          'font-weight': 500,
          'font-size': '14px',
          'line-height': '150%',
          'letter-spacing': '-0.16px',
        },

        // Body
        '.body-1': {
          'font-weight': 400,
          'font-size': '16px',
          'line-height': '150%',
          'letter-spacing': '-0.16px',
        },
        '.body-2': {
          'font-weight': 400,
          'font-size': '14px',
          'line-height': '160%',
          'letter-spacing': '-0.5px',
        },

        // Caption
        '.caption': {
          'font-size': '12px',
          'font-weight': 400,
          'line-height': '150%',
          'letter-spacing': '-0.12px',
        },

        '.caption-bold': {
          'font-size': '12px',
          'font-weight': 700,
          'line-height': '150%',
          'letter-spacing': '-0.12px',
        },

        // Hide ScrollBar
        '.hide-scrollbar': {

        }
      };
      addUtilities(designSystemTextStyles);
    }),
  ],
};
