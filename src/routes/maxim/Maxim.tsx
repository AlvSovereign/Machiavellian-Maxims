import * as React from 'react';
import { Grid, Fab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Share } from '@material-ui/icons';
import { QueryMaxim } from '../../components/QueryMaxim';

const Maxim: React.FC<IProps> = props => {
	const theme: any = useTheme();
	const useStyles = makeStyles({
		root: {
			margin: '2em 0'
		},
		grid: {
			width: '100%',
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

	const [media, setMedia] = React.useState<string>('');
	function displayShare(name: string) {
		setMedia(name);
	}

	return (
		<Grid
			container
			direction={'column'}
			alignItems={'center'}
			justify={'center'}
			className={classes.grid}>
			<QueryMaxim media={media} />
			<Fab
				color='primary'
				aria-label='Add'
				className={classes.fab}
				onClick={() => displayShare('InstagramFeed')}>
				<Share />
			</Fab>
		</Grid>
	);
};

export default Maxim;

interface IProps {}
