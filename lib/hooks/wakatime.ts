import { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

export interface WakaTimeLanguage {
	decimal: string;
	digital: string;
	hours: number;
	minutes: number;
	name: string;
	percent: number;
	text: string;
	total_seconds: number;
}

/** too lazy to fully type... */
export type WakaTimeResponse = { data: { languages: WakaTimeLanguage[] } };

export function useWakaTimeStats(user: string) {
	return useSWR<WakaTimeResponse, Error>(`/api/wakatime/${user}`, url =>
		fetch(url).then(res => res.json())
	);
}

export function useLanguageFromWakaTimeStats(
	stats: WakaTimeResponse,
	language: string
) {
	return stats.data.languages.find(x => x.name === language);
}
