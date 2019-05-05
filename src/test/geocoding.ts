import test from 'ava';
import dotenv from 'dotenv';
import {getLocation} from '../geocode';
import {Geocoding} from '../mongo';

dotenv.config();

export const getCountry = (components: Geocoding | null) => {
	if (!components) {
		return null;
	}
	const element = components.find((c: any) => c.types.includes('country'));
	if (!element) {
		return null;
	}
	return element.long_name;
};

export const getCity = (components: Geocoding | null) => {
	if (!components) {
		return null;
	}
	const element = components.find(
		(c: any) =>
			c.types.includes('administrative_area_level_2') ||
			c.types.includes('locality')
	);
	if (!element) {
		return null;
	}
	return element.long_name;
};

test('Geocoding', async t => {
	const components = await getLocation([47.38, 8.55]);
	const country = getCountry(components);
	const city = getCity(components);
	t.is(country, 'Switzerland');
	t.is(city, 'Zürich');
});
