import mongo from './mongo';
import addWeatherToDataPoint from './get-weather-to-data-point';

import ms = require('ms');

require('dotenv').config();

(async (): Promise<void> => {
	const db = await mongo();
	const cursor = db.runs
		.find({
			weather: { $exists: false },
			date: { $lt: Date.now() - ms('2h') }
		})
		.sort({
			day: -1
		});
	const activities = await cursor.limit(1000).toArray();
	for (const activity of activities) {
		const weather = await addWeatherToDataPoint(activity);
		activity.weather = weather;
		await db.runs.updateOne(
			{
				day: activity.day
			},
			{
				$set: {
					weather: activity.weather
				}
			}
		);
		console.log(
			`Updated day ${activity.day} with weather ${JSON.stringify(
				activity.weather,
				null,
				2
			)}`
		);
	}
})()
	.then((): void => {
		console.log('done');
		process.exit(0);
	})
	.catch((err): void => {
		console.log(err);
		process.exit(1);
	});
