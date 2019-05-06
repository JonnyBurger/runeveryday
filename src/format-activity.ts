import {SummaryActivity} from './strava-types/activity';
import getDay, {dayOne} from './get-day';
import {addDays, setHours} from 'date-fns';
import {getCity, getCountry} from './human-location';
import {getLocation} from './geocode';

export type DbActivity = {
	day: number;
	name: string;
	distance: number | null;
	date: string | null;
	location: number[] | null;
	city: string | null;
	country: string | null;
	strava_id: string | null;
	treadmill?: string;
	sick?: string;
	drunk?: string;
};

export default async (activity: SummaryActivity): Promise<DbActivity> => {
	const day = getDay(new Date(activity.start_date_local));
	const geocode = await getLocation(activity.start_latlng);
	const city = getCity(geocode);
	const country = getCountry(geocode);
	return {
		day,
		name: activity.name,
		distance: activity.distance,
		date: setHours(addDays(dayOne, day), 12).toISOString(),
		location: activity.start_latlng,
		city,
		country,
		strava_id: String(activity.id)
	};
};
