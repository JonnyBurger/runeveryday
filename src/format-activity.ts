import {SummaryActivity} from './strava-types/activity';
import getDay from './get-day';
import {getCity, getCountry} from './human-location';
import {getLocation} from './geocode';

export interface DbActivity {
	day: number;
	name: string;
	distance: number | null;
	date: number | null;
	location: number[] | null;
	city: string | null;
	country: string | null;
	strava_id: string | null;
	treadmill?: string;
	sick?: string;
	drunk?: string;
	injured?: string;
}

export default async (activity: SummaryActivity): Promise<DbActivity> => {
	const day = getDay(new Date(activity.start_date_local));
	const geocode = await getLocation(activity.start_latlng);
	const city = getCity(geocode);
	const country = getCountry(geocode);
	return {
		day,
		name: activity.name,
		distance: activity.distance,
		date: new Date(activity.start_date_local).getTime(),
		location: activity.start_latlng,
		city,
		country,
		treadmill: activity.name.match(/treadmill/i) ? 'Treadmill' : undefined,
		strava_id: String(activity.id)
	};
};
