import Jimp = require('jimp');

export default async (): Promise<string> => {
	const hoursInZurich = parseInt(
		new Intl.DateTimeFormat('en', {
			timeZone: 'Europe/Zurich',
			hour: '2-digit',
			hour12: false
		}).format(new Date())
	);
	const darkMode = hoursInZurich >= 19 || hoursInZurich < 6.9;
	const bg = await Jimp.read('https://gradientjoy.com/400x400');
	const background = await Jimp.read(
		darkMode ? './assets/black.png' : './assets/white.png'
	);

	const lightBg = await bg.composite(background, 0, 0, {
		opacityDest: 1,
		opacitySource: darkMode ? 0.4 : 0.7,
		mode: Jimp.BLEND_SOURCE_OVER
	});
	const fg = await Jimp.read(
		darkMode ? './assets/jonny-dark.png' : './assets/jonny-light.png'
	);
	const combined = await lightBg.composite(fg, 0, 0);
	return combined.getBase64Async('image/png');
};
