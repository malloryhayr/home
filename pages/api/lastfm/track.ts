import { NextApiRequest, NextApiResponse } from 'next';

import { LASTFM_USERNAME } from 'lib/constants';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { artist, track } = req.query;

	return res.json(
		await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.LASTFM_KEY}&artist=${artist}&track=${track}&format=json&username=${LASTFM_USERNAME}`
		).then(res => res.json())
	);
}
