import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { useLanyard } from 'use-lanyard';

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
	const { data: lanyard } = useLanyard(id);

	if (lanyard) {
		return (
			<PresenceContainer>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					<PresenceStatusCircle
						status={lanyard.discord_status as DiscordStatus}
					/>
					<Bold style={{ marginRight: '16px' }}>
						{discordStatusName(lanyard.discord_status as DiscordStatus)}
					</Bold>
				</div>
			</PresenceContainer>
		);
	} else {
		return (
			<PresenceContainer>
				<p>waiting...</p>
			</PresenceContainer>
		);
	}
};

const PresenceContainer = (props: PropsWithChildren<{}>) => (
	<Container style={{ marginTop: '18px' }}>{props.children}</Container>
);

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
