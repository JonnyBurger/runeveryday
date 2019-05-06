import express from 'express';
import cors from 'cors';
import mongo from './mongo';
import fillUntracked from './fill-untracked';

const router = express.Router();

router.use(cors());
router.get('/', async (request, response) => {
	const db = await mongo();
	const runs = await db.runs.find().toArray();
	const filled = fillUntracked(runs);
	response.json(filled);
});

export default router;
