import * as React from 'react';
import { Grid, Button, Divider, Fab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Add, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import MaximApi from '../../api/client';
import ConvertMarkdown from '../../components/Markdown';

const Maxim = (props: IProps) => {
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
			bottom: theme.spacing.unit * 2,
			right: theme.spacing.unit * 2,
			margin: theme.spacing.unit
		}
	});
	const classes = useStyles();

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
			className={classes.grid}
		>
			<Grid item xs={10}>
				<ConvertMarkdown>{maxim.title}</ConvertMarkdown>
				<ConvertMarkdown fontStyle={'serif'}>{maxim.text}</ConvertMarkdown>
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
					<Button variant={'contained'} color={'primary'} onClick={fetchMaxim}>
						{'Random Maxim'}
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

export default Maxim;

interface IProps {}
