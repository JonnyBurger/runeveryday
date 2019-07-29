import lookForNewRuns from './look-for-new-runs';
import updateTwitterBio from './update-twitter-bio';

lookForNewRuns()
	.then(
		(highestNumber: number): Promise<void> => updateTwitterBio(highestNumber)
	)
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
