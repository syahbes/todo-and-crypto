"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#2198CE",
    },
    secondary: {
      main: "#F7FBFF",
    },
    text: {
      primary: "#171717",
      secondary: "#8A8B8D",
    },
    background: {
      default: "#F7FBFF",
    },
  },
});

export default theme;
