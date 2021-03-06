import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import AWSAppSyncClient from 'aws-appsync';
import AppSyncConfig from './aws-exports';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react'; // this needs to also be installed when working with React

export const client = new AWSAppSyncClient({
	url: AppSyncConfig.aws_appsync_graphqlEndpoint,
	region: AppSyncConfig.aws_appsync_region,
	auth: {
		type: AppSyncConfig.aws_appsync_authenticationType,
		apiKey: AppSyncConfig.aws_appsync_apiKey
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Rehydrated>
			<App />
		</Rehydrated>
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
