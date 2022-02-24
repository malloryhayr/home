import styled from 'styled-components';

import Image from 'next/image';

import { Activity, Spotify, useLanyardWs } from 'use-lanyard';
import ReactTooltip from 'react-tooltip';
import { Music, Smartphone, X } from 'react-feather';

import { useLastfmTrack, useWindowDimensions } from 'lib/hooks';

type DiscordStatus = 'online' | 'dnd' | 'idle' | 'offline';

const discordStatusName = (status: DiscordStatus): string =>
	({
		online: 'Online',
		dnd: 'Do Not Disturb',
		idle: 'Idle',
		offline: 'Offline',
	}[status]);

export const Discord = ({ id }: { id: string }) => {
	const lanyard = useLanyardWs(id);

	const { width, height } = useWindowDimensions();

	if (lanyard) {
		return (
			<PresenceStatusLine>
				<PresenceStatusCircle
					status={lanyard.discord_status as DiscordStatus}
					mobile={lanyard.active_on_discord_mobile}
					desktop={lanyard.active_on_discord_desktop}
				/>
				<PresenceStatusText>
					{width > 930 ? (
						lanyard.activities.map((activity, i) => (
							<Activity
								activity={activity}
								key={activity.id}
								i={i}
								length={lanyard.activities.length}
								spotify={lanyard.spotify}
							/>
						))
					) : (
						<></>
					)}
				</PresenceStatusText>
			</PresenceStatusLine>
		);
	} else {
		return (
			<PresenceStatusLine>
				<PresenceStatusCircle
					status={'offline'}
					mobile={false}
					desktop={false}
				/>
			</PresenceStatusLine>
		);
	}
};

const Activity = ({
	activity,
	i,
	length,
	spotify,
}: {
	activity: Activity;
	i: number;
	length: number;
	spotify: Spotify | null;
}) => {
	function getFormattedVerb(verb: string) {
		return i === 0
			? verb
			: i < length - 1
			? `, ${verb.toLowerCase()}`
			: length === 2
			? ` and ${verb.toLowerCase()}`
			: `, and ${verb.toLowerCase()}`;
	}

	const VERB_OVERRIDE: { [key: string]: string } = {
		Code: 'Writing',
	};

	const NAME_OVERRIDE: { [key: string]: string } = {};

	const TRANSPARENT_IMAGE =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

	/**
	 * Activity Types
	 *
	 * 0: PLAYING
	 * 1: STREAMING
	 * 2: LISTENING
	 * 3: WATCHING
	 * 4: CUSTOM
	 * 5: COMPETING
	 */

	switch (activity.type) {
		case 0: {
			const ACTIVITY_TEXT = VERB_OVERRIDE[activity.name]
				? VERB_OVERRIDE[activity.name]
				: 'Playing';

			return (
				<>
					<span>{getFormattedVerb(ACTIVITY_TEXT)} </span>
					<span
						data-tip
						data-for={`activity${activity.id}`}
						style={{ borderBottom: '1px dotted white' }}
					>
						{NAME_OVERRIDE[activity.name]
							? NAME_OVERRIDE[activity.name]
							: activity.name}
					</span>
					<ReactTooltip
						id={`activity${activity.id}`}
						backgroundColor="#0d1117"
						border
						borderColor="#27292e"
						place="bottom"
						className={'activityTooltip'}
					>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							{activity.assets?.large_image ? (
								<div style={{ position: 'relative' }}>
									<Image
										src={
											activity.assets.large_image
												? activity.assets.large_image.startsWith('mp:external')
													? getExternalAsset(activity.assets.large_image)
													: `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}`
												: TRANSPARENT_IMAGE
										}
										width={'80px'}
										height={'80px'}
										alt={activity.name}
										className={'activityLargeImage'}
									/>
									{activity.assets.small_image ? (
										<div
											style={{
												position: 'absolute',
												bottom: '-7.5px',
												right: '-7.5px',
												borderRadius: '9999px',
												border: '4px solid #0d1117',
												width: '25px',
												height: '25px',
											}}
										>
											<Image
												src={
													activity.assets.small_image.startsWith('mp:external')
														? getExternalAsset(activity.assets.small_image)
														: `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}`
												}
												width={'25px'}
												height={'25px'}
												alt={activity.name}
												className={'activitySmallImage'}
											/>
										</div>
									) : (
										<></>
									)}
								</div>
							) : (
								<></>
							)}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginLeft: '18px',
								}}
							>
								<span>
									<strong>{activity.name}</strong>
								</span>
								<ActivityText>{activity.details}</ActivityText>
								<ActivityText>{activity.state}</ActivityText>
								{activity.timestamps?.start ? (
									<ActivityText>
										{formatTimestamp(activity.timestamps.start, Date.now())}{' '}
										elapsed
									</ActivityText>
								) : (
									<></>
								)}
							</div>
						</div>
					</ReactTooltip>
				</>
			);
		}
		case 2: {
			return (
				<>
					<span>{getFormattedVerb('Listening to')} </span>
					<span
						data-tip
						data-for={`activity${activity.id}`}
						style={{
							borderBottom: '1px dotted white',
						}}
					>
						Spotify
					</span>
					<ReactTooltip
						id={`activity${activity.id}`}
						backgroundColor="#0d1117"
						border
						borderColor="#27292e"
						place="bottom"
						className={'activityTooltip'}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								{activity.assets?.large_image ? (
									<Image
										src={spotify?.album_art_url!}
										width={'80px'}
										height={'80px'}
										alt={activity.name}
										className={'activityLargeImage'}
									/>
								) : (
									<></>
								)}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginLeft: '18px',
									}}
								>
									<span>
										<strong>{spotify?.song}</strong>
									</span>
									<ActivityText>by {spotify?.artist}</ActivityText>
									<ActivityText>on {spotify?.album}</ActivityText>
									<LastfmTrack
										artist={spotify?.artist.split('; ')[0] || ''}
										track={spotify?.song || ''}
									/>
								</div>
							</div>
							<div
								style={{
									width: '100%',
									height: '6px',
									backgroundColor: '#27292e',
									borderRadius: '9999px',
									marginTop: '18px',
								}}
							>
								<div
									style={{
										width: `${
											((Date.now() - spotify?.timestamps.start!) /
												(spotify?.timestamps.end! -
													spotify?.timestamps.start!)) *
											100
										}%`,
										height: '100%',
										backgroundColor: 'white',
										borderRadius: '9999px',
									}}
								></div>
							</div>
						</div>
					</ReactTooltip>
				</>
			);
		}
		default: {
			return <></>;
		}
	}
};

