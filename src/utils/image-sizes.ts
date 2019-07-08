const imageSizes: SizeOption[] = [
	{
		id: 'default',
		label: 'Default - Square',
		height: 1080,
		width: 1080
	},
	{
		id: 'instagramFeedPortrait',
		label: 'Instagram - Portrait',
		height: 1350,
		width: 1080
	},
	{
		id: 'facebookCoverPhoto',
		label: 'Facebook Profile Cover Photo',
		height: 559,
		width: 1469
	},
	{
		id: 'facebookGroupCoverPhoto',
		label: 'Facebook Group Cover Photo',
		height: 692,
		width: 1230
	},
	{
		id: 'facebookEventCoverPhoto',
		label: 'Facebook Event Cover Photo',
		height: 524,
		width: 1000
	},
	{
		id: 'facebookPostLandscape',
		label: 'Facebook Post - Landscape',
		height: 862,
		width: 1536
	},
	{
		id: 'facebookPostPortrait',
		label: 'Facebook Post - Portrait',
		height: 1536,
		width: 1023
	}
];

export default imageSizes;

interface SizeOption {
	id: string;
	label: string;
	height: number;
	width: number;
}
