'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#2198CE',
    },
    secondary: {  
      main: '#F7FBFF',
    },
    text: {
      primary: '#171717',
      secondary: '#FFF',

    },
    background: {
      default: '#F7FBFF',
    },
  },
});

export default theme;
