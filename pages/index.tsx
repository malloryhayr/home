import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { PropsWithChildren, useEffect, useState } from 'react';

import { GitHub, Key, MessageSquare, Twitter } from 'react-feather';
import dayjs from 'dayjs';

import { DiscordPresence, GitHubPresence } from 'components/presence';
import { Header, Paragraph, SubHeader } from 'components/text';

import { BIRTHDAY, DISCORD_ID, GITHUB_USERNAME } from 'lib/constants';
import { isDate } from 'lib/time';
import { GitHubPinnedRepo, useGitHubPinnedRepos } from 'lib/hooks';

interface Props {
	pinnedRepos: (GitHubPinnedRepo & { url: string })[];
}

export default function Home(props: Props) {
	const socials = [
		{
			link: 'https://github.com/iGalaxyYT',
			icon: GitHub,
		},
		{
			link: 'https://twitter.com/_iGalaxyYT',
			icon: Twitter,
		},
		{
			link: 'https://keybase.io/igalaxy',
			icon: Key,
		},
	];

	const [isBirthday, setIsBirthday] = useState(isDate('2005-03-13'));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setIsBirthday(isDate('2005-03-13'));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [intervalCheck]);

	const { data: github = props.pinnedRepos } =
		useGitHubPinnedRepos(GITHUB_USERNAME);

	return (
		<div>
			<div style={{ marginBottom: '18px' }}>
				{socials.map((social, i) => (
					<Link href={social.link} passHref key={`social${i}`}>
						<a target="_blank" style={{ paddingRight: '10px' }}>
							<social.icon width={28} height={28} className={'socialIcon'} />
						</a>
					</Link>
				))}
			</div>
			<Header>Hey, I&lsquo;m William {isBirthday ? '🥳' : '👋'}</Header>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m a <Age birthdate={BIRTHDAY} />
				-year-old aspiring software engineer & amateur game designer.
			</Paragraph>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m pursuing full-stack web development using modern technologies
				and I&lsquo;m creating multiplayer experiences for Minecraft: Java
				Edition.
			</Paragraph>
			<br />
			<SubHeader>What am I building? 🚀</SubHeader>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m currently juggling a lot of projects, but here is a selection
				of some of my favorite open source projects I&lsquo;ve worked on.
			</Paragraph>
			<br />
			<GitHubPresence pinnedRepos={github!} />
			<br />
			<SubHeader>What am I using? 🛠️</SubHeader>
			<Paragraph style={{ marginTop: '18px' }}>
				I&lsquo;m always trying to learn something new, and while I&lsquo;ve
				traditionally focused on high-level web development, nowadays I&lsquo;m
				exploring low-level languages such as Rust and Go.
			</Paragraph>
		</div>
	);
}

const Age = ({ birthdate }: { birthdate: string }) => {
	const [clicked, setClicked] = useState(false);

	const [year, setYear] = useState(dayjs().diff(birthdate, 'year'));

	const [intervalCheck, setIntervalCheck] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setYear(dayjs().diff(birthdate, 'year', true));

			setIntervalCheck(intervalCheck + 1);
		}, 100);

		return () => clearInterval(interval);
	}, [birthdate, intervalCheck]);

	return (
		<span onClick={() => setClicked(!clicked)} className={'clickable'}>
			{clicked ? `~${year.toFixed(8)}` : Math.floor(year)}
		</span>
	);
};

export const getStaticProps: GetStaticProps<Props> = async function () {
	const pinnedRepos = await fetch(
		`https://gh-pinned-repos.egoist.sh/?username=${GITHUB_USERNAME}`
	).then(async response => response.json() as Promise<GitHubPinnedRepo[]>);

	return {
		props: {
			pinnedRepos: pinnedRepos.map(repo => ({
				...repo,
				url: `https://github.com/${repo.owner}/${repo.repo}`,
			})),
		},
	};
};
