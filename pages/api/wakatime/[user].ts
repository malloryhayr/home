import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { user } = req.query;

	return res.json(
		await fetch(
			`https://wakatime.com/api/v1/users/${user}/stats/last_7_days?token=${process.env.WAKATIME_KEY}`
		).then(res => res.json())
	);
}
