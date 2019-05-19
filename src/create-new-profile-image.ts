import Jimp = require('jimp');

export default async () => {
	const bg = await Jimp.read('https://gradientjoy.com/400x400');
	const white = await Jimp.read('./assets/white.png');

	const lightBg = await bg.composite(white, 0, 0, {
		opacityDest: 1,
		opacitySource: 0.7,
		mode: Jimp.BLEND_SOURCE_OVER
	});
	const fg = await Jimp.read('./assets/jonny.png');
	const combined = await lightBg.composite(fg, 0, 0);
	return combined.getBase64Async('image/png');
};
