import dotenv from 'dotenv';
import Twit from 'twit';
import xns from 'xns';

import Jimp = require('jimp');

dotenv.config();

const T = new Twit({
	consumer_key: process.env.TWITTER_API_PUBLIC_KEY as string,
	consumer_secret: process.env.TWITTER_API_SECRET_KEY as string,
	access_token: process.env.TWITTER_ACCESS_TOKEN as string,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});

export default xns(
	async (): Promise<void> => {
		const hoursInZurich = parseInt(
			new Intl.DateTimeFormat('en', {
				timeZone: 'Europe/Zurich',
				hour: '2-digit',
				hour12: false,
			}).format(new Date())
		);
		const background = await Jimp.read('./assets/white.png');

		const fg = await Jimp.read('./assets/jonny-light.png');
		const combined = background.composite(fg, 0, 0);
		const image = await combined.getBase64Async('image/png');
		await T.post('account/update_profile_image', {
			// @ts-ignore
			image: image.replace('data:image/png;base64,', ''),
		});
	}
);
