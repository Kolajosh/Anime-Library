import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/Routes";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  const theme = createTheme();
  useEffect(() => {
    AOS.init({
      disableMutationObserver: false,
      mirror: false,
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
