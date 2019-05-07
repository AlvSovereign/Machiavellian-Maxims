import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import {
	CalendasPlus,
	GeomanistLight,
	GeomanistRegular,
	GeomanistMedium
} from './assets/fonts/fonts';
import './index.css';

const theme = createMuiTheme({
	palette: {
		secondary: { main: red.A700 }
	},
	typography: {
		fontFamily:
			'Geomanist, CalendasPlus, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@fontFamily': [
					GeomanistLight,
					GeomanistRegular,
					GeomanistMedium,
					CalendasPlus
				]
			}
		}
	}
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
