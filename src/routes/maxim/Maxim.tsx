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
import ConvertMarkdown from '../../components/Markdown';
import gql from 'graphql-tag';
import { getRandomMaxim } from '../../graphql/queries';
import { Query } from 'react-apollo';
import { isEmpty as _isEmpty } from 'lodash-es';

const Maxim: React.FC<IProps> = props => {
	const [maxim, setMaxim] = React.useState<string>('');
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

	const getRandomNumber = (min: number, max: number) => {
		const random = Math.floor(Math.random() * (max - min) + min);
		if (random < 100) {
			return `0${random}`
		}
		if (random < 10) {
			return `00${random}`
		}
		return `${random}`
	};

	React.useEffect(() => {
		setMaxim(getRandomNumber(0, 290));
	}, []);
	const GET_RANDOM_MAXIM = gql(getRandomMaxim);

	return (
		<Grid
			container
			direction={'column'}
			alignItems={'center'}
			justify={'center'}
			className={classes.grid}
		>
			<Grid item xs={10}>
				{maxim && (
					<Query query={GET_RANDOM_MAXIM} variables={{ index: maxim }}>
						{({ loading, error, data }: any) => {
							if (loading) {
								return <CircularProgress />;
							}

							if (error) {
								console.error(error);
								return `Error! ${error.message}`;
							}

							if (data && !_isEmpty(data.getRandomMaxim)) {
								const { maxim, name } = data.getRandomMaxim;

								return (
									<div>
										<ConvertMarkdown>{name}</ConvertMarkdown>
										<ConvertMarkdown>{maxim}</ConvertMarkdown>
									</div>
								);
							} else {
								return null
							}
						}}
					</Query>
				)}
				<Divider className={classes.root} />
				<Grid
					container
					direction={'row'}
					alignItems={'center'}
					justify={'space-around'}
				>
					<Grid item xs={10}>
						<Button>
							<KeyboardArrowLeft />
						</Button>
						<Button
							variant={'contained'}
							color={'primary'}
							onClick={() =>setMaxim(getRandomNumber(0, 290))}
						>
							{'Random Maxim'}
						</Button>
						<Button>
							<KeyboardArrowRight />
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Fab color='primary' aria-label='Add' className={classes.fab}>
				<Add />
			</Fab>
		</Grid>
	);
};

export default Maxim;

interface IProps {
	maxims: Array<Maxims>;
	batchAddMaxims: () => void;
	client: any;
}

interface Maxims {
	__typename: string;
	id: string;
	name: string;
	nuimber: string;
	maxim: string;
}
