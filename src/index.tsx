import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<ThemeProvider theme={theme}>
		<HashRouter>
			<Provider store={store}>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</Provider>
		</HashRouter>
	</ThemeProvider>
);
