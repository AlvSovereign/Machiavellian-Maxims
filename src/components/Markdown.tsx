import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { Typography, Link } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';

const ConvertMarkdown = (props: IProps) => {
	const theme: any = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down('sm'));
	const useStyles = makeStyles({
		root: {
			'&:before': {
				content: 'open-quote',
				position: 'absolute',
				color: theme.palette.secondary.main,
				fontSize: '7.5em',
				fontWeight: 700,
				lineHeight: 1,
				opacity: 0.2,
				zIndex: -10
			}
		},
		content: {
			lineHeight: mobile ? 1.5 : 2
		}
	});
	const classes = useStyles(props);

	const options = {
		overrides: {
			h2: {
				component: (props: any) => (
					<Typography
						gutterBottom
						variant={mobile ? 'h5' : 'h4'}
						align={'right'}
						color={'primary'}
						{...props}
					/>
				)
			},
			p: {
				props: {
					className: classes.root
				},
				component: (props: any) => (
					<Typography gutterBottom align={'center'} variant={'h5'} {...props} />
				)
			},
			span: {
				props: {
					className: `${classes.root} ${classes.content}`
				},
				component: (props: any) => (
					<Typography
						gutterBottom
						align={mobile ? 'center' : 'left'}
						variant={mobile ? 'h6' : 'h5'}
						component={'p'}
						{...props}
					/>
				)
			},
			a: {
				component: (props: any) => (
					<Link href={props.href} target={'_blank'}>
						{props.children}
					</Link>
				)
			}
		}
	};

	return <Markdown options={options} {...props} />;
};

export default ConvertMarkdown;

interface IProps {
	children: any;
	fontStyle?: 'serif';
}
