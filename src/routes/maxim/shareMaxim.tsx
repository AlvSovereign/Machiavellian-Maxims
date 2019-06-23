import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';
import { Modal, Paper, makeStyles } from '@material-ui/core';

const _ShareMaxim: React.FC<IProps> = ({
	media = 'default',
	openModal = false,
	closeModal = () => {}
}) => {
	const [dimensions, setDimensions] = React.useState<TDimensions>({
		height: 1080,
		width: 1080
	});

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
				setDimensions({
					height: 1350,
					width: 1080
				});
				break;
		}
	}

	React.useEffect(() => {
		getDimensions(media);
	}, [media]);

	return (
		<Modal open={openModal} onClose={() => closeModal()}>
			<Paper className={classes.root}>
				<Stage width={dimensions.width} height={dimensions.height}>
					<Layer>
						<Text
							align={'center'}
							fontSize={24}
							fontFamily={'Times'}
							height={dimensions.height / 2}
							lineHeight={2}
							text={`Undermining is personal, refutation isn’t. Refutation communicates “I believe you’re wrong due to the findings of the available evidence”. Undermining communicates “I’m going to humiliate you because your opinions invoke my disdain.” Refutations are logical retorts, undermining is interrelational violence. Learn to distinguish between the two, for they oft appear similar.
							ILLIMUTABLEMEN.COM
								`}
							verticalAlign={'middle'}
							width={dimensions.width / 2}
							wrap={'word'}
							x={dimensions.width / 4}
							y={dimensions.height / 4}
						/>
					</Layer>
				</Stage>
			</Paper>
		</Modal>
	);
};

export const ShareMaxim = _ShareMaxim;

interface IProps {
	media: string;
	openModal: boolean;
	closeModal: () => void;
}

type TDimensions = {
	height: number;
	width: number;
};
