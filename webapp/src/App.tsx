import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import React from "react";
import "./App.css";
import SearchAppBar from "./views/dashboard";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchAppBar />
    </ThemeProvider>
  );
};

export default App;
