import {
  amber,
  amberDark,
  blue,
  blueDark,
  green,
  greenDark,
  red,
  redDark,
  sage,
  sageDark,
  teal,
  tealDark,
} from '@radix-ui/colors';
import type { Config } from 'tailwindcss';
import twAnimatePlugin from 'tailwindcss-animate';

function convertRadixColorsToTailwind(colors: Record<string, string>, prefix?: string) {
  return Object.entries(colors).reduce(
    (acc, [key, value]) => {
      acc[prefix ? `${prefix}-${key}` : key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    colors: {
      ...convertRadixColorsToTailwind(amber),
      ...convertRadixColorsToTailwind(amberDark, 'dark'),
      ...convertRadixColorsToTailwind(blue),
      ...convertRadixColorsToTailwind(blueDark, 'dark'),
      ...convertRadixColorsToTailwind(green),
      ...convertRadixColorsToTailwind(greenDark, 'dark'),
      ...convertRadixColorsToTailwind(red),
      ...convertRadixColorsToTailwind(redDark, 'dark'),
      ...convertRadixColorsToTailwind(sage),
      ...convertRadixColorsToTailwind(sageDark, 'dark'),
      ...convertRadixColorsToTailwind(teal),
      ...convertRadixColorsToTailwind(tealDark, 'dark'),
    },
    container: {
      center: true,
      padding: '2rem',
    },
    keyframes: {
      'collapse-down': {
        '0%': { height: '0' },
        '100%': { height: 'var(--radix-collapsible-content-height)' },
      },
      'collapse-up': {
        '0%': { height: 'var(--radix-collapsible-content-height)' },
        '100%': { height: '0' },
      },
    },
    animation: {
      'collapse-down': 'collapse-down 300ms ease-out',
      'collapse-up': 'collapse-up 300ms ease-out',
    },
    extend: {
      backgroundImage({ theme }) {
        return {
          brushed: `
          repeating-linear-gradient(80deg, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%, .1) 7.5%),
          repeating-linear-gradient(80deg, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   4%, hsla(0,0%,  0%,.03) 4.5%),
          repeating-linear-gradient(80deg, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.15) 2.2%),
          linear-gradient(180deg,
            ${theme('colors.teal4')} 0%,
            ${theme('colors.teal2')} 67%,
            ${theme('colors.teal4')} 73%,
            ${theme('colors.teal5')} 100%);`,
        };
      },
    },
  },
  plugins: [twAnimatePlugin],
};
export default config;
