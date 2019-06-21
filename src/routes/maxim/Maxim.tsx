import * as React from 'react';
import { Grid, Fab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Share } from '@material-ui/icons';
import { QueryMaxim } from '../../components/QueryMaxim';
import html2canvas from 'html2canvas';

const Maxim: React.FC<IProps> = props => {
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

	function shareMaxim() {
		html2canvas(document.body).then(function(canvas) {
			console.log('canvas: ', canvas);
			document.body.appendChild(canvas);
		});
	}

	return (
		<Grid
			container
			direction={'column'}
			alignItems={'center'}
			justify={'center'}
			className={classes.grid}>
			<QueryMaxim />
			<Fab
				color='primary'
				aria-label='Add'
				className={classes.fab}
				onClick={() => shareMaxim()}>
				<Share />
			</Fab>
		</Grid>
	);
};

export default Maxim;

interface IProps {}
