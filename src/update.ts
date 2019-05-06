import lookForNewRuns from './look-for-new-runs';

lookForNewRuns()
	.then(() => {
		console.log('done');
		process.exit(0);
	})
	.catch(err => {
		console.log(err);
	});
