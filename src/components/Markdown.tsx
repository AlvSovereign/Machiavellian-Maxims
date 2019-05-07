import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { Typography, Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

const ConvertMarkdown = (props: IProps) => {
	const theme: any = useTheme();
	const useStyles = makeStyles({
		root: {
			'&:before': {
				content: 'open-quote',
				position: 'absolute',
				color: theme.palette.secondary.main,
				fontSize: '7.5em',
				fontWeight: 700,
				lineHeight: 0.7,
				opacity: 0.2,
				zIndex: -10
			}
		},
		serif: {
			fontFamily: 'CalendasPlus, serif'
		}
	});
	const classes = useStyles(props);

	const options = {
		overrides: {
			h2: {
				component: (props: any) => (
					<Typography
						gutterBottom
						variant={'h4'}
						align={'right'}
						color={'secondary'}
						{...props}
					/>
				)
			},
			p: {
				props: {
					className: classes.root
				},
				component: (props: any) => (
					<Typography gutterBottom variant={'h5'} {...props} />
				)
			},
			span: {
				props: {
					className: `${classes.root} ${classes.serif}`
				},
				component: (props: any) => (
					<Typography gutterBottom variant={'h5'} {...props} />
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
