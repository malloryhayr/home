import { useState } from 'react';
import styled from 'styled-components';

import { ChevronRight, ExternalLink, Share2 } from 'react-feather';

import { AnimatePresence, motion } from 'framer-motion';

import { LinkButton, InteractiveContainer } from 'components/layout';
import { Bold, Paragraph } from 'components/text';

import { GitHubPinnedRepo, useWindowDimensions } from 'lib/hooks';

const GitHubRepoCard = ({
	repo,
}: {
	repo?: GitHubPinnedRepo & { url: string };
}) => {
	const { width } = useWindowDimensions();

	const [open, setOpen] = useState(false);

	const toggle = () => setOpen(!open);

	const emoji = `${repo?.description
		.match(/\p{Extended_Pictographic}/gu)
		?.flat()
		.join('')}`;
	const description = repo?.description.replace(
		`${repo?.description
			.match(/\p{Extended_Pictographic}/gu)
			?.flat()
			.join('')} `,
		''
	);

	return (
		<InteractiveContainer
			style={{
				height: 'auto',
				margin: '10px',
				flexGrow: '1',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}
			onClick={toggle}
			animate={{ height: open ? 'auto' : '58px' }}
			className={'GitHubPresenceCard'}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					padding: '16px',
					borderBottom: '1px solid rgba(39, 41, 46, 255)',
					paddingBottom: '18px',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<Bold style={{ marginRight: '12px' }}>
						<span style={{ marginRight: '8px' }}>{emoji}</span>
						{repo?.repo}
					</Bold>
					<GitHubRepoCardStat>⭐ {repo?.stars}</GitHubRepoCardStat>
					<GitHubRepoCardStat>
						<Share2 style={{ height: '12px' }} /> {repo?.forks}
					</GitHubRepoCardStat>
				</div>
				<motion.div
					animate={{ rotate: open ? 90 : 0 }}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<ChevronRight style={{ height: '18px' }} />
				</motion.div>
			</div>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							height: '100%',
						}}
					>
						<Paragraph
							style={{
								padding: '16px',
								color: 'white',
							}}
						>
							{description}
						</Paragraph>
						<div
							style={{
								padding: '16px',
								display: 'flex',
								justifyContent: 'start',
								alignItems: 'center',
							}}
						>
							<LinkButton
								href={repo?.url || ''}
								style={{ marginTop: '16px', marginBottom: '14px' }}
							>
								View Project{' '}
								<ExternalLink
									style={{ height: '18px', marginBottom: '-3px' }}
								/>
							</LinkButton>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</InteractiveContainer>
	);
};

export const GitHub = (props: {
	pinnedRepos: (GitHubPinnedRepo & { url: string })[];
}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
			}}
		>
			{props.pinnedRepos?.map(repo => (
				<GitHubRepoCard repo={repo} key={repo.repo} />
			))}
		</div>
	);
};

const GitHubRepoCardStat = styled.span`
	font-size: 12px;
	display: flex;
	align-items: center;
	margin-right: 4px;
`;
