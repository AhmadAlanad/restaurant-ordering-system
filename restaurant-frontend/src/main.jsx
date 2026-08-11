import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { AddressProvider } from "./context/AddressContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
	    <AuthProvider>
		<AddressProvider>
    		    <CartProvider>
        		<App />
    		    </CartProvider>
		</AddressProvider>
	    </AuthProvider>
	</BrowserRouter>
    </React.StrictMode>
);