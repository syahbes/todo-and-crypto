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
  },
});

export default theme;
