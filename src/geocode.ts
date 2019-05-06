import got from 'got';
import qs from 'querystring';
import mongo, {Geocoding} from './mongo';

export const getLocation = async (
	latlng: number[]
): Promise<Geocoding | null> => {
	if (!process.env.GOOGLE_MAPS_KEY) {
		console.warn(
			'Warning: No Google Maps key set. Cannot resolve address to location.'
		);
		return null;
	}
	if (!latlng) {
		return null;
	}
	const query = latlng.join(',');
	const db = await mongo();
	const fromCache = await db.geocoding.findOne({
		query
	});
	if (fromCache) {
		console.log('from cache');
		return fromCache.response;
	}
	const result = await got(
		`https://maps.googleapis.com/maps/api/geocode/json?${qs.stringify({
			address: latlng.join(','),
			key: process.env.GOOGLE_MAPS_KEY
		})}`,
		{
			json: true
		}
	);
	const response = result.body.results[0].address_components;
	await db.geocoding.insertOne({
		query,
		response
	});
	return response;
};
