import Konva from 'konva';

const _ShareMaxim = {
	getDimensions: ({ media }: GetDimensionsArgs): TDimensions => {
		let dimensions = {
			height: 1080,
			width: 1080
		};

		switch (media) {
			case 'InstagramFeed':
				dimensions = {
					height: 1350,
					width: 1080
				};
				break;
			default:
				return dimensions;
		}

		return dimensions;
	},

	createImage: ({ dimensions, text }: CreateImageArgs) => {
		const stage = new Konva.Stage({
			container: 'maxim-image',
			height: dimensions.height,
			width: dimensions.width
		});

		const layer = new Konva.Layer();

		const maximText = new Konva.Text({
			x: stage.width() / 2,
			y: stage.height() / 2,
			text,
			fontSize: 30,
			fontFamily: 'CalendasPlus',
			fill: 'green',
			align: 'center'
		});

		const rect = new Konva.Rect({
			x: 20,
			y: 60,
			stroke: '#555',
			strokeWidth: 5,
			fill: '#ddd',
			width: 300,
			height: maximText.height()
		});

		// add the shapes to the layer
		layer.add(rect);
		layer.add(maximText);

		// add the layer to the stage
		stage.add(layer);
	}
};

export const ShareMaxim = _ShareMaxim;

interface GetDimensionsArgs {
	media: string;
}

interface CreateImageArgs {
	dimensions: TDimensions;
	text: string;
}

type TDimensions = {
	height: number;
	width: number;
};
