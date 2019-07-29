import listActivities from './list-activities';
import mongo from './mongo';
import formatActivity from './format-activity';
import getDay from './get-day';

export default async (): Promise<void> => {
	let earliestDayFetched = getDay(new Date());
	let page = 1;
	while (earliestDayFetched > 0) {
		const activities = await listActivities(page);
		page++;
		for (const activity of activities) {
			const db = await mongo();
			const formatted = await formatActivity(activity);
			const exists = await db.runs.findOne({
				day: formatted.day
			});
			earliestDayFetched = formatted.day;
			if (formatted.day <= 0) {
				return;
			}
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
	}
};
