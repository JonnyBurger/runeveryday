import got from 'got';
import stravaUrl from './strava-url';
import getRefreshToken from './get-refresh-token';
import { SummaryActivity } from './strava-types/activity';

export default async (
	page: number,
	per_page: number = 30
): Promise<SummaryActivity[]> => {
	const token = await getRefreshToken();
	const response = (await got(
		`${stravaUrl}/athlete/activities?page=${page}&per_page=${per_page}`,
		{
			headers: {
				Authorization: `Bearer ${token.access_token}`
			}
		}
	).json()) as any;
	return response;
};
