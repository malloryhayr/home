export function isDate(date: number) {
	const then = new Date(date);
	const now = new Date();

	return now.getMonth() === then.getMonth() && now.getDate() === then.getDate();
}
