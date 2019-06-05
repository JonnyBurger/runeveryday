import dotenv from 'dotenv';
import Twit from 'twit';

dotenv.config();

const T = new Twit({
	consumer_key: process.env.TWITTER_API_PUBLIC_KEY as string,
	consumer_secret: process.env.TWITTER_API_SECRET_KEY as string,
	access_token: process.env.TWITTER_ACCESS_TOKEN as string,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});

const engineerAmounts = ['0x', '-0.00001x', 'undefinedx', '0y', 'NaNx'];

export default async (days: number) => {
	const howManyXEngineer =
		engineerAmounts[Math.floor(Math.random() * engineerAmounts.length)];
	await T.post('account/update_profile', {
		// @ts-ignore - types are wrong
		description: `${(Math.random() * 20 - 5).toFixed(
			2
		)}x hacker, ${howManyXEngineer} engineer - working on @BestandeApp @AnystickerApp.\nRan ${days} days in a row, so far: jonny.run\nMe and my friends hacking = @foronered`
	});
};
