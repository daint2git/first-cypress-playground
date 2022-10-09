// import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/TodoApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
    <App />
    {/* </ChakraProvider> */}
  </React.StrictMode>
);