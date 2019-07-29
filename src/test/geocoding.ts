import test from 'ava';
import dotenv from 'dotenv';
import {getLocation} from '../geocode';
import {getCountry, getCity} from '../human-location';

dotenv.config();

test('Geocoding', async (t): Promise<void> => {
	const components = await getLocation([47.38, 8.55]);
	const country = getCountry(components);
	const city = getCity(components);
	t.is(country, 'Switzerland');
	t.is(city, 'Zürich');
});
