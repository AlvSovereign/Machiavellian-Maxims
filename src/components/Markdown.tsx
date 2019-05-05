import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { Typography, Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

const ConvertMarkdown = (props: any) => {
	console.log('props: ', props);
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
				opacity: 0.3,
				zIndex: -10
			}
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
			a: {
				component: (props: any) => (
					<Typography gutterBottom variant={'h5'} {...props}>
						<Link href={props.href} target={'_blank'}>
							{props.children}
						</Link>
					</Typography>
				)
			}
		}
	};

	return <Markdown options={options} {...props} />;
};

export default ConvertMarkdown;
