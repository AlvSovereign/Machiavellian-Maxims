import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Text, Group, Rect } from 'react-konva';
import { Dialog, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import imageSizes from '../utils/image-sizes';
import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';
import FontFaceObserver from 'fontfaceobserver';

function useClientRect() {
	const [rect, setRect] = React.useState<any>(null);
	const [node, setNode] = React.useState<any>(null);

	const ref: any = React.useCallback((node: any) => {
		if (node !== null) {
			setNode(node);
			setRect(node.getClientRect());
		}
	}, []);

	return [{ rect, node }, ref];
}

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
	const [attributionNode, attributionRef] = useClientRect();
	const [dividerNode, dividerRef] = useClientRect();
	const [maximNode, maximRef] = useClientRect();

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

		const title = new Konva.Text({
			align: 'right',
			fill: theme.palette.primary.main,
			fontFamily: 'CalendasPlus',
			fontSize: 34,
			lineHeight: 2,
			text: sanitiseText(maxim!.name),
			verticalAlign: 'top',
			width: dimensions.width / 2,
			x:
				maximNode &&
				maximNode.rect &&
				dimensions.width / 2 - maximNode.rect.width / 2,
			y:
				maximNode &&
				maximNode.rect &&
				dimensions.height / 2 - maximNode.rect.height / 2 - 66
		});

		group.add(title);

		const content = new Konva.Text({
			align: 'center',
			fontSize: 24,
			fontFamily: 'CalendasPlus',
			lineHeight: 2,
			text: sanitiseText(maxim!.maxim),
			verticalAlign: 'middle',
			width: dimensions.width / 2,
			wrap: 'word',
			x:
				maximNode &&
				maximNode.rect &&
				dimensions.width / 2 - maximNode.rect.width / 2,
			y:
				maximNode &&
				maximNode.rect &&
				dimensions.height / 2 - maximNode.rect.height / 2
		});

		group.add(content);

		const hr = new Konva.Rect({
			align: 'center',
			fill: theme.palette.primary.main,
			height: 1,
			width: dimensions.width / 4,
			x:
				dividerNode &&
				dividerNode.rect &&
				dimensions.width / 2 - dividerNode.rect.width / 2,
			y:
				maximNode &&
				maximNode.rect &&
				maximNode.node &&
				dimensions.height / 2 + maximNode.rect.height / 2 + 28
		});

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
			x:
				attributionNode &&
				attributionNode.rect &&
				dimensions.width / 2 - attributionNode.rect.width / 2,
			y:
				maximNode &&
				maximNode.rect &&
				maximNode.node &&
				dimensions.height / 2 + maximNode.rect.height / 2 + 28 + 28
		});

		group.add(tagline);

		setCanvasImage(stage.toDataURL({ pixelRatio: 4 }));
	}

	return (
		<Dialog
			fullWidth
			maxWidth={'xl'}
			open={openModal}
			onClose={() => closeModal()}>
			{fontReady && (
				<Stage height={dimensions.height} width={dimensions.width}>
					<Layer>
						<Rect
							fill={'white'}
							height={dimensions.height}
							width={dimensions.width}
							x={0}
							y={0}
						/>
						<Group absolutePosition={{ x: 0, y: -28 }}>
							<Text
								align={'right'}
								fill={theme.palette.primary.main}
								fontFamily={'CalendasPlus'}
								fontSize={34}
								lineHeight={2}
								text={sanitiseText(maxim!.name)}
								verticalAlign={'top'}
								width={dimensions.width / 2}
								X={
									maximNode &&
									maximNode.rect &&
									dimensions.width / 2 - maximNode.rect.width / 2
								}
								y={
									maximNode &&
									maximNode.rect &&
									dimensions.height / 2 - maximNode.rect.height / 2 - 66
								}
							/>
							<Text
								ref={maximRef}
								align={'center'}
								fontSize={24}
								fontFamily={'CalendasPlus'}
								lineHeight={2}
								text={sanitiseText(maxim!.maxim)}
								verticalAlign={'middle'}
								width={dimensions.width / 2}
								wrap={'word'}
								x={
									maximNode &&
									maximNode.rect &&
									dimensions.width / 2 - maximNode.rect.width / 2
								}
								y={
									maximNode &&
									maximNode.rect &&
									dimensions.height / 2 - maximNode.rect.height / 2
								}
							/>
							<Rect
								ref={dividerRef}
								align={'center'}
								fill={theme.palette.primary.main}
								height={1}
								width={dimensions.width / 4}
								x={
									dividerNode &&
									dividerNode.rect &&
									dimensions.width / 2 - dividerNode.rect.width / 2
								}
								y={
									maximNode &&
									maximNode.rect &&
									maximNode.node &&
									dimensions.height / 2 + maximNode.rect.height / 2 + 28
								}
							/>
							<Text
								ref={attributionRef}
								align={'center'}
								fill={'rgba(0, 0, 0, 0.54)'}
								fontFamily={'CalendasPlus'}
								fontSize={30}
								lineHeight={2}
								text={'ILLIMUTABLEMEN.COM'}
								verticalAlign={'middle'}
								width={dimensions.width / 2}
								x={
									attributionNode &&
									attributionNode.rect &&
									dimensions.width / 2 - attributionNode.rect.width / 2
								}
								y={
									maximNode &&
									maximNode.rect &&
									maximNode.node &&
									dimensions.height / 2 + maximNode.rect.height / 2 + 28 + 28
								}
							/>
						</Group>
					</Layer>
				</Stage>
			)}
			<img id='canvas-container' src={canvasImage} />
			<Button
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
