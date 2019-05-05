import express from 'express';
import listActivities from './list-activities';
import formatActivity from './format-activity';

const app = express();

app.get('/formatted', async (request, response) => {
	const activities = await listActivities();
	response.json(activities.map(formatActivity));
});

app.get('/', async (request, response) => {
	const activities = await listActivities();
	response.json(activities);
});

app.listen(1200);
console.log('App listening');
