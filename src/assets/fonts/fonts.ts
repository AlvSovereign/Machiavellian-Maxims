const GeomanistLightWoff2 = './geomanist-light.woff2';
const GeomanistRegularWoff2 = './geomanist-regular.woff2';
const GeomanistMeduimWoff2 = './geomanist-medium.woff2';

const GeomanistLight = {
	fontFamily: 'Geomanist',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 300,
	src: `
    url(${GeomanistLightWoff2}) format('woff2')
  `
};
const GeomanistRegular = {
	fontFamily: 'Geomanist',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 400,
	src: `
    url(${GeomanistRegularWoff2}) format('woff2')
  `
};
const GeomanistMedium = {
	fontFamily: 'Geomanist',
	fontStyle: 'normal',
	fontDisplay: 'swap',
	fontWeight: 500,
	src: `
    url(${GeomanistMeduimWoff2}) format('woff2')
  `
};

export { GeomanistLight, GeomanistRegular, GeomanistMedium };
