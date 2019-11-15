import lookForNewRuns from './look-for-new-runs';

lookForNewRuns()
  .then((): void => {
    console.log('done');
    process.exit(0);
  })
  .catch((err): void => {
    console.log(err);
  });
