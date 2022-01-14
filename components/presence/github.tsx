import { useState } from 'react';
import styled from 'styled-components';

import { ChevronRight, Share2 } from 'react-feather';

import { AnimatePresence, motion } from 'framer-motion';

import { InteractiveContainer } from 'components/layout';
import { Bold, Paragraph } from 'components/text';

import { useGitHubPinnedRepos, GitHubPinnedRepo } from 'lib/hooks';

const GitHubRepoCard = ({
	repo,
}: {
	repo?: GitHubPinnedRepo & { url: string };
}) => {
	const [open, setOpen] = useState(false);

	const toggle = () => setOpen(!open);

	return (
		<InteractiveContainer
			style={{
				height: 'auto',
				margin: '10px',
				flexGrow: '1',
				width: '33.3%',
				display: 'flex',
				flexDirection: 'column',
				overflow: 'hidden',
			}}
			onClick={toggle}
			animate={{ height: open ? 'auto' : '21.5px' }}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Bold style={{ marginRight: '12px' }}>{repo?.repo}</Bold>
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
					>
						<p style={{ fontSize: '14px' }}>{repo?.description}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</InteractiveContainer>
	);
};

export const GitHub = ({ username }: { username: string }) => {
	const { data: github } = useGitHubPinnedRepos(username);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
			}}
		>
			{github?.map(repo => (
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
