import test from 'ava';
import listActivities from '../list-activities';

test('Should be able to get activities', async (t): Promise<void> => {
	const activities = await listActivities(1);
	t.true(activities.length > 10);
});
