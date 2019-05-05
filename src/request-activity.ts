import got from 'got';

export default async () => {
	await got(
		'https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page='
	);
};
