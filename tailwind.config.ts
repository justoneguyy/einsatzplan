import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    colors: ({ colors }) => ({
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      black: colors.black,
      white: colors.white,
      green: {
        100: colors.green[100],
        500: colors.green[500],
        700: colors.green[700],
        800: colors.green[800],
        900: colors.green[900],
        950: colors.green[950],
      },
      red: {
        50: colors.red[50],
        100: colors.red[100],
        200: colors.red[200],
        300: colors.red[300],
        400: colors.red[400],
        500: colors.red[500],
        600: colors.red[600],
        700: colors.red[700],
        800: colors.red[800],
        900: colors.red[900],
        950: colors.red[950],
      },
      yellow: {
        100: colors.yellow[100],
        500: colors.yellow[500],
        900: colors.yellow[900],
      },
      blue: {
        100: colors.blue[100],
        500: colors.blue[500],
        900: colors.blue[900],
      },
      pink: {
        100: colors.pink[100],
        500: colors.pink[500],
        900: colors.pink[900],
      },
      transparent: colors.transparent,
      inherit: colors.inherit,
      current: colors.current,
    }),
    fontFamily: {
      sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      // mono: ["var(--font-mono)", ...fontFamily.mono],
    },
    borderRadius: {
      sm: 'calc(var(--radius) - 4px)',
      md: 'calc(var(--radius) - 2px)',
      lg: 'var(--radius)',
      full: '9999px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
    extend: {
      boxShadow: {
        inset: 'inset 0 0 0 1px hsl(var(--border))',
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      zIndex: {
        '100': '100',
        '9999': '9999',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      transitionDuration: {
        '400': '400ms',
      },
      height: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
