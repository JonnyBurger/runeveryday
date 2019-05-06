import {DbActivity} from './format-activity';
import getDay from './get-day';

export default (runs: DbActivity[]): DbActivity[] => {
	const reversed = runs.reverse();
	const array: DbActivity[] = [];
	const today = getDay(new Date());
	const days = new Array(today).fill(true).map((_, i) => i + 1);
	for (let day of days) {
		const runOfThisDay = runs.find(r => r.day === day);
		if (runOfThisDay) {
			array.push(runOfThisDay);
		} else {
			array.push({
				day,
				date: null,
				distance: null,
				city: null,
				country: null,
				strava_id: null,
				location: null,
				name: 'Untracked'
			});
		}
	}
	return array.reverse();
};
