import express from 'express';
import cors from 'cors';
import mongo from './mongo';
import fillUntracked from './fill-untracked';
import getDay from './get-day';

const router = express.Router();

router.use(cors());
router.get('/', async (request, response) => {
	const offset = Number(request.query.offset || 0);
	const db = await mongo();
	const day = getDay(new Date()) - offset;
	const runs = await db.runs
		.find({
			day: {$lte: day, $gt: day - 100}
		})
		.toArray();
	const filled = fillUntracked(runs, offset, 100);
	response.json({runs: filled, total: getDay(new Date())});
});

router.get('/countries', async (request, response) => {
	const db = await mongo();
	response.json({
		countries: (await db.runs.distinct('country', {})).filter(Boolean)
	});
});

export default router;
