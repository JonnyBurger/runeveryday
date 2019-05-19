import listActivities from './list-activities';
import mongo from './mongo';
import formatActivity from './format-activity';

export default async (): Promise<number> => {
	const activities = await listActivities(1, 2);
	for (let activity of activities) {
		const db = await mongo();
		const formatted = await formatActivity(activity);
		const exists = await db.runs.findOne({
			day: formatted.day
		});
		if (exists) {
			await db.runs.updateOne(
				{
					day: formatted.day
				},
				{
					$set: formatted
				}
			);
			console.log(`Updated day ${formatted.day}`);
		} else {
			await db.runs.insertOne(formatted);
			console.log(`Inserted day ${formatted.day}`);
		}
	}
	const highestActivity = await formatActivity(activities[0]);
	const highestDay = highestActivity.day;
	return highestDay;
};
