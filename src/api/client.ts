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

function getRandomFloat(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}
const MaximApi = {
	fetchRandomMaxim: async ({ baseUrl }: MaximApiArgs): Promise<object> => {
		try {
			const randomNumber: number = getRandomFloat(1, 5);
			const response: any = await clientApi({ baseUrl }).get(
				'maxims/maxims.json'
			);
			const returnedMaxim = response.data.maxims.filter(
				(maxim: string, index: number) =>
					randomNumber === index ? maxim : null
			);

			const maxim = {
				number: returnedMaxim[0].number,
				text: returnedMaxim[0].text
			};

			return maxim;
		} catch (error) {
			console.error(error);
			return error;
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
