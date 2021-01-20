import express from 'express';
import cors from 'cors';
import { flatten, uniq } from 'lodash';
import mongo from './mongo';
import fillUntracked from './fill-untracked';
import getDay from './get-day';
import overrides from './overrides';

const router = express.Router();

router.use(cors());
router.get(
	'/',
	async (request, response): Promise<void> => {
		const offset = Number(request.query.offset || 0);
		const db = await mongo();
		const day = getDay(new Date('2020-12-17')) - offset;
		const runs = await db.runs
			.find({
				day: { $lte: new Date('2020-12-17').getTime(), $gt: day - 100 },
			})
			.toArray();
		const filled = fillUntracked(runs, offset, 100);
		const one = await db.runs.find({}).sort({ day: -1 }).limit(1).toArray();
		response.json({ runs: filled, total: one ? one[0].day : 0 });
	}
);

router.get(
	'/countries',
	async (request, response): Promise<void> => {
		const db = await mongo();
		const overrideCountries = flatten(
			(overrides
				.map((o): string | null | undefined => o.country)
				.filter(Boolean) as string[]).map((c: string): string[] =>
				c.split(',')
			)
		) as string[];
		const dbCountries = flatten(
			(await db.runs.distinct('country', {}))
				.filter(Boolean)
				.map((c: string): string[] => c.split(','))
		);
		response.json({
			countries: uniq([...overrideCountries, ...dbCountries]),
		});
	}
);

router.get(
	'/average-distance',
	async (request, response): Promise<void> => {
		const db = await mongo();
		const result = await db.runs
			.aggregate([
				{
					$group: {
						_id: null,
						distance: { $avg: '$distance' },
					},
				},
			])
			.toArray();
		response.json({
			distance: result[0].distance,
		});
	}
);

export default router;
