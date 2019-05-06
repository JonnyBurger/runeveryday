import got from 'got';
import stravaUrl from './strava-url';
import getRefreshToken from './get-refresh-token';
import {SummaryActivity} from './strava-types/activity';

export default async (page: number): Promise<SummaryActivity[]> => {
	const token = await getRefreshToken();
	const response = await got(`${stravaUrl}/athlete/activities?page=${page}`, {
		json: true,
		headers: {
			Authorization: `Bearer ${token.access_token}`
		}
	});
	return response.body;
};
