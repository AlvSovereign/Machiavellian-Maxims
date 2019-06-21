import * as React from 'react';
import { Grid, Fab } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Share } from '@material-ui/icons';
import { QueryMaxim } from '../../components/QueryMaxim';
import { ShareMaxim } from './shareMaxim';

const Maxim: React.FC<IProps> = props => {
	const theme: any = useTheme();
	const useStyles = makeStyles({
		root: {
			margin: '2em 0'
		},
		grid: {
			width: 720
		},
		fab: {
			position: 'absolute',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
			margin: theme.spacing(1)
		}
	});
	const classes = useStyles();

	function share() {
		const mediaDimensions = ShareMaxim.getDimensions({
			media: 'InstagramFeed'
		});
		const imageCreation = ShareMaxim.createImage({
			dimensions: mediaDimensions,
			text:
				'In social matters, people do not reward he who is most logical, but rather he who is most impressive.'
		});
		console.log('imageCreation: ', imageCreation);
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
				onClick={() => share()}>
				<Share />
			</Fab>
		</Grid>
	);
};

export default Maxim;

interface IProps {}
