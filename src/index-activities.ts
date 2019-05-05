import listActivities from './list-activities';

export default async () => {
	const activities = await listActivities();
};
