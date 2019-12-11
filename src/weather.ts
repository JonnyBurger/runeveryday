import got from 'got';
import { sortBy } from 'lodash';
import { format } from 'date-fns';

// created with json2ts.com!

interface Meta {
	source?: string;
}

interface Station {
	id: string;
	name: string;
	distance: string;
}

interface StationObject {
	meta: Meta;
	data: Station[];
}

export interface WeatherDataPoint {
	time: string;
	temperature: number;
	dewpoint: number;
	humidity: number;
	precipitation: number;
	precipitation_3: number;
	precipitation_6: number | null;
	snowdepth: number | null;
	windspeed: number | null;
	peakgust: number | null;
	winddirection: number;
	pressure: number;
	condition: number;
}

interface WeatherData {
	meta: Meta;
	data: WeatherDataPoint[];
}

export interface Country {
	code: string;
	name: string;
}

export interface Hourly {
	start: string;
	end: string;
}

export interface Daily {
	start: string;
	end: string;
}

export interface Monthly {
	start: string;
	end: string;
}

export interface Inventory {
	hourly: Hourly;
	daily: Daily;
	monthly: Monthly;
}

export interface StationInformation {
	id: string;
	name: string;
	country: Country;
	region: string;
	wmo: string;
	icao: string;
	iata?: any;
	latitude: string;
	longitude: string;
	elevation: string;
	time_zone: string;
	inventory: Inventory;
}

interface WeatherStationMetadata {
	meta: Meta;
	data: StationInformation;
}

export const getStationsForLocation = async (
	latitude: number,
	longitude: number
): Promise<Station[]> => {
	const nearByStations = (await got(
		`https://api.meteostat.net/v1/stations/nearby?lat=${latitude}&lon=${longitude}&limit=5&key=${process.env.WEATHER_API_KEY}`,
		{}
	).json()) as StationObject;
	return nearByStations.data;
};

export const getHourlyWeather = async (
	date: Date,
	station: string
): Promise<WeatherDataPoint[]> => {
	const formattedDate = format(date, 'yyyy-MM-dd');
	const url = `https://api.meteostat.net/v1/history/hourly?station=${station}&start=${formattedDate}&end=${formattedDate}&key=${process.env.WEATHER_API_KEY}`;
	const response = (await got(url).json()) as WeatherData;
	return response.data;
};

export const getClosestWeatherPoint = (
	weatherArray: WeatherDataPoint[],
	date: Date
): WeatherDataPoint | null => {
	return (
		sortBy(weatherArray, (item): number => {
			const difference = Math.abs(
				new Date(item.time).getTime() - date.getTime()
			);
			return difference;
		})[0] ?? null
	);
};

export const getWeatherStationMetadata = async (
	stationId: string
): Promise<StationInformation | null> => {
	const url = `https://api.meteostat.net/v1/stations/meta?station=${stationId}&inventory=1&key=cwiXpUWq`;
	const response = (await got(url).json()) as WeatherStationMetadata;
	return response.data;
};
