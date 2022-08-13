import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import React from "react";
import "./App.css";
import SearchAppBar from "./views/dashboard";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";

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
      <BrowserRouter>
        <SearchAppBar />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
