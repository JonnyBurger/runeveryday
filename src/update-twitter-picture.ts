import dotenv from 'dotenv';
import Twit from 'twit';
import xns from 'xns';
import createNewProfileImage from './create-new-profile-image';

dotenv.config();

const T = new Twit({
	consumer_key: process.env.TWITTER_API_PUBLIC_KEY as string,
	consumer_secret: process.env.TWITTER_API_SECRET_KEY as string,
	access_token: process.env.TWITTER_ACCESS_TOKEN as string,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});

export default xns(
	async (): Promise<void> => {
		const image = await createNewProfileImage();
		await T.post('account/update_profile_image', {
			// @ts-ignore
			image: image.replace('data:image/png;base64,', '')
		});
	}
);
