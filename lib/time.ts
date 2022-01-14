import dayjs from 'dayjs';

export function isDate(date: string) {
	const then = dayjs(date);
	const now = dayjs();

	return now.month() === then.month() && now.date() === then.date();
}

export function isBirthday() {
	return isDate('2005-03-13');
}
