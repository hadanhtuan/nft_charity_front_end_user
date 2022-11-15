import { createTheme } from "@mui/material";
// create custom dark theme pallete

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1a1a1a",
      light: "#1a1a1a",
      dark: "#1a1a1a",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1a1a1a",
      light: "#1a1a1a",
      dark: "#1a1a1a",
      contrastText: "#fff",
    },
    background: {
      default: "#1a1a1a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});
