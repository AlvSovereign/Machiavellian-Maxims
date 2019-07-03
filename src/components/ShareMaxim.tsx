import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Text, Group, Rect } from 'react-konva';
import { Modal, Paper, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import imageSizes from '../utils/image-sizes';
import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';
import FontFaceObserver from 'fontfaceobserver';
import { runInNewContext } from 'vm';

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
	const [titleNode, titleRef] = useClientRect();
	const [groupNode, groupRef] = useClientRect();

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

	const useStyles = makeStyles({
		root: {
			height: dimensions.height,
			width: dimensions.width
		}
	});
	const classes = useStyles();

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
		plainTextRenderer.paragraph = (text: string) => text;
		const newText = marked(maximText, { renderer: plainTextRenderer });

		if (newText.includes('&amp;')) {
			console.log('nextText: ', newText.replace('&amp;', '&'));
			return newText.replace('&amp;', '&');
		} else {
			console.log('newText: ', newText);
			return newText;
		}
	}

	return (
		<Modal open={openModal} onClose={() => closeModal()}>
			<Paper className={classes.root}>
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
							<Group ref={groupRef} absolutePosition={{ x: 0, y: -28 }}>
								<Text
									ref={titleRef}
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
									// fontFamily={'Times'}
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
									fill={'rgba(0, 0, 0, 0.87)'}
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
			</Paper>
		</Modal>
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
