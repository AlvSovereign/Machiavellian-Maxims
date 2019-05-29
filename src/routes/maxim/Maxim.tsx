import * as React from 'react';
import {
	Grid,
	Button,
	Divider,
	Fab,
	CircularProgress
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Add, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import MaximApi from '../../api/client';
import ConvertMarkdown from '../../components/Markdown';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { listMaxims } from '../../graphql/queries';
import { client } from '../../index';
import { batchAddMaxims } from '../../graphql/mutations';
import API, { graphqlOperation } from '@aws-amplify/api';
import { graphqlMutation } from 'aws-appsync-react';

const Maxim: React.FC<IProps> = props => {
	const [maxim, setMaxims] = React.useState<Array<Maxims> | []>([]);
	const theme: any = useTheme();
	const useStyles = makeStyles({
		root: {
			margin: '2em 0'
		},
		grid: {
			maxWidth: 720
		},
		fab: {
			position: 'absolute',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			margin: theme.spacing(1)
		}
	});
	const classes = useStyles();

	// const fetchMaxim = async () => {
	// 	const response: any = await MaximApi.fetchRandomMaxim({
	// 		baseUrl: ''
	// 	});

	// 	setMaxim(response);
	// };

	//fetch maxim
	React.useEffect(() => {
		(async () => {
			const mutation = gql(batchAddMaxims);
			const maxims = [];

			// const result = await client.mutate({
			// 	mutation: mutation,
			// 	variables: {
			// 		maxims: maxims
			// 	}
			// });
		})();
	}, []);

	return (
		<Grid
			container
			direction={'column'}
			alignItems={'center'}
			justify={'center'}
			className={classes.grid}
		>
			<Grid item xs={10}>
				{props.maxims.map(maxim => (
					<div key={maxim.id}>
						<ConvertMarkdown>{maxim.name}</ConvertMarkdown>
						<ConvertMarkdown fontStyle={'serif'}>
							{maxim.content}
						</ConvertMarkdown>
					</div>
				))}
				<Divider className={classes.root} />
				<Grid
					container
					direction={'row'}
					alignItems={'center'}
					justify={'space-around'}
				>
					{/* <Grid item xs={10}> */}
					<Button>
						<KeyboardArrowLeft />
					</Button>
					{/* <Button variant={'contained'} color={'primary'} onClick={fetchMaxim}>
						{'Random Maxim'}
					</Button> */}
					<Button
						variant={'contained'}
						color={'primary'}
						onClick={props.batchAddMaxims}
					>
						{'Add Maxim'}
					</Button>
					<Button>
						<KeyboardArrowRight />
					</Button>
					{/* </Grid> */}
				</Grid>
			</Grid>
			<Fab color='primary' aria-label='Add' className={classes.fab}>
				<Add />
			</Fab>
		</Grid>
	);
};

const fetchMaxims = async () => {
	const result: any = await MaximApi.fetchAllMaxims({
		baseUrl: ''
	});

	return result.maxims;
};

export default compose(
	graphql(gql(listMaxims), {
		props: (props: any) => ({
			maxims: props.data.listMaxims ? props.data.listMaxims.items : []
		})
	})
)(Maxim);

interface IProps {
	maxims: Array<Maxims>;
	batchAddMaxims: () => void;
	client: any;
}

interface Maxims {
	__typename: string;
	id: string;
	name: string;
	content: string;
}
