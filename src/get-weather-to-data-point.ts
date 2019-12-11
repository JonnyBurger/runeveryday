import { DbActivity, Weather, getCondition } from './format-activity';
import {
	getStationsForLocation,
	getHourlyWeather,
	WeatherDataPoint,
	getClosestWeatherPoint,
	StationInformation,
	getWeatherStationMetadata
} from './weather';

export default async (run: DbActivity): Promise<Weather | null> => {
	if (!run.location) {
		console.log('Run doesnt have location, might be treadmill');
		return null;
	}
	const weatherStations = await getStationsForLocation(
		run.location[0],
		run.location[1]
	);
	console.log('found stations for weather', weatherStations);
	if (!weatherStations.length) {
		console.log('no weather stations found');
		return null;
	}
	let weather: WeatherDataPoint[] = [];
	let stationInfo: StationInformation | null = null;
	let i = 0;
	while (weather.length === 0 && i < weatherStations.length) {
		weather = await getHourlyWeather(
			new Date(run.date as number),
			weatherStations[i].id
		);
		if (weather.length > 0) {
			stationInfo = await getWeatherStationMetadata(
				weatherStations[i].id
			);
		}
		i++;
	}
	if (!weather.length) {
		console.log('no weather found');
		return null;
	}
	const closestWeather = getClosestWeatherPoint(
		weather,
		new Date(run.date as number)
	);
	if (!closestWeather) {
		return null;
	}
	return {
		time: new Date(closestWeather.time).getTime(),
		temperature: closestWeather.temperature,
		windspeed: closestWeather.windspeed,
		peak_gust: closestWeather.peakgust,
		wind_direction: closestWeather.winddirection,
		pressure: closestWeather.pressure,
		condition: getCondition(closestWeather.condition),
		station_location: stationInfo
			? [Number(stationInfo.latitude), Number(stationInfo.longitude)]
			: null
	};
};
