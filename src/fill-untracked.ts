import {DbActivity} from './format-activity';
import getDay from './get-day';
import overrides from './overrides';

export default (
	runs: DbActivity[],
	offset: number,
	limit: number
): DbActivity[] => {
	const array: DbActivity[] = [];
	const today = getDay(new Date());
	let days = new Array(today).fill(true).map((_, i): number => i + 1);
	days = days
		.reverse()
		.splice(offset, limit)
		.reverse();
	for (const day of days) {
		const runOfThisDay = runs.find((r): boolean => r.day === day);
		const override = overrides.filter((o): boolean => o.day === day);
		if (runOfThisDay) {
			array.push(Object.assign({}, runOfThisDay, ...override));
		} else {
			array.push(
				Object.assign(
					{},
					{
						day,
						date: null,
						distance: null,
						city: null,
						country: null,
						strava_id: null,
						location: null,
						name: 'Untracked'
					},
					...override
				)
			);
		}
	}
	return array.reverse();
};
