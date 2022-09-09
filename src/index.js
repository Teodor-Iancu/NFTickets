import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./pages/reservation.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <Router basename="/"> {/* // basename="/nft-ticket"  // if use from a sub-directory on apache server*/}
                <App />
            </Router>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
