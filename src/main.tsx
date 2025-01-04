import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import Wizard from "./Wizard.tsx";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#18151b",
      paper: "#121212",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg">
        <Wizard />
      </Container>
    </ThemeProvider>
  </StrictMode>,
);
