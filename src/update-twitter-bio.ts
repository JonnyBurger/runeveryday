import dotenv from 'dotenv';
import got from 'got';
import Twit from 'twit';

dotenv.config();

const T = new Twit({
	consumer_key: process.env.TWITTER_API_PUBLIC_KEY as string,
	consumer_secret: process.env.TWITTER_API_SECRET_KEY as string,
	access_token: process.env.TWITTER_ACCESS_TOKEN as string,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
});

const engineerAmounts = [
	'0x',
	'-0.00001x',
	'undefinedx',
	'0y',
	'NaNx',
	'nullx',
	'0.30000000000000004x'
];

export default async (): Promise<void> => {
	const howManyXEngineer =
		engineerAmounts[Math.floor(Math.random() * engineerAmounts.length)];
	const runs = (await got(
		'https://api.jonny.run/.netlify/functions/index'
	).json()) as any;

	console.log('Received response', runs);

	await T.post('account/update_profile', {
		// @ts-ignore - types are wrong
		description: `${(Math.random() * 20 - 5).toFixed(
			2
		)}x hacker, ${howManyXEngineer} engineer - working on @BestandeApp @AnystickerApp.\nRan ${
			runs.total
		} days in a row: jonny.run\nPart time hacker at @Axelra_AG`
	});
};
