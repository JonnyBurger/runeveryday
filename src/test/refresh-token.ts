import test from 'ava';
import getRefreshToken from '../get-refresh-token';

test('Should be to get refresh token', async t => {
	const token = await getRefreshToken();
	t.is(token.refresh_token.length, 40);
	t.is(token.access_token.length, 40);
	t.true(token.expires_at > Date.now());
});
