import lookForNewRuns from './look-for-new-runs';
import updateTwitterBio from './update-twitter-bio';

lookForNewRuns()
	.then(highestNumber => updateTwitterBio(highestNumber))
	.then(() => {
		console.log('done');
		process.exit(0);
	})
	.catch(err => {
		console.log(err);
	});
