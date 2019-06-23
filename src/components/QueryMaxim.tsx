import * as React from 'react';
import { Grid, Button, Divider, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import ConvertMarkdown from './Markdown';
import gql from 'graphql-tag';
import { getRandomMaxim } from '../graphql/queries';
import { Query } from 'react-apollo';
import { isEmpty as _isEmpty } from 'lodash-es';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ShareMaxim } from '../routes/maxim/shareMaxim';

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

	const [maxim, setMaxim] = React.useState<string>('');
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

	function previousMaxim(maxim: string) {
		let numberedMaxim = parseInt(maxim, 10);
		setMaxim(stringifyNumberedMaxim(numberedMaxim - 1));
	}

	function nextMaxim(maxim: string) {
		let numberedMaxim = parseInt(maxim, 10);
		setMaxim(stringifyNumberedMaxim(numberedMaxim + 1));
	}

	React.useEffect(() => {
		setMaxim(getRandomNumber(1, 290));
	}, []);

	const [open, setOpen] = React.useState<boolean>(false);
	React.useEffect(() => {
		setOpen(true);
	}, [media]);

	const GET_RANDOM_MAXIM = gql(getRandomMaxim);

	return (
		<>
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
								return null;
							}
						}}
					</Query>
				)}
				<Divider className={classes.root} />
				<Grid
					container
					direction={'row'}
					alignItems={'center'}
					justify={'space-around'}>
					<Button onClick={() => previousMaxim(maxim)}>
						<KeyboardArrowLeft />
					</Button>
					<Button
						variant={'contained'}
						color={'primary'}
						onClick={() => setMaxim(getRandomNumber(1, 290))}>
						{'Random Maxim'}
					</Button>
					<Button onClick={() => nextMaxim(maxim)}>
						<KeyboardArrowRight />
					</Button>
				</Grid>
			</Grid>
			<ShareMaxim
				openModal={open}
				media={media}
				closeModal={() => setOpen(false)}
			/>
		</>
	);
};

export { QueryMaxim };

interface IProps {
	media: string;
}
