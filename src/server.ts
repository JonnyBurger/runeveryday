import express from 'express';
import mongo from './mongo';

const app = express();

app.get('/', async (request, response) => {
	const db = await mongo();
	const runs = await db.runs.find().toArray();
	response.json(runs);
});

export default app;
