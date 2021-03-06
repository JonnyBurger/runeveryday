import ms from 'ms';
import {differenceInDays} from 'date-fns';

// Can run until 2am
const startOfDay = ms('2h');
export const dayOne = new Date('2016-02-19');
export const dayZero = new Date('2016-02-18');

export default (date: Date): number => {
	return differenceInDays(new Date(date.getTime() - startOfDay), dayZero);
};
