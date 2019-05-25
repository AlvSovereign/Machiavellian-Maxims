import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes/routes';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
	palette: {
		primary: { main: red.A700 }
	},
	typography: {
		fontFamily:
			'Geomanist, "CalendasPlus", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@fontFamily': `GeomanistLight,	GeomanistRegular,	GeomanistMedium, CalendasPlus`
			}
		}
	}
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Route
					exact
					path={routes.maxim.path}
					component={routes.maxim.component}
				/>
				{/* <Route component={routes.invalidPage.component} /> */}
			</Router>
		</ThemeProvider>
	);
}

// export default withAuthenticator(App, true);
export default App;
