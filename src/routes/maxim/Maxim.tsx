import * as React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { QueryMaxim } from '../../components/QueryMaxim';

const Maxim: React.FC<IProps> = props => {
	const useStyles = makeStyles({
		root: {
			margin: '2em 0'
		},
		grid: {
			width: '100%',
			maxWidth: 720
		}
	});
	const classes = useStyles();

	return (
		<Grid
			container
			direction={'column'}
			alignItems={'center'}
			justify={'center'}
			className={classes.grid}>
			<QueryMaxim />
		</Grid>
	);
};

export default Maxim;

interface IProps {}
