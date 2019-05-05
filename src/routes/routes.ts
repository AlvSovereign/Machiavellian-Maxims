import Maxim from './maxim/Maxim';
import ErrorPage from './error-page/ErrorPage';

const routes: IRoutes = {
	maxim: {
		path: '/',
		component: Maxim
	},
	invalidPage: {
		component: ErrorPage
	}
};

export default routes;

interface IRoutes {
	[routeReference: string]: IRoute;
}

interface IRoute {
	path?: string;
	component: any;
}
