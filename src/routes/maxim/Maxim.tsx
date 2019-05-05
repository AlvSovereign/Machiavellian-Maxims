import * as React from 'react';
import Axios from 'axios';
import { Grid } from '@material-ui/core';
import MaximApi from '../../api/client';
import Markdown from '../../components/Markdown';

const Maxim = (props: IProps) => {
	const [maxim, setMaxim] = React.useState('');

	//fetch maxim
	React.useEffect(() => {
		// fetchMaxim();
		(async () => {
			const fetchMaximKey: any = await MaximApi.fetchMaxim({ baseUrl: '' });
			const getMaxim = await Axios.get(`maxims/${fetchMaximKey.maxim}.md`);
			setMaxim(getMaxim.data);
		})();
	}, [maxim]);

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
				<Markdown>{maxim}</Markdown>
			</Grid>
		</Grid>
	);
};

export default Maxim;

interface IProps {}
