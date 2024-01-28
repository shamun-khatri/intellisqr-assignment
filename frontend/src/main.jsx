import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, MantineProvider } from "@mantine/core";
import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const theme = createTheme({
    /** Put your mantine theme override here */
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} >
    <App />
  </MantineProvider>
);
