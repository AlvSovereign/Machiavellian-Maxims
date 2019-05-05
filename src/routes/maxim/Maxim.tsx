import * as React from 'react';
import { Grid } from '@material-ui/core';
import MaximApi from '../../api/client';
import ConvertMarkdown from '../../components/Markdown';

const Maxim = (props: IProps) => {
	const [maxim, setMaxim] = React.useState();
	console.log('maxim: ', maxim);

	const fetchMaxim = async () => {
		const response: any = await MaximApi.fetchRandomMaxim({
			baseUrl: ''
		});

		setMaxim(response);
	};

	//fetch maxim
	React.useEffect(() => {
		fetchMaxim();
	}, []);

	if (!maxim) {
		return 'Loading';
	}

	return (
		<Grid
			container
			direction={'column'}
			alignItems={'center'}
			justify={'center'}
		>
			<Grid item xs={10}>
				<ConvertMarkdown>{maxim.title}</ConvertMarkdown>
				<ConvertMarkdown>{maxim.text}</ConvertMarkdown>
			</Grid>
		</Grid>
	);
};

export default Maxim;

interface IProps {}
