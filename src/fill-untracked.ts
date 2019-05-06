import {DbActivity} from './format-activity';
import getDay from './get-day';
import overrides from './overrides';

export default (runs: DbActivity[]): DbActivity[] => {
	const array: DbActivity[] = [];
	const today = getDay(new Date());
	const days = new Array(today).fill(true).map((_, i) => i + 1);
	for (let day of days) {
		const runOfThisDay = runs.find(r => r.day === day);
		const override = overrides.filter(o => o.day === day);
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
