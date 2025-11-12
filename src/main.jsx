import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<HelmetProvider>
			<AuthProvider>
				<RouterProvider router={router}></RouterProvider>
				<ToastContainer></ToastContainer>
			</AuthProvider>
		</HelmetProvider>
	</StrictMode>
);
