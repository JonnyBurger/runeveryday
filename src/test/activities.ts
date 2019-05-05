import test from 'ava';
import listActivities from '../list-activities';

test('Should be able to get activities', async t => {
	const activities = await listActivities();
	t.true(activities.length > 10);
});
