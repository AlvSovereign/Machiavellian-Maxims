import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes/routes';

function App() {
	return (
		<Router>
			<Route
				exact
				path={routes.maxim.path}
				component={routes.maxim.component}
			/>
			{/* <Route component={routes.invalidPage.component} /> */}
		</Router>
	);
}

export default App;
