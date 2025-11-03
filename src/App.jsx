import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>

    </div>
  );
}
export default App;