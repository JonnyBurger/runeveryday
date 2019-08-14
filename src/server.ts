import express from 'express';
import cors from 'cors';
import mongo from './mongo';
import fillUntracked from './fill-untracked';
import getDay from './get-day';

const router = express.Router();

router.use(cors());
router.get(
	'/',
	async (request, response): Promise<void> => {
		const offset = Number(request.query.offset || 0);
		const db = await mongo();
		const day = getDay(new Date()) - offset;
		const runs = await db.runs
			.find({
				day: {$lte: day, $gt: day - 100}
			})
			.toArray();
		const filled = fillUntracked(runs, offset, 100);
		const one = await db.runs
			.find({})
			.sort({day: -1})
			.limit(1)
			.toArray();
		response.json({runs: filled, total: one ? one[0].day : 0});
	}
);

router.get(
	'/countries',
	async (request, response): Promise<void> => {
		const db = await mongo();
		response.json({
			countries: (await db.runs.distinct('country', {})).filter(Boolean)
		});
	}
);

router.get(
	'/average-distance',
	async (request, response): Promise<void> => {
		const db = await mongo();
		response.json(
			await db.runs.aggregate([
				{
					$group: {
						_id: null,
						distance: {$avg: '$distance'}
					}
				}
			])
		);
	}
);

export default router;
