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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { _listMaxims } from '../../graphql/queries';
import { RouteComponentProps } from 'react-router';

const Maxim: React.FC<IProps> = props => {
	const [maxim, setMaxim] = React.useState();
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
		// fetchMaxim();
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
					<>
						<ConvertMarkdown>{maxim.name}</ConvertMarkdown>
						<ConvertMarkdown fontStyle={'serif'}>
							{maxim.content}
						</ConvertMarkdown>
					</>
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

export default graphql(gql(_listMaxims), {
	props: (props: any) => ({
		maxims: props.data.listMaxims ? props.data.listMaxims.items : []
	})
})(Maxim);

interface IProps {
	maxims: Array<Mixims>;
}

interface Mixims {
	__typename: string;
	id: string;
	name: string;
	content: string;
}
