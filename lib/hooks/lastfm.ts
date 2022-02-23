import useSWR from 'swr';

export interface LastfmTrack {
	name: string;
	url: string;
	duration: string;
	streamable: {
		'#text': string;
		fulltrack: string;
	};
	listeners: string;
	playcount: string;
	artist: {
		name: string;
		url: string;
	};
	album: {
		artist: string;
		title: string;
		url: string;
		image: {
			'#text': string;
			size: string;
		}[];
	};
	userplaycount: string;
	userloved: string;
	toptags: {
		[key: string]: {
			name: string;
			url: string;
		}[];
	};
}

export type LastfmResponse = { track: LastfmTrack };

export function useLastfmTrack(artist: string, track: string) {
	return useSWR<LastfmResponse, Error>(
		`/api/lastfm/track?artist=${artist}&track=${track}`,
		url => fetch(url).then(res => res.json())
	);
}
