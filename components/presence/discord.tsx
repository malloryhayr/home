import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import Image from 'next/image';

import { Activity, useLanyardWs } from 'use-lanyard';
import ReactTooltip from 'react-tooltip';

import { Container } from 'components/layout';
import { Bold } from 'components/text';

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

	if (lanyard) {
		return (
			<PresenceStatusLine>
				<PresenceStatusCircle
					status={lanyard.discord_status as DiscordStatus}
				/>
				<PresenceStatusText>
					{lanyard.activities.map(activity => (
						<Activity activity={activity} key={activity.id} />
					))}
				</PresenceStatusText>
			</PresenceStatusLine>
		);
	} else {
		return <></>;
	}
};

const Activity = ({ activity }: { activity: Activity }) => {
	const VERB_OVERRIDE: { [key: string]: string } = {
		Code: 'Writing',
	};

	/**
	 * Activity Types
	 *
	 * 0: PLAYING
	 * 1: STREAMING
	 * 2: LISTENING
	 * 3: WATCHING
	 * 4: CUSTOM
	 * 5: COMPETING
	 *
	 */

	switch (activity.type) {
		case 0: {
			const ACTIVITY_TEXT = VERB_OVERRIDE[activity.name]
				? VERB_OVERRIDE[activity.name]
				: 'Playing';

			return (
				<>
					<span>{ACTIVITY_TEXT} </span>
					<span
						data-tip
						data-for={`activity${activity.id}`}
						style={{ borderBottom: '1px dotted white' }}
					>
						{activity.name}
					</span>
					<ReactTooltip
						id={`activity${activity.id}`}
						backgroundColor="#0d1117"
						border
						borderColor="#27292e"
						place="bottom"
						className={'activityTooltip'}
					>
						{activity.assets?.large_image ? (
							<Image
								src={
									activity.assets.large_image.startsWith('mp:external')
										? getExternalAsset(activity.assets.large_image)
										: `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}`
								}
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
					</ReactTooltip>
				</>
			);
		}
		default: {
			return <></>;
		}
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

const PresenceStatusCircle = ({ status }: { status: DiscordStatus }) => {
	const COLORS = {
		online: 'rgb(28, 176, 80)',
		dnd: '#f04747',
		idle: '#faa81a',
		offline: '#27292E',
	};

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
};
