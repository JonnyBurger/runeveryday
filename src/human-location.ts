import {Geocoding} from './mongo';

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
			c.types.includes('postal_town') ||
			c.types.includes('administrative_area_level_2') ||
			c.types.includes('administrative_area_level_1')
	);
	if (!element) {
		return null;
	}
	return element.long_name;
};
