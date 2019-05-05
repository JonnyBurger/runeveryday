import {SummaryActivity} from './strava-types/activity';
import getDay, {dayOne} from './get-day';
import {addDays, setHours} from 'date-fns';

export type DbActivity = {
	day: number;
	name: string;
	distance: number;
	date_debug: string;
	date: string;
	location: number[];
};

export default (activity: SummaryActivity): DbActivity => {
	const day = getDay(new Date(activity.start_date_local));
	return {
		day,
		name: activity.name,
		distance: activity.distance,
		date_debug: new Date(activity.start_date_local).toISOString(),
		date: setHours(addDays(dayOne, day), 12).toISOString(),
		location: activity.start_latlng
	};
};
