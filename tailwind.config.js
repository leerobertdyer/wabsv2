/** @type {import('tailwindcss').Config} */
export const content = [ './src/**/*.{js,jsx,ts,tsx}',];
export const theme = {
  extend: {
    colors: {
      wabsPurple: '#882A6C',
      wabsPurpleLight: '#A63F8C',
      wabsPurpleDark: '#6C1D4D',
      wabsSuccess: '#5FAD56',
      wabsLink: '#0075B2',
      wabsGray: '#7F7D7D',
      wabsGrayLight: '#E5E5E5',
      wabsSecondary: '#413620',
      wabsError: '#E31D1C'
    }
  },
};
export const plugins = [];