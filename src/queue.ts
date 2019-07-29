import indexActivities from './index-activities';

indexActivities()
	.then(
		(): void => {
			console.log('done');
			process.exit(0);
		}
	)
	.catch(
		(err): void => {
			console.log(err);
		}
	);
