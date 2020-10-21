import dotenv from 'dotenv';
import Twit from 'twit';
import xns from 'xns';

dotenv.config();

const T = new Twit({
	consumer_key: process.env.TWITTER_API_PUBLIC_KEY as string,
	consumer_secret: process.env.TWITTER_API_SECRET_KEY as string,
	access_token: process.env.TWITTER_ACCESS_TOKEN as string,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
});

export default xns(
	async (): Promise<string> => {
		await T.post('account/update_profile', {
			// @ts-ignore - types are wrong
			description: 'Creative hacker',
		});

		return 'Bio updated.';
	}
);
