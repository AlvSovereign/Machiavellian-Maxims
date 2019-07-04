const imageSizes: SizeOption[] = [
	{
		id: 'Square',
		label: 'Square',
		height: 1080,
		width: 1080
	},
	{
		id: 'instagramFeedPortrait',
		label: 'Instagram - Portrait',
		height: 1350,
		width: 1080
	}
];

export default imageSizes;

interface SizeOption {
	id: string;
	label: string;
	height: number;
	width: number;
}
