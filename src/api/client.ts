import axios from 'axios';

const clientApi = ({ baseUrl = '' }: ClientApiArgs) => {
	// We have passed in user credentials from Redux store from the component, YUCK!
	// At some pont we won't need Redux...
	const config = {
		baseURL: baseUrl, //<- Gotcha here, needs to be 'baseURL', not 'baseUrl!!
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const axiosInstance = axios.create(config);

	// Add a request interceptor
	axiosInstance.interceptors.request.use(
		config => {
			return config;
		},

		error => {
			console.error(error);
			return Promise.reject(new Error(error));
		}
	);

	// Add a response interceptor
	axiosInstance.interceptors.response.use(
		// No need to return the whole response here, we're just interested in the data
		response => response.data,
		error => {
			console.error(error);
			return Promise.reject(new Error(error));
		}
	);

	return axiosInstance;
};

const MaximApi = {
	fetchMaxim: async ({ baseUrl }: MaximApiArgs): Promise<object> => {
		try {
			const response = await clientApi({ baseUrl }).get('data.json');
			return response;
		} catch (error) {
			console.error(error);
			return { error };
		}
	}
};

export default MaximApi;

interface MaximApiArgs {
	baseUrl: string;
}

interface ClientApiArgs {
	baseUrl: string;
}
