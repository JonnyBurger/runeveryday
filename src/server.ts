import express from 'express';
import cors from 'cors';
import mongo from './mongo';

const router = express.Router();

router.use(cors());
router.get('/', async (request, response) => {
	const db = await mongo();
	const runs = await db.runs.find().toArray();
	response.json(runs);
});

export default router;
