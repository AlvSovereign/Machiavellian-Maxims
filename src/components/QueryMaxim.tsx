import * as React from 'react';
import {
	Grid,
	Button,
	Divider,
	CircularProgress,
	Typography
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import ConvertMarkdown from './Markdown';
import gql from 'graphql-tag';
import { getRandomMaxim } from '../graphql/queries';
import { Query } from 'react-apollo';
import { isEmpty as _isEmpty } from 'lodash-es';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ShareMaxim } from './ShareMaxim';

const QueryMaxim: React.FC<IProps> = ({ media }) => {
	const theme: any = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down('sm'));
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
		},
		serif: {
			fontFamily: 'CalendasPlus, serif',
			lineHeight: mobile ? 1.5 : 2
		}
	});
	const classes = useStyles();

	const [maxim, setMaxim] = React.useState<Maxim | null>(null);

	const [maximNumber, setMaximNumber] = React.useState<string>('');
	function stringifyNumberedMaxim(maximIndex: number) {
		let float = maximIndex;
		let floatString;

		if (float === 0) {
			float = 290;
		}

		if (float === 291) {
			float = 1;
		}

		if (float < 100) {
			floatString = `0${float}`;
		}

		if (float < 10) {
			floatString = `00${float}`;
		}

		return `${floatString || float}`;
	}

	function getRandomNumber(min: number, max: number) {
		const randomNumber = Math.floor(Math.random() * (max - min) + min);
		return stringifyNumberedMaxim(randomNumber);
	}

	function previousMaxim(maximNumber: string) {
		let numberedMaxim = parseInt(maximNumber, 10);
		setMaximNumber(stringifyNumberedMaxim(numberedMaxim - 1));
	}

	function nextMaxim(maximNumber: string) {
		let numberedMaxim = parseInt(maximNumber, 10);
		setMaximNumber(stringifyNumberedMaxim(numberedMaxim + 1));
	}

	React.useEffect(() => {
		setMaximNumber(getRandomNumber(1, 290));
	}, []);

	const [open, setOpen] = React.useState<boolean>(false);
	React.useEffect(() => {
		setOpen(true);
	}, [media]);

	const GET_RANDOM_MAXIM = gql(getRandomMaxim);

	return (
		<>
			<Grid item xs={10}>
				{maximNumber && (
					<Query query={GET_RANDOM_MAXIM} variables={{ index: maximNumber }}>
						{({ loading, error, data }: any) => {
							if (loading) {
								return (
									<Grid
										container
										direction={'row'}
										alignItems={'center'}
										justify={'center'}>
										<Grid item xs={12}>
											<CircularProgress />
										</Grid>
									</Grid>
								);
							}

							if (error) {
								console.error(error);
								return (
									<Grid
										container
										direction={'row'}
										alignItems={'center'}
										justify={'center'}>
										<Grid item xs={12}>
											<Typography
												gutterBottom
												align={'center'}
												variant={mobile ? 'h6' : 'h5'}
												component={'p'}>
												Error! Cannot find Maxim.
											</Typography>
										</Grid>
									</Grid>
								);
							}

							if (data && !_isEmpty(data.getRandomMaxim)) {
								const { maxim, name } = data.getRandomMaxim;

								setMaxim(data.getRandomMaxim);
								return (
									<div>
										<ConvertMarkdown>{name}</ConvertMarkdown>
										<ConvertMarkdown>{maxim}</ConvertMarkdown>
									</div>
								);
							} else {
								return null;
							}
						}}
					</Query>
				)}
				<Divider className={classes.root} />
			</Grid>
			<Grid
				container
				direction={'row'}
				alignItems={'center'}
				justify={'space-around'}>
				<Button onClick={() => previousMaxim(maximNumber)}>
					<KeyboardArrowLeft />
				</Button>
				<Button
					variant={'contained'}
					color={'primary'}
					onClick={() => setMaximNumber(getRandomNumber(1, 290))}>
					{'Random Maxim'}
				</Button>
				<Button onClick={() => nextMaxim(maximNumber)}>
					<KeyboardArrowRight />
				</Button>
			</Grid>
			{maxim && maxim.name && maxim.maxim && (
				<ShareMaxim
					media={media}
					maxim={maxim}
					openModal={open}
					closeModal={() => setOpen(false)}
				/>
			)}
		</>
	);
};

export { QueryMaxim };

interface IProps {
	media: string;
}

type Maxim = {
	name: string;
	maxim: string;
};
