import test from 'ava';
import requestActivity from '../request-activity';

test('Should be able to fetch', async (t): Promise<void> => {
	const answer = await requestActivity('2336556293');
	t.is(answer.name, 'Evening Run');
});
