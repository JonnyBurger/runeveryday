import indexActivities from './index-activities';

indexActivities()
	.then(() => {
		console.log('done');
		process.exit(0);
	})
	.catch(err => {
		console.log(err);
	});
