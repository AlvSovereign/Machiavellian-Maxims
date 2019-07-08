import React from 'react';
import Konva from 'konva';
import {
	Dialog,
	Button,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	CircularProgress
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/styles';
import imageSizes from '../utils/image-sizes';
import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';
import FontFaceObserver from 'fontfaceobserver';

const _ShareMaxim: React.FC<IProps> = ({
	maxim = null,
	openModal = false,
	closeModal = () => {}
}) => {
	const [dimensions, setDimensions] = React.useState<TDimensions | null>(null);
	const theme: any = useTheme();
	const useStyles = makeStyles({
		formControl: {
			margin: theme.spacing(3)
		},
		group: {
			margin: theme.spacing(1, 0)
		}
	});
	const classes = useStyles();

	// Load our custom font first and control rendering of the canvas.
	// This solves the issue of the canvas rendering before the custom
	// font has been loaded, thus showing the back up 'Times' font instead.
	const [fontReady, setFontReady] = React.useState<boolean>(false);
	function loadFont() {
		const font = new FontFaceObserver('CalendasPlus');

		font.load().then(() => {
			setFontReady(true);
		});
	}

	React.useEffect(() => {
		loadFont();
	}, [fontReady]);

	function sanitiseText(maximText: string) {
		const plainTextRenderer = new PlainTextRenderer();
		// this is custom to not include 'whitespace' that
		// PlainTextRenderer adds by default
		plainTextRenderer.paragraph = (text: string) => text;
		const newText = marked(maximText, { renderer: plainTextRenderer });

		if (newText.includes('&amp;')) {
			return newText.replace('&amp;', '&');
		} else {
			return newText;
		}
	}

	const [canvasImage, setCanvasImage] = React.useState<any>(null);
	function createCanvas() {
		if (!dimensions) {
			return;
		}
		const stage = new Konva.Stage({
			container: 'canvas-container',
			height: dimensions.height,
			width: dimensions.width
		});
		const layer = new Konva.Layer();

		stage.add(layer);

		const background = new Konva.Rect({
			fill: 'white',
			height: dimensions.height,
			width: dimensions.width,
			x: 0,
			y: 0
		});

		layer.add(background);

		const group = new Konva.Group({
			absolutePosition: {
				x: 0,
				y: -28
			}
		});

		layer.add(group);

		const content = new Konva.Text({
			align: 'center',
			fontSize: 24,
			fontFamily: 'CalendasPlus',
			lineHeight: 2,
			text: sanitiseText(maxim!.maxim),
			verticalAlign: 'middle',
			width: dimensions.width / 2,
			wrap: 'word'
		});

		const contentRect: ClientRect = content.getClientRect(null);
		content.x(dimensions.width / 2 - contentRect.width / 2);
		content.y(dimensions.height / 2 - contentRect.height / 2);
		const updatedContentRect: ClientRect = content.getClientRect(null);

		group.add(content);

		const quote = new Konva.Text({
			fill: theme.palette.primary.main,
			fontFamily: 'CalendasPlus',
			fontSize: 224,
			opacity: 0.2,
			text: '“',
			x: updatedContentRect.x,
			y: updatedContentRect.y,
			zIndex: 0
		});
		group.add(quote);

		const title = new Konva.Text({
			align: 'right',
			fill: theme.palette.primary.main,
			fontFamily: 'CalendasPlus',
			fontSize: 34,
			lineHeight: 2,
			text: sanitiseText(maxim!.name),
			verticalAlign: 'top',
			width: dimensions.width / 2,
			x: dimensions.width / 2 - contentRect.width / 2,
			y: updatedContentRect.y - 33
		});

		group.add(title);

		const hr = new Konva.Rect({
			align: 'center',
			fill: theme.palette.primary.main,
			height: 1,
			width: dimensions.width / 4,
			y: updatedContentRect.y + updatedContentRect.height + 56
		});
		const hrRect = hr.getClientRect(null);

		hr.x(dimensions.width / 2 - hrRect.width / 2);

		group.add(hr);

		const tagline = new Konva.Text({
			align: 'center',
			fill: 'rgba(0, 0, 0, 0.54',
			fontFamily: 'CalendasPlus',
			fontSize: 30,
			lineHeight: 2,
			text: 'ILLIMUTABLEMEN.COM',
			verticalAlign: 'middle',
			width: dimensions.width / 2,
			y: hrRect.y + 28
		});
		const taglineRect = tagline.getClientRect(null);

		tagline.x(dimensions.width / 2 - taglineRect.width / 2);

		group.add(tagline);

		setCanvasImage(stage.toDataURL({ pixelRatio: 4 }));
		setLoadingCanvas(false);

		return () => {
			stage.destroy();
		};
	}

	const [size, setSize] = React.useState<string>('default');
	const [loadingCanvas, setLoadingCanvas] = React.useState<boolean>(false);
	function handleChange(event: React.ChangeEvent<unknown>) {
		event.persist();
		setLoadingCanvas(true);
		const sizeOption: SizeOption | undefined = imageSizes.find(
			size => size.id === (event.target as HTMLInputElement).value
		);
		if (!sizeOption) {
			return;
		}
		setSize(sizeOption.id);
		const { height, width } = sizeOption;

		setDimensions({ height, width });
	}

	React.useEffect(() => {
		createCanvas();
	}, [dimensions]);

	function handleClose() {
		setCanvasImage(null);
		setSize('default');
		closeModal();
	}

	return (
		<Dialog fullWidth open={openModal} onClose={handleClose}>
			<DialogTitle id='alert-dialog-title'>
				{'Choose your social media image'}
			</DialogTitle>
			<DialogContent dividers>
				<FormControl component='fieldset' className={classes.formControl}>
					<RadioGroup
						aria-label='Social Media Selection'
						name='selection'
						className={classes.group}
						value={size}
						onChange={handleChange}>
						{imageSizes.map(size => (
							<FormControlLabel
								key={size.id}
								label={size.label}
								value={size.id}
								control={<Radio />}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				{loadingCanvas ? (
					<CircularProgress />
				) : (
					<Button
						disabled={!canvasImage}
						color={'primary'}
						component={'a'}
						href={canvasImage}
						download>
						Download
					</Button>
				)}
			</DialogActions>
			<img
				id='canvas-container'
				src={canvasImage}
				style={{ display: 'none' }}
			/>
		</Dialog>
	);
};

export const ShareMaxim = _ShareMaxim;

interface IProps {
	maxim: Maxim;
	openModal: boolean;
	closeModal: () => void;
}

type TDimensions = {
	height: number;
	width: number;
};

type Maxim = {
	name: string;
	maxim: string;
};

type ClientRect = {
	x: number;
	y: number;
	height: number;
	width: number;
};

interface SizeOption {
	id: string;
	label: string;
	height: number;
	width: number;
}
