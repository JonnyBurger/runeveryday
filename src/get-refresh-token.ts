import got from 'got';
import qs from 'querystring';
import dotenv from 'dotenv';
import mongo from './mongo';

dotenv.config();

type TokenResponse = {
	access_token: string;
	refresh_token: string;
	expires_at: number;
};

export default async (): Promise<TokenResponse> => {
	const db = await mongo();
	const config = await db.token.findOne({});
	if (!config) {
		throw new TypeError('No refresh token in DB');
	}

	if (config.expires_at - 120000 > Date.now()) {
		return {
			access_token: config.access_token,
			expires_at: config.expires_at,
			refresh_token: config.refresh_token
		};
	}

	const response = await got(
		`https://www.strava.com/oauth/token?${qs.stringify({
			client_id: process.env.STRAVA_CLIENT_ID,
			grant_type: 'refresh_token',
			client_secret: process.env.STRAVA_CLIENT_SECRET,
			refresh_token: config.refresh_token
		})}`,
		{
			method: 'POST',
			json: true
		}
	);
	const body: {
		access_token: string;
		expires_at: number;
		token_type: string;
		expires_in: number;
		refresh_token: string;
	} = response.body;
	await db.token.updateOne(
		{},
		{
			$set: {
				access_token: body.access_token,
				expires_at: body.expires_at * 1000,
				refresh_token: body.refresh_token
			}
		}
	);
	return {
		access_token: body.access_token,
		expires_at: body.expires_at * 1000,
		refresh_token: body.refresh_token
	};
};
