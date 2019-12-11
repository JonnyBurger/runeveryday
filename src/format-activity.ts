import { SummaryActivity } from './strava-types/activity';
import getDay from './get-day';
import { getCity, getCountry } from './human-location';
import { getLocation } from './geocode';

enum Condition {
	DaySunny = 'day-sunny',
	DayCloudy = 'day-cloudy',
	Cloudy = 'cloudy',
	Fog = 'fog',
	Rain = 'rain',
	Sleet = 'sleet',
	Snow = 'snow',
	RainWind = 'rain-wind',
	Showers = 'showers',
	SnowWind = 'snow-wind',
	Lightning = 'lightning',
	Hail = 'hail',
	Thunderstorm = 'thunderstorm',
	StrongWind = 'strong-wind',
	Unknown = 'unknown'
}

export const getCondition = (num: number): Condition => {
	switch (num) {
		case 1:
			return Condition.DaySunny;
		case 2:
			return Condition.DayCloudy;
		case 3:
		case 4:
			return Condition.Cloudy;
		case 5:
		case 6:
			return Condition.Fog;
		case 7:
		case 8:
		case 9:
			return Condition.Rain;
		case 10:
		case 11:
		case 12:
		case 13:
			return Condition.Sleet;
		case 14:
		case 15:
		case 16:
			return Condition.Snow;
		case 17:
		case 18:
			return Condition.RainWind;
		case 19:
		case 20:
			return Condition.Showers;
		case 21:
		case 22:
			return Condition.SnowWind;
		case 23:
			return Condition.Lightning;
		case 24:
			return Condition.Hail;
		case 25:
		case 26:
			return Condition.Thunderstorm;
		case 27:
			return Condition.StrongWind;
		default:
			return Condition.Unknown;
	}
};

export interface Weather {
	time: number;
	temperature: number;
	windspeed: number | null;
	peak_gust: number | null;
	wind_direction: number;
	pressure: number;
	condition: Condition;
	station_location: number[] | null;
}

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
	social_media_link?: string;
	weather?: Weather | null;
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
