import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function isDate(date: string) {
	const then = dayjs(date).tz('America/Los_Angeles');
	const now = dayjs();

	return now.month() === then.month() && now.date() === then.date();
}
