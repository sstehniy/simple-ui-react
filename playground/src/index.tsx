import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		background-color: lightcyan;
	}

	body{
		width: 100vw;
		height: 100vh;
	}
`;

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<GlobalStyle />
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
