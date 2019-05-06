import express from 'express';
import listActivities from './list-activities';
import formatActivity from './format-activity';

const app = express();

app.get('/formatted', async (request, response) => {
	const activities = await listActivities(1);
	const mapped = await Promise.all(activities.map(a => formatActivity(a)));
	response.json(mapped);
});

app.get('/', async (request, response) => {
	const activities = await listActivities(1);
	response.json(activities);
});

app.listen(1200);
console.log('App listening');
