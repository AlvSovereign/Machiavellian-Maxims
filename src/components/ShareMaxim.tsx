import React from 'react';
import Konva from 'konva';
import { Dialog, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import imageSizes from '../utils/image-sizes';
import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';
import FontFaceObserver from 'fontfaceobserver';

const _ShareMaxim: React.FC<IProps> = ({
	maxim = null,
	media = 'default',
	openModal = false,
	closeModal = () => {}
}) => {
	const [dimensions, setDimensions] = React.useState<TDimensions>({
		height: 1080,
		width: 1080
	});
	const theme: any = useTheme();

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

	function getDimensions(media: string) {
		switch (media) {
			case 'InstagramFeed':
				setDimensions(imageSizes.instagramFeedPortrait);
				break;
			default:
				setDimensions(imageSizes.default);
				break;
		}
	}

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
		console.log('updatedContentRect: ', updatedContentRect);

		group.add(content);

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
	}

	return (
		<Dialog
			fullWidth
			maxWidth={'xl'}
			open={openModal}
			onClose={() => closeModal()}>
			<img id='canvas-container' src={canvasImage} />
			<Button
				color={'primary'}
				component={'a'}
				href={canvasImage}
				onClick={createCanvas}
				download>
				Canvas
			</Button>
		</Dialog>
	);
};

export const ShareMaxim = _ShareMaxim;

interface IProps {
	maxim: Maxim;
	media: string;
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
