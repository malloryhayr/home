import dayjs from 'dayjs';

import { BIRTHDAY } from 'lib/constants';

export function isDate(date: string) {
	const then = dayjs(date);
	const now = dayjs();

	return now.month() === then.month() && now.date() === then.date();
}

export function isBirthday() {
	return isDate(BIRTHDAY);
}