const LastfmTrack = ({ artist, track }: { artist: string; track: string }) => {
	const lastfm = useLastfmTrack(artist, track);

	if (lastfm.data?.track) {
		return (
			<ActivityText
				style={{
					color: 'rgba(255, 255, 255, 0.4)',
					fontSize: '12px',
					marginTop: '2px',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Music height={12} width={12} style={{ marginRight: '4px' }} />
				{lastfm.data.track.userplaycount} lifetime plays
			</ActivityText>
		);
	} else {
		return (
			<ActivityText
				style={{
					color: 'rgba(255, 255, 255, 0.4)',
					fontSize: '12px',
					marginTop: '2px',
				}}
			>
				<X height={12} width={12} style={{ marginRight: '4px' }} />
				No Last.fm data available
			</ActivityText>
		);
	}
};

function getExternalAsset(link: string) {
	return link.replace(/mp:external\/([^\/]*)\/(http[s])/g, '$2:/');
}

function formatTimestamp(start: number, end: number) {
	const diff = end - start;
	const hours = Math.floor(diff / 3600e3);
	const min = Math.floor(diff / 60e3 - hours * 60);
	const sec = Math.floor(diff / 1e3 - min * 60 - hours * 3600);

	const hoursFormatted = hours.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});
	const minFormatted = min.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});
	const secFormatted = sec.toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	return hours > 0
		? `${hoursFormatted}:${minFormatted}:${secFormatted}`
		: `${minFormatted}:${secFormatted}`;
}

const PresenceStatusLine = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 9px;
`;

const PresenceStatusText = styled.span`
	margin-left: -9px;
`;

const ActivityText = styled.span`
	font-size: 14px;
	line-height: 1.25rem;
	text-overflow: ellipsis;
`;

const PresenceStatusCircle = ({
	status,
	mobile,
	desktop,
}: {
	status: DiscordStatus;
	mobile: boolean;
	desktop: boolean;
}) => {
	const COLORS = {
		online: 'rgb(28, 176, 80)',
		dnd: '#f04747',
		idle: '#faa81a',
		offline: 'rgba(255, 255, 255, 0.2)',
	};

	if (mobile && !desktop) {
		return (
			<Smartphone
				width={24}
				height={24}
				color={COLORS[status]}
				style={{ marginRight: '16px' }}
			/>
		);
	} else {
		return (
			<div
				style={{
					width: '16px',
					height: '16px',
					borderRadius: '100%',
					backgroundColor: COLORS[status],
					marginRight: '16px',
				}}
			/>
		);
	}
};
