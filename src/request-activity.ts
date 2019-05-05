import got from 'got';
import getRefreshToken from './get-refresh-token';
import {DetailedActivity} from './strava-types/activity';
import stravaUrl from './strava-url';

export default async (activity: string): Promise<DetailedActivity> => {
	const tokens = await getRefreshToken();
	const response = await got(`${stravaUrl}/activities/${activity}`, {
		headers: {
			Authorization: `Bearer ${tokens.access_token}`
		},
		json: true
	});
	const body: DetailedActivity = response.body;
	return body;
};
